from pyecore.resources import ResourceSet, URI

# Step 1: Load the Ecore file as the metamodel
# Create a ResourceSet
rset = ResourceSet()

# Load the Ecore file
ecore_resource = rset.get_resource(URI('model.ecore'))

# The root of the Ecore file is an EPackage (the metamodel)
metamodel = ecore_resource.contents[0]

# Step 2: Access the classes from the metamodel
# Get the 'Person' and 'Address' classes
Person = metamodel.getEClassifier('Person')
Address = metamodel.getEClassifier('Address')

# Step 3: Create instances of the classes
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

# Step 4: Print the instances
print("Person Instance:")
print(f"Name: {person.name}")
print(f"Age: {person.age}")
print(f"Address: {person.address.street}, {person.address.city}")

# Step 5: Serialize the instances to XMI (optional)
# Create a new resource for the instances
instance_resource = rset.create_resource(URI('my_instance.xmi'))

# Add the person instance to the resource
instance_resource.append(person)

# Save the resource to a file
instance_resource.save()

print("\nSerialized instance to 'my_instance.xmi'")