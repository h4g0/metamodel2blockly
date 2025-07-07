from pyecore.resources import ResourceSet, URI
from pyecore.ecore import EClass, EAttribute, EReference
import graphviz

def visualize_ecore_model(ecore_file_path):
    """
    Load an Ecore model and create a visualization using graphviz.
    
    Args:
        ecore_file_path (str): Path to the .ecore file
    """
    # Initialize the resource set
    rset = ResourceSet()
    
    # Register the Ecore metamodel
    resource = rset.get_resource(URI(ecore_file_path))
    
    # Create a new Graphviz graph
    dot = graphviz.Digraph(comment='Ecore Model Visualization')
    dot.attr(rankdir='BT')
    
    # Track processed elements to avoid duplicates
    processed = set()
    
    def add_class_to_graph(eclass):
        """Add an EClass and its relationships to the graph."""
        if eclass in processed:
            return
        processed.add(eclass)
        
        # Add class node
        class_label = f"{eclass.name}\n"
        # Add attributes
        for attr in eclass.eAttributes:
            class_label += f"+ {attr.name}: {attr.eType.name}\n"
        
        dot.node(eclass.name, class_label, shape='record')
        
        # Add inheritance relationships
        for super_class in eclass.eSuperTypes:
            dot.edge(eclass.name, super_class.name, arrowhead='empty')
            add_class_to_graph(super_class)
        
        # Add references
        for ref in eclass.eReferences:
            if ref.eType not in processed:
                add_class_to_graph(ref.eType)
            
            # Different arrow styles for containment vs reference
            arrow = 'diamond' if ref.containment else 'open'
            dot.edge(eclass.name, ref.eType.name, 
                    label=f"{ref.name}\n[{ref.lower_bound}..{ref.upper_bound}]",
                    arrowhead=arrow)
    
    # Process all root classes
    for eclass in resource.contents[0].eClassifiers:
        if isinstance(eclass, EClass):
            add_class_to_graph(eclass)
    
    return dot

# Example usage:
# dot = visualize_ecore_model('path/to/your/model.ecore')
# dot.render('ecore_visualization', format='png', cleanup=True)