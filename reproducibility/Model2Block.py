import json
import argparse
import os
import shutil
from create_block_from_class import convert_metamodel_to_blockly, generate_blockly_html, generate_tsx_blocks
from get_content_mtamodel import get_metamodel_info, parse_ecore_metamodel
from model import load_metamodel


def get_metamodel_classes(metamodel):
    classes = get_metamodel_info(metamodel)
    return classes


def metamodel2blockly(metamodel):
    classes = get_metamodel_classes(metamodel)
    blocks = convert_metamodel_to_blockly(classes)
    return blocks


def test_metamodel2blockly(metamodel_path, output_format='web'):
    classes = get_metamodel_classes(metamodel_path)
    
    if output_format == 'web':
        blocks = metamodel2blockly(metamodel_path)
        model_name = os.path.splitext(os.path.basename(metamodel_path))[0]
        
        # Create project directory
        project_dir = os.path.join('generated', f"{model_name}-visualci")
        os.makedirs(project_dir, exist_ok=True)
        
        # Copy visualci project excluding node_modules
        visualci_src = os.path.join('interface', 'visualci')
        if os.path.exists(visualci_src):
            # Remove existing directory for compatibility
            if os.path.exists(project_dir):
                shutil.rmtree(project_dir)
            
            # Use copytree with ignore pattern
            shutil.copytree(
                visualci_src,
                project_dir,
                ignore=shutil.ignore_patterns('node_modules', '.*')  # Exclude node_modules and hidden files
            )
        else:
            print(f"Warning: VisualCI project not found at {visualci_src}")
        
        # Generate and replace ecore-blocks.tsx
        output_file = os.path.join(project_dir, 'ecore-blocks.tsx')
        generate_tsx_blocks(blocks, output_file=output_file)
        print(f"Generated VisualCI project in: {os.path.abspath(project_dir)}")
    elif output_format == 'tsx':
        blocks = metamodel2blockly(metamodel_path)
        model_name = os.path.splitext(os.path.basename(metamodel_path))[0]
        
        # Create output directory if it doesn't exist
        os.makedirs('generated', exist_ok=True)
        
        # Generate just the TSX file
        output_file = os.path.join('generated', f"{model_name}-blocks.tsx")
        
        # Use template if available
        template_path = os.path.join('interface', 'visualci', 'ecore-blocks.tsx')
        if os.path.exists(template_path):
            with open(template_path, 'r') as f:
                template_content = f.read()
            with open(output_file, 'w') as f:
                f.write(template_content)
        else:
            print(f"Warning: Template file not found at {template_path}")
            
        generate_tsx_blocks(blocks, output_file=output_file)
        print(f"Generated TSX components in: {os.path.abspath(output_file)}")
    elif output_format == 'json':
        blocks = metamodel2blockly(metamodel_path)
        print(json.dumps(blocks, indent=2))
    else:
        print("Available output formats:")
        print("- web: Generates TSX Blockly components in blockly_components.tsx")
        print("- json: Outputs Blockly JSON definition")
        print("- tsx: Generates just the TSX file")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Convert Ecore metamodels to Blockly blocks')
    parser.add_argument('metamodel', help='Path to the Ecore metamodel file')
    parser.add_argument('--output', choices=['web', 'json', 'tsx'], default='web',
                      help='Output format (web: full project, tsx: just blocks file, json: raw blocks)')
    
    args = parser.parse_args()
    test_metamodel2blockly(args.metamodel, args.output)