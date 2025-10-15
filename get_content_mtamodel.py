from pyecore.resources import ResourceSet, URI
from pyecore.ecore import EClass, EAttribute, EReference

def parse_ecore_metamodel(ecore_file_path):
    # Create a resource set and load the Ecore file
    rset = ResourceSet()
    resource = rset.get_resource(URI(ecore_file_path))
    
    # Get the root package
    root_package = resource.contents[0]
    
    # List to store the result tuples
    result = []
    
    # Process each class in the metamodel
    for eclass in root_package.eClassifiers:
        if isinstance(eclass, EClass):
            class_name = eclass.name
            
            # Extract attributes
            attributes = []
            for attr in eclass.eAttributes:
                attr_info = {
                    'name': attr.name,
                    'type': attr.eType.name if attr.eType else 'Unknown',
                    'many': attr.many
                }
                attributes.append(attr_info)
            
            # Extract containment references with additional details
            containments = []
            for ref in eclass.eReferences:
                if ref.containment:
                    containment_info = {
                        'name': ref.name,
                        'type': ref.eType.name if ref.eType else 'Unknown',
                        'many': ref.many,
                        'containment_type': 'Composition',  # Explicit marking of containment
                        'opposite_reference': ref.eOpposite.name if ref.eOpposite else None
                    }
                    containments.append(containment_info)
            
            # Extract non-containment references
            relationships = []
            for ref in eclass.eReferences:
                if not ref.containment:
                    ref_info = {
                        'name': ref.name,
                        'type': ref.eType.name if ref.eType else 'Unknown',
                        'many': ref.many,
                        'opposite_reference': ref.eOpposite.name if ref.eOpposite else None
                    }
                    relationships.append(ref_info)
            
            # Create tuple and add to result
            class_info = (class_name, [attributes, containments, relationships])
            result.append(class_info)
    
    return result

# Example usage
def get_metamodel_info(ecore_file_path):
    return parse_ecore_metamodel(ecore_file_path)