import os
import yaml

def read_yaml(filename):
    try:
        with open(filename, 'r') as file:
            return yaml.safe_load(file)
    except FileNotFoundError:
        print(f"Error: File {filename} not found")
        return None
    except yaml.YAMLError as e:
        print(f"Error: Invalid YAML file - {str(e)}")
        return None
    except Exception as e:
        print(f"Error: An unexpected error occurred - {str(e)}")
        return None
    
def read_yaml_files_from_folder(folder_path):
    yaml_data = {}
    
    # Iterate through files in the folder
    for file_name in os.listdir(folder_path):
        # Check for YAML files
        if file_name.endswith(('.yaml', '.yml')):
            file_path = os.path.join(folder_path, file_name)
            
            # Read the YAML file
            with open(file_path, 'r') as yaml_file:
                try:
                    yaml_content = yaml.safe_load(yaml_file)
                    yaml_data[file_name] = yaml_content  # Store file content
                except yaml.YAMLError as e:
                    print(f"Error reading {file_name}: {e}")
    
    return yaml_data

def get_yaml_data(folder_path):
    all_yaml_data = read_yaml_files_from_folder(folder_path)
    return all_yaml_data

def display_yaml_data(all_yaml_data):
    for file_name, content in list(all_yaml_data.items()):
        print(f"\nContent of {file_name}:")
        print(content)

def get_pretty_yaml(data):
    pretty_yaml = yaml.dump(data, sort_keys=False, default_flow_style=False, indent=4)
    
    return pretty_yaml
    
def pretty_print_yaml(data):  
    
    # Pretty-print the YAML content
    print(yaml.dump(data, sort_keys=False, default_flow_style=False, indent=4))


def get_yamls_keys(yaml_data):
    all_keys = set()
    print(len(yaml_data))
    for f in yaml_data:
        all_keys.update(list(f[1].keys()))

    print(len(all_keys))
    return all_keys