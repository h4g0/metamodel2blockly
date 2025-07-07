from pyecore.ecore import EObject, EAttribute, EReference
from pyecore.resources import ResourceSet, URI
from typing import Set

def print_metamodel_details(epackage, indent=0):
    """Recursively print details of an EPackage and its contents."""
    # Print package details
    print(' ' * indent + f"Package: {epackage.name} (nsURI: {epackage.nsURI}, nsPrefix: {epackage.nsPrefix})")

    # Print all classifiers (e.g., EClass, EDataType)
    for classifier in epackage.eClassifiers:
        if classifier.eClass.name == 'EClass':
            # Print EClass details
            print(' ' * (indent + 2) + f"Class: {classifier.name}")
            # Print attributes
            for attribute in classifier.eStructuralFeatures:
                if attribute.eClass.name == 'EAttribute':
                    print(' ' * (indent + 4) + f"Attribute: {attribute.name} (Type: {attribute.eType.name})")
            # Print references
            for reference in classifier.eStructuralFeatures:
                if reference.eClass.name == 'EReference':
                    print(' ' * (indent + 4) + f"Reference: {reference.name} (Type: {reference.eType.name}, Containment: {reference.containment})")
        elif classifier.eClass.name == 'EDataType':
            # Print EDataType details
            print(' ' * (indent + 2) + f"DataType: {classifier.name} (Instance Class: {classifier.instanceClassName})")

    # Recursively print sub-packages
    for subpackage in epackage.eSubpackages:
        print_metamodel_details(subpackage, indent + 2)

def load_metamodel(location):
    rset = ResourceSet()

    # Load the Ecore file
    ecore_resource = rset.get_resource(URI(location))

    return ecore_resource

def print_meta_model_details(metamodel):
    metamodel = metamodel.contents[0]

    print("Metamodel Details:")
    print_metamodel_details(metamodel)

def pretty_print_model(instance: EObject, indent: int = 0, visited: Set[EObject] = None) -> None:
    """
    Pretty prints any PyEcore model instance, handling circular references and nested structures.
    
    Args:
        instance: The model instance to print (any EObject)
        indent: Current indentation level (default: 0)
        visited: Set of already visited objects to prevent infinite recursion (default: None)
    """
    if visited is None:
        visited = set()
        
    if instance in visited:
        print(" " * indent + f"<Reference to {instance.eClass.name}>")
        return
        
    visited.add(instance)
    
    # Print class name as header
    print(" " * indent + f"[{instance.eClass.name}]")
    
    # Get all features (attributes and references)
    features = instance.eClass.eAllStructuralFeatures()
    
    for feature in features:
        feature_name = feature.name
        value = instance.eGet(feature)
        
        if isinstance(feature, EAttribute):
            # Handle attributes
            print(" " * (indent + 2) + f"{feature_name}: {value}")
            
        elif isinstance(feature, EReference):
            # Handle references
            print(" " * (indent + 2) + f"{feature_name}:")
            
            if value is None:
                print(" " * (indent + 4) + "None")
                continue
                
            # Handle multiple references
            if feature.many:
                if not value:  # Empty collection
                    print(" " * (indent + 4) + "[]")
                    continue
                    
                for idx, item in enumerate(value):
                    print(" " * (indent + 4) + f"[{idx}]")
                    if isinstance(item, EObject):
                        pretty_print_model(item, indent + 6, visited)
                    else:
                        print(" " * (indent + 6) + str(item))
            
            # Handle single references
            else:
                if isinstance(value, EObject):
                    pretty_print_model(value, indent + 4, visited)
                else:
                    print(" " * (indent + 4) + str(value))

def print_metamodel_instance(instance: EObject) -> None:
    """
    Wrapper function to initialize and start the pretty printing process.
    
    Args:
        instance: The model instance to print (any EObject)
    """
    print("\n=== Model Instance Content ===")
    pretty_print_model(instance)
    print("===========================\n")

def save_instance(instance: EObject, file_path: str):
    """
    Save an instance to an XMI file.
    
    Args:
        instance: The model instance to save
        file_path: Path where to save the XMI file
    """
    rset = ResourceSet()
    resource = rset.create_resource(URI(file_path))
    resource.append(instance)
    resource.save()