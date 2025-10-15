from pyecore.ecore import EObject, EAttribute, EReference
from typing import Set

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

# Example usage with the library model from previous example
if __name__ == "__main__":
    # Using the library model from the previous example
    from pyecore.ecore import EPackage, EClass, EAttribute, EString, EInt, EReference
    
    # Create a sample instance
    library_pkg = EPackage('library', nsURI='http://library/1.0', nsPrefix='lib')
    
    Book = EClass('Book')
    Book.eStructuralFeatures.append(EAttribute('title', EString))
    Book.eStructuralFeatures.append(EAttribute('pages', EInt))
    library_pkg.eClassifiers.append(Book)
    
    Author = EClass('Author')
    Author.eStructuralFeatures.append(EAttribute('name', EString))
    Author.eStructuralFeatures.append(EAttribute('email', EString))
    Author.eStructuralFeatures.append(EReference('books', Book, upper=-1, containment=True))
    library_pkg.eClassifiers.append(Author)
    
    # Create instance
    author = Author()
    author.name = "John Doe"
    author.email = "john.doe@example.com"
    
    book1 = Book()
    book1.title = "Python Programming"
    book1.pages = 300
    
    book2 = Book()
    book2.title = "Advanced Python"
    book2.pages = 450
    
    author.books.extend([book1, book2])
    
    # Print the instance
    print_metamodel_instance(author)