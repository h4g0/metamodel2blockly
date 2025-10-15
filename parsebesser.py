import json
import re
from typing import List, Tuple, Dict, Any

def parse_json_metamodel(json_file_path):
    """
    Parse a JSON class diagram file (like Apollon format) and return the same structure as parse_ecore_metamodel.
    
    Returns:
        List of tuples: (class_name, [attributes, containments, relationships])
    """
    with open(json_file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Navigate to the ClassDiagram model
    try:
        class_diagram = data['project']['diagrams']['ClassDiagram']['model']
        elements = class_diagram['elements']
        relationships = class_diagram['relationships']
    except KeyError:
        raise ValueError("Invalid JSON format: Expected ClassDiagram structure")
    
    # Dictionary to store class information
    classes = {}
    
    # First pass: Extract all classes and their attributes
    for element_id, element in elements.items():
        element_type = element.get('type', '')
        
        # Process Class elements
        if element_type == 'Class':
            class_name = element.get('name', 'UnnamedClass')
            
            # Initialize class data
            classes[element_id] = {
                'name': class_name,
                'attributes': [],
                'containments': [],
                'relationships': []
            }
            
            # Extract attributes
            attribute_ids = element.get('attributes', [])
            for attr_id in attribute_ids:
                if attr_id in elements:
                    attr_element = elements[attr_id]
                    if attr_element.get('type') == 'ClassAttribute':
                        attr_text = attr_element.get('name', '')
                        
                        # Parse attribute text (e.g., "+ name: str" or "+ emails: str [*]")
                        attr_info = parse_attribute(attr_text)
                        if attr_info:
                            classes[element_id]['attributes'].append(attr_info)
        
        # Process Enumeration elements
        elif element_type == 'Enumeration':
            enum_name = element.get('name', 'UnnamedEnum')
            
            # Treat enumerations as classes with literal attributes
            classes[element_id] = {
                'name': enum_name,
                'attributes': [],
                'containments': [],
                'relationships': []
            }
            
            # Extract enum literals as attributes
            attribute_ids = element.get('attributes', [])
            for attr_id in attribute_ids:
                if attr_id in elements:
                    attr_element = elements[attr_id]
                    if attr_element.get('type') == 'ClassAttribute':
                        literal_name = attr_element.get('name', '')
                        attr_info = {
                            'name': literal_name,
                            'type': enum_name,  # Enum literals have the enum type
                            'many': False
                        }
                        classes[element_id]['attributes'].append(attr_info)
    
    # Second pass: Extract relationships
    for rel_id, relationship in relationships.items():
        rel_type = relationship.get('type', '')
        
        # Skip non-relationship types (like OCL constraints)
        if rel_type not in ['ClassComposition', 'ClassAggregation', 'ClassUnidirectional', 
                           'ClassBidirectional', 'ClassInheritance']:
            continue
        
        source = relationship.get('source', {})
        target = relationship.get('target', {})
        
        source_id = source.get('element')
        target_id = target.get('element')
        source_mult = source.get('multiplicity', '')
        target_mult = target.get('multiplicity', '')
        source_role = source.get('role', '').strip()
        target_role = target.get('role', '').strip()
        
        if source_id not in classes or target_id not in classes:
            continue
        
        target_class_name = classes[target_id]['name']
        source_class_name = classes[source_id]['name']
        
        # ClassComposition -> Containment
        # In UML composition, the diamond is at the container side
        # The target (with diamond) contains the source
        if rel_type == 'ClassComposition':
            # Use role if provided, otherwise use lowercased class name
            relation_name = source_role if source_role else source_class_name.lower()
            
            # Determine if it's many based on source multiplicity
            is_many = is_multiplicity_many(source_mult)
            
            containment_info = {
                'name': relation_name,
                'type': source_class_name,
                'many': is_many,
                'containment_type': 'Composition',
                'opposite_reference': None
            }
            # Add to target (the container)
            classes[target_id]['containments'].append(containment_info)
        
        # ClassAggregation -> Relationship (non-containment)
        # Similar to composition, diamond is at the aggregate side
        elif rel_type == 'ClassAggregation':
            relation_name = source_role if source_role else source_class_name.lower()
            is_many = is_multiplicity_many(source_mult)
            
            ref_info = {
                'name': relation_name,
                'type': source_class_name,
                'many': is_many,
                'opposite_reference': None
            }
            classes[target_id]['relationships'].append(ref_info)
        
        # ClassUnidirectional -> Relationship (non-containment)
        # Arrow points from source to target
        elif rel_type == 'ClassUnidirectional':
            relation_name = target_role if target_role else target_class_name.lower()
            is_many = is_multiplicity_many(target_mult)
            
            ref_info = {
                'name': relation_name,
                'type': target_class_name,
                'many': is_many,
                'opposite_reference': None
            }
            classes[source_id]['relationships'].append(ref_info)
        
        # ClassBidirectional -> Relationship with opposite
        elif rel_type == 'ClassBidirectional':
            # Forward: source -> target
            target_relation_name = target_role if target_role else target_class_name.lower()
            is_many_target = is_multiplicity_many(target_mult)
            
            ref_info = {
                'name': target_relation_name,
                'type': target_class_name,
                'many': is_many_target,
                'opposite_reference': source_role if source_role else source_class_name.lower()
            }
            classes[source_id]['relationships'].append(ref_info)
            
            # Reverse: target -> source
            source_relation_name = source_role if source_role else source_class_name.lower()
            is_many_source = is_multiplicity_many(source_mult)
            
            ref_info_reverse = {
                'name': source_relation_name,
                'type': source_class_name,
                'many': is_many_source,
                'opposite_reference': target_relation_name
            }
            classes[target_id]['relationships'].append(ref_info_reverse)
        
        # ClassInheritance -> Can be tracked separately if needed
        elif rel_type == 'ClassInheritance':
            # For now, we don't add inheritance to the output
            # but you could track it here if needed
            pass
    
    # Convert to the expected output format
    result = []
    for class_id, class_data in classes.items():
        class_info = (
            class_data['name'],
            [
                class_data['attributes'],
                class_data['containments'],
                class_data['relationships']
            ]
        )
        result.append(class_info)
    
    return result


def parse_attribute(attr_text):
    """
    Parse attribute text like "+ name: str" or "+ emails: str [*]"
    Returns a dictionary with name, type, and many fields.
    """
    # Remove visibility indicators (+, -, #, ~)
    attr_text = attr_text.strip()
    attr_text = re.sub(r'^[+\-#~]\s*', '', attr_text)
    
    # Match pattern: name: type [multiplicity]
    match = re.match(r'(\w+)\s*:\s*(\w+)(?:\s*\[([^\]]+)\])?', attr_text)
    
    if match:
        attr_name = match.group(1)
        attr_type = match.group(2)
        multiplicity = match.group(3) if match.group(3) else None
        
        # Determine if it's many
        is_many = multiplicity and ('*' in multiplicity or '..' in multiplicity)
        
        return {
            'name': attr_name,
            'type': attr_type,
            'many': is_many
        }
    
    return None


def is_multiplicity_many(multiplicity):
    """
    Determine if a multiplicity string indicates 'many' (array/list).
    Examples: "*", "0..*", "1..*", "2..*"
    """
    if not multiplicity:
        return False
    
    multiplicity = str(multiplicity).strip()
    
    # Check for * or range notation
    if '*' in multiplicity or '..' in multiplicity:
        return True
    
    # Check for specific numbers > 1
    try:
        num = int(multiplicity)
        return num > 1
    except ValueError:
        return False


def parse_plantuml_metamodel(plantuml_file_path):
    """
    Parse a PlantUML class diagram file and return the same structure as parse_ecore_metamodel.
    
    Returns:
        List of tuples: (class_name, [attributes, containments, relationships])
    """
    with open(plantuml_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove comments
    content = re.sub(r"'.*?$", '', content, flags=re.MULTILINE)
    content = re.sub(r"/\'.*?'\//", '', content, flags=re.DOTALL)
    
    # Dictionary to store class information
    classes = {}
    
    # Parse class definitions
    class_pattern = r'class\s+(\w+)\s*(?:\<\<.*?\>\>)?\s*\{([^}]*)\}'
    for match in re.finditer(class_pattern, content, re.DOTALL):
        class_name = match.group(1)
        class_body = match.group(2)
        
        attributes = []
        containments = []
        relationships = []
        
        # Parse attributes and references within the class body
        lines = class_body.strip().split('\n')
        for line in lines:
            line = line.strip()
            if not line or line.startswith('--') or line.startswith('=='):
                continue
            
            # Parse attribute: +/- name : type [multiplicity]
            attr_match = re.match(r'[+\-#~]?\s*(\w+)\s*:\s*(\w+)(?:\s*\[([^\]]+)\])?', line)
            if attr_match:
                attr_name = attr_match.group(1)
                attr_type = attr_match.group(2)
                multiplicity = attr_match.group(3) if attr_match.group(3) else None
                
                # Determine if it's many (array/list)
                is_many = multiplicity and ('*' in multiplicity or '..' in multiplicity)
                
                attr_info = {
                    'name': attr_name,
                    'type': attr_type,
                    'many': is_many
                }
                attributes.append(attr_info)
        
        classes[class_name] = {
            'attributes': attributes,
            'containments': containments,
            'relationships': relationships
        }
    
    # Parse relationships (associations, compositions, aggregations)
    # Composition: *--
    composition_pattern = r'(\w+)\s+"\s*([^"]*)\s*"\s+\*--\s+"\s*([^"]*)\s*"\s+(\w+)(?:\s*:\s*(\w+))?'
    for match in re.finditer(composition_pattern, content):
        source_class = match.group(1)
        source_mult = match.group(2).strip()
        target_mult = match.group(3).strip()
        target_class = match.group(4)
        relation_name = match.group(5) if match.group(5) else target_class.lower()
        
        if source_class in classes:
            is_many = '*' in target_mult or '..' in target_mult
            containment_info = {
                'name': relation_name,
                'type': target_class,
                'many': is_many,
                'containment_type': 'Composition',
                'opposite_reference': None
            }
            classes[source_class]['containments'].append(containment_info)
    
    # Alternative composition syntax: -->
    composition_pattern2 = r'(\w+)\s+\*--\s+(\w+)(?:\s*:\s*(\w+))?'
    for match in re.finditer(composition_pattern2, content):
        source_class = match.group(1)
        target_class = match.group(2)
        relation_name = match.group(3) if match.group(3) else target_class.lower()
        
        if source_class in classes:
            containment_info = {
                'name': relation_name,
                'type': target_class,
                'many': False,
                'containment_type': 'Composition',
                'opposite_reference': None
            }
            classes[source_class]['containments'].append(containment_info)
    
    # Parse associations (non-containment references)
    # Association: -->
    association_pattern = r'(\w+)\s+"\s*([^"]*)\s*"\s+-->\s+"\s*([^"]*)\s*"\s+(\w+)(?:\s*:\s*(\w+))?'
    for match in re.finditer(association_pattern, content):
        source_class = match.group(1)
        source_mult = match.group(2).strip()
        target_mult = match.group(3).strip()
        target_class = match.group(4)
        relation_name = match.group(5) if match.group(5) else target_class.lower()
        
        if source_class in classes:
            is_many = '*' in target_mult or '..' in target_mult
            ref_info = {
                'name': relation_name,
                'type': target_class,
                'many': is_many,
                'opposite_reference': None
            }
            classes[source_class]['relationships'].append(ref_info)
    
    # Alternative association syntax
    association_pattern2 = r'(\w+)\s+-->\s+(\w+)(?:\s*:\s*(\w+))?'
    for match in re.finditer(association_pattern2, content):
        source_class = match.group(1)
        target_class = match.group(2)
        relation_name = match.group(3) if match.group(3) else target_class.lower()
        
        if source_class in classes:
            ref_info = {
                'name': relation_name,
                'type': target_class,
                'many': False,
                'opposite_reference': None
            }
            classes[source_class]['relationships'].append(ref_info)
    
    # Aggregation: o--
    aggregation_pattern = r'(\w+)\s+"\s*([^"]*)\s*"\s+o--\s+"\s*([^"]*)\s*"\s+(\w+)(?:\s*:\s*(\w+))?'
    for match in re.finditer(aggregation_pattern, content):
        source_class = match.group(1)
        source_mult = match.group(2).strip()
        target_mult = match.group(3).strip()
        target_class = match.group(4)
        relation_name = match.group(5) if match.group(5) else target_class.lower()
        
        if source_class in classes:
            is_many = '*' in target_mult or '..' in target_mult
            ref_info = {
                'name': relation_name,
                'type': target_class,
                'many': is_many,
                'opposite_reference': None
            }
            classes[source_class]['relationships'].append(ref_info)
    
    # Convert to the expected output format
    result = []
    for class_name, class_data in classes.items():
        class_info = (
            class_name,
            [
                class_data['attributes'],
                class_data['containments'],
                class_data['relationships']
            ]
        )
        result.append(class_info)
    
    return result


def get_metamodel_info(file_path):
    """
    Universal function to get metamodel info from Ecore, PlantUML, or JSON files.
    """
    if file_path.endswith('.ecore'):
        from pyecore.resources import ResourceSet, URI
        from pyecore.ecore import EClass
        return parse_ecore_metamodel(file_path)
    elif file_path.endswith('.puml') or file_path.endswith('.plantuml'):
        return parse_plantuml_metamodel(file_path)
    elif file_path.endswith('.json'):
        return parse_json_metamodel(file_path)
    else:
        raise ValueError(f"Unsupported file format: {file_path}")


def parse_ecore_metamodel(ecore_file_path):
    """Original Ecore parser (included for completeness)"""
    from pyecore.resources import ResourceSet, URI
    from pyecore.ecore import EClass
    
    rset = ResourceSet()
    resource = rset.get_resource(URI(ecore_file_path))
    root_package = resource.contents[0]
    result = []
    
    for eclass in root_package.eClassifiers:
        if isinstance(eclass, EClass):
            class_name = eclass.name
            
            attributes = []
            for attr in eclass.eAttributes:
                attr_info = {
                    'name': attr.name,
                    'type': attr.eType.name if attr.eType else 'Unknown',
                    'many': attr.many
                }
                attributes.append(attr_info)
            
            containments = []
            for ref in eclass.eReferences:
                if ref.containment:
                    containment_info = {
                        'name': ref.name,
                        'type': ref.eType.name if ref.eType else 'Unknown',
                        'many': ref.many,
                        'containment_type': 'Composition',
                        'opposite_reference': ref.eOpposite.name if ref.eOpposite else None
                    }
                    containments.append(containment_info)
            
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
            
            class_info = (class_name, [attributes, containments, relationships])
            result.append(class_info)
    
    return result


# Example usage
if __name__ == "__main__":
    # Test with the bowling alley JSON
    result = parse_json_metamodel('bowling_alley.json')
    
    print("Parsed Classes:")
    for class_name, data in result:
        attributes, containments, relationships = data
        print(f"\nClass: {class_name}")
        print(f"  Attributes: {attributes}")
        print(f"  Containments: {containments}")
        print(f"  Relationships: {relationships}")