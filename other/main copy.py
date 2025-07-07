from files import copy_random_files, count_files
from model import load_metamodel, print_metamodel_instance, save_instance
from parsegithubactions import parse_github_actions
from parsetravis import parse_travis
from visualizemetamodel import visualize_ecore_model
from yamlparser import display_yaml_data, get_pretty_yaml, get_yaml_data, get_yamls_keys, pretty_print_yaml, read_yaml
from travisconcepts import keys_set

ga_files = "testsga"  # Replace with the path to your folder
metamodel_location = "devops2.ecore"
ga_instances = "gainstances"
ga_validation_instances = "gainstancesvalidaion"

travis_files="testtravis"
travis_instances="travisinstances"
travis_instances_validation="travisinstancesvalidation"

def parse_ga(name,fe):
    print(name)

    name = name.replace("yml","xmi")
    metamodel = load_metamodel(metamodel_location)
    instance = parse_github_actions(fe,metamodel)

    ##print_metamodel_instance(instance)
    #print_metamodel_instance(instance)

    save_instance(instance,f"{ga_instances}/{name}")

def parse_tr(name,fe):
    print(name)

    name = name.replace("yml","xmi")
    metamodel = load_metamodel(metamodel_location)
    instance = parse_travis(fe,metamodel)

    #print_metamodel_instance(instance)

    save_instance(instance,f"{travis_instances}/{name}")

def run_test_file_ga(filename):
    fe = read_yaml(f"{ga_files}/{filename}")
    parse_ga(filename,fe)

def run_test_file_travis(filename):
    fe = read_yaml(f"{travis_files}/{filename}")
    print(fe)
    parse_tr(filename,fe)

def run_all_tests_travis():    
    all_yaml_data = get_yaml_data(travis_files)

    for fe in all_yaml_data.items():
        try:
            parse_tr(fe[0],fe[1])
        except:
            print(f"Error in file {fe[0]}")

def run_all_tests_ga():    
    all_yaml_data = get_yaml_data(ga_files)
  
    for fe in all_yaml_data.items():
        try:
            parse_ga(fe[0],fe[1])
        except:
            print(f"Error in file {fe[0]}")

def run_all_test_travis():
    all_yaml_data = get_yaml_data(travis_files)
    print(list(all_yaml_data.items())[0][1])

def get_check_keys_travis():
    all_yaml_data = list(get_yaml_data(travis_files).items())
    yamls_keys = get_yamls_keys(all_yaml_data)

    print(yamls_keys.difference(keys_set))

def main():

    visualize_ecore_model("devops2.ecore")
    ##run_all_tests_ga()
    #run_all_tests_travis()

    #run_test_file_travis("test10.yml")
    #run_all_test_travis()
    #copy_random_files(travis_instances,travis_instances_validation,10)
    #print(count_files(ga_instances))
    #print(count_files(ga_validation_instances))
    
main()