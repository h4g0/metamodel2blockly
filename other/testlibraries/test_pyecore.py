from pyecore.ecore import EClass, EAttribute, EString, EObject, EPackage, EReference
from pyecore.resources import ResourceSet, URI

# Step 1: Define an Ecore model
# Create a package
my_package = EPackage(name='mypackage', nsURI='http://www.example.org/mypackage', nsPrefix='mypackage')

# Create a class 'Person'
Person = EClass('Person')

# Add attributes to 'Person'
name = EAttribute('name', EString)
age = EAttribute('age', EString)
Person.eStructuralFeatures.append(name)
Person.eStructuralFeatures.append(age)

# Add 'Person' to the package
my_package.eClassifiers.append(Person)

# Create a class 'Address'
Address = EClass('Address')

# Add attributes to 'Address'
street = EAttribute('street', EString)
city = EAttribute('city', EString)
Address.eStructuralFeatures.append(street)
Address.eStructuralFeatures.append(city)

# Add 'Address' to the package
my_package.eClassifiers.append(Address)

# Create a reference from 'Person' to 'Address'
person_address = EReference('address', Address, containment=True)
Person.eStructuralFeatures.append(person_address)

# Step 2: Create instances of the model
# Create an instance of 'Person'
person = Person()
person.name = "John Doe"
person.age = "30"

# Create an instance of 'Address'
address = Address()
address.street = "123 Main St"
address.city = "Anytown"

# Set the address for the person
person.address = address

# Step 3: Serialize the instances to XMI
# Create a resource set and resource
rset = ResourceSet()
resource = rset.create_resource(URI('my_model.xmi'))

# Add the person instance to the resource
resource.append(person)

# Save the resource to a file
resource.save()

print("Serialized model to 'my_model.xmi'")

# Step 4: Deserialize the XMI back into Python objects
# Load the resource from the file
loaded_resource = rset.get_resource(URI('my_model.xmi'))
loaded_person = loaded_resource.contents[0]

# Print the loaded data
print("\nLoaded Person:")
print(f"Name: {loaded_person.name}")
print(f"Age: {loaded_person.age}")
print(f"Address: {loaded_person.address.street}, {loaded_person.address.city}")