from pyecore.resources import ResourceSet, URI
from pyecore.ecore import EPackage, EClass, EAttribute, EObject
from pyecore.resources.xmi import XMIResource

def load_metamodel_from_ecore(ecore_file: str) -> EPackage:
    """
    Load a metamodel from an .ecore file.
    
    Args:
        ecore_file: Path to the .ecore file
        
    Returns:
        The root EPackage of the loaded metamodel
    """
    # Create a ResourceSet and load the Ecore file
    rset = ResourceSet()
    resource = rset.get_resource(URI(ecore_file))
    
    # Get the root package
    root_package = resource.contents[0]
    
    # Register the package
    rset.metamodel_registry[root_package.nsURI] = root_package
    
    return root_package

def create_instance(eclass: EClass) -> EObject:
    """
    Create an instance of an EClass with sample data based on feature types.
    
    Args:
        eclass: The EClass to instantiate
        
    Returns:
        An instance of the EClass with sample data
    """
    instance = eclass()
    
    # Set values for all attributes
    for feature in eclass.eStructuralFeatures:
        if isinstance(feature, EAttribute):
            # Set default values based on type
            if feature.eType.name == 'EString':
                instance.eSet(feature, f"Sample {feature.name}")
            elif feature.eType.name == 'EInt':
                instance.eSet(feature, 42)
            elif feature.eType.name == 'EFloat':
                instance.eSet(feature, 3.14)
            elif feature.eType.name == 'EBoolean':
                instance.eSet(feature, True)
            
    return instance

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

# Example usage
if __name__ == "__main__":
    # Example with a hypothetical library.ecore file
    try:
        # 1. Load the metamodel
        ecore_file = "library.ecore"  # Replace with your .ecore file path
        metamodel = load_metamodel_from_ecore(ecore_file)
        
        # 2. Print available classes
        print("Available classes in the metamodel:")
        for eclass in metamodel.eClassifiers:
            if isinstance(eclass, EClass):
                print(f"- {eclass.name}")
                print("  Attributes:")
                for feature in eclass.eStructuralFeatures:
                    print(f"    - {feature.name}: {feature.eType.name}")
        
        # 3. Create instances
        # Assuming we have a Book class in our metamodel
        book_class = metamodel.getEClassifier('Book')
        if book_class:
            # Create a book instance
            book = create_instance(book_class)
            
            # Print the instance details
            print("\nCreated instance:")
            for feature in book_class.eStructuralFeatures:
                if isinstance(feature, EAttribute):
                    value = book.eGet(feature)
                    print(f"{feature.name}: {value}")
            
            # Save the instance
            save_instance(book, "book_instance.xmi")
            print("\nInstance saved to book_instance.xmi")
            
    except Exception as e:
        print(f"Error: {str(e)}")
        print("\nMake sure:")
        print("1. The .ecore file path is correct")
        print("2. The file is a valid Ecore model")
        print("3. You have write permissions in the current directory")