import json
import argparse
import os
import shutil
from create_block_from_class import convert_metamodel_to_blockly, generate_blockly_html, generate_tsx_blocks
from get_content_mtamodel import get_metamodel_info, parse_ecore_metamodel
from model import load_metamodel
from parsebesser import parse_json_metamodel


def get_ecore_metamodel_classes(metamodel_path):
    """Extract class info from an Ecore metamodel."""
    print(f"🧩 Detected Ecore metamodel: {os.path.basename(metamodel_path)}")
    classes = get_metamodel_info(metamodel_path)
    return classes


def get_besser_metamodel_classes(metamodel_path):
    """Extract class info from a BESSER JSON metamodel."""
    print(f"⚙️  Detected BESSER metamodel: {os.path.basename(metamodel_path)}")
    classes = parse_json_metamodel(metamodel_path)
    return classes


def get_metamodel_classes(metamodel_path):
    """
    Determine the metamodel type (Ecore or BESSER) based on file extension or content,
    then extract the corresponding class info.
    """
    if metamodel_path.endswith(".ecore"):
        return get_ecore_metamodel_classes(metamodel_path)
    elif metamodel_path.endswith(".json"):
        return get_besser_metamodel_classes(metamodel_path)
    else:
        # fallback: detect by content
        with open(metamodel_path, 'r', encoding='utf-8') as f:
            content = f.read(1024)
        if "<ecore:EPackage" in content:
            return get_ecore_metamodel_classes(metamodel_path)
        elif '"besserMetamodel"' in content or '"entities"' in content:
            return get_besser_metamodel_classes(metamodel_path)
        else:
            raise ValueError(f"Unknown metamodel format for {metamodel_path}")


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
        print(f"✅ Generated VisualCI project in: {os.path.abspath(project_dir)}")
    
    elif output_format == 'tsx':
        blocks = metamodel2blockly(metamodel_path)
        model_name = os.path.splitext(os.path.basename(metamodel_path))[0]
        
        os.makedirs('generated', exist_ok=True)
        
        output_file = os.path.join('generated', f"{model_name}-blocks.tsx")
        
        template_path = os.path.join('interface', 'visualci', 'ecore-blocks.tsx')
        if os.path.exists(template_path):
            with open(template_path, 'r') as f:
                template_content = f.read()
            with open(output_file, 'w') as f:
                f.write(template_content)
        else:
            print(f"Warning: Template file not found at {template_path}")
            
        generate_tsx_blocks(blocks, output_file=output_file)
        print(f"✅ Generated TSX components in: {os.path.abspath(output_file)}")
    
    elif output_format == 'json':
        blocks = metamodel2blockly(metamodel_path)
        print(json.dumps(blocks, indent=2))
    
    else:
        print("Available output formats:")
        print("- web: Generates TSX Blockly components in blockly_components.tsx")
        print("- json: Outputs Blockly JSON definition")
        print("- tsx: Generates just the TSX file")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Convert Ecore or BESSER metamodels to Blockly blocks')
    parser.add_argument('metamodel', help='Path to the Ecore (.ecore) or BESSER (.json) metamodel file')
    parser.add_argument('--output', choices=['web', 'json', 'tsx'], default='web',
                      help='Output format (web: full project, tsx: just blocks file, json: raw blocks)')
    
    args = parser.parse_args()
    test_metamodel2blockly(args.metamodel, args.output)
