import yaml

# Path to the YAML file
yaml_file_path = 'test.yml'

# Load and parse the YAML file
with open(yaml_file_path, 'r') as file:
    data = yaml.safe_load(file)

# Access and print the parsed data
print("Parsed YAML Data:")
print(f"Name: {data['name']}")
print(f"Age: {data['age']}")
print(f"Address: {data['address']['street']}, {data['address']['city']}")
print("Hobbies:")
for hobby in data['hobbies']:
    print(f"  - {hobby}")
print(f"Is Student: {data['is_student']}")
print(f"Metadata - Created At: {data['metadata']['created_at']}")
print(f"Metadata - Updated At: {data['metadata']['updated_at']}")