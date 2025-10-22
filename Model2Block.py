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
    return get_metamodel_info(metamodel_path)


def get_besser_metamodel_classes(metamodel_path):
    """Extract class info from a BESSER JSON metamodel."""
    print(f"⚙️  Detected BESSER metamodel: {os.path.basename(metamodel_path)}")
    return parse_json_metamodel(metamodel_path)


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
        with open(metamodel_path, 'r', encoding='utf-8') as f:
            content = f.read(1024)
        if "<ecore:EPackage" in content:
            return get_ecore_metamodel_classes(metamodel_path)
        elif '"besserMetamodel"' in content or '"entities"' in content:
            return get_besser_metamodel_classes(metamodel_path)
        else:
            raise ValueError(f"Unknown metamodel format for {metamodel_path}")


def metamodel2blockly(metamodel_path):
    """Convert a metamodel file to Blockly JSON."""
    classes = get_metamodel_classes(metamodel_path)
    return convert_metamodel_to_blockly(classes)


def test_metamodel2blockly(metamodel_path, output_format='web', output_base_dir='generated'):
    """Main conversion logic for a single metamodel."""
    blocks = metamodel2blockly(metamodel_path)
    model_name = os.path.splitext(os.path.basename(metamodel_path))[0]

    if output_format == 'json':
        output_dir = os.path.join(output_base_dir, 'json')
        os.makedirs(output_dir, exist_ok=True)
        output_file = os.path.join(output_dir, f"{model_name}-blocks.json")
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(blocks, f, indent=2)
        print(f"✅ JSON Blockly spec generated at: {output_file}")

    elif output_format == 'tsx':
        os.makedirs(output_base_dir, exist_ok=True)
        output_file = os.path.join(output_base_dir, f"{model_name}-blocks.tsx")
        generate_tsx_blocks(blocks, output_file=output_file)
        print(f"✅ Generated TSX components: {output_file}")

    elif output_format == 'web':
        project_dir = os.path.join(output_base_dir, f"{model_name}-visualci")
        visualci_src = os.path.join('interface', 'visualci')

        # Reset and copy VisualCI
        if os.path.exists(project_dir):
            shutil.rmtree(project_dir)
        if os.path.exists(visualci_src):
            shutil.copytree(
                visualci_src,
                project_dir,
                ignore=shutil.ignore_patterns('node_modules', '.*')
            )
        else:
            print(f"⚠️ Warning: VisualCI project not found at {visualci_src}")

        output_file = os.path.join(project_dir, 'ecore-blocks.tsx')
        generate_tsx_blocks(blocks, output_file=output_file)
        print(f"✅ VisualCI project generated at: {project_dir}")

    else:
        print(f"❌ Unknown output format: {output_format}")


def run_tests_on_all_metamodels(output_format='json'):
    """
    Iterate through the 'metamodels/' directory and generate Blockly specs for each.
    Saves JSON results into a top-level 'tests/' folder.
    """
    metamodels_dir = "metamodels"
    tests_dir = "tests"  # New folder for test outputs
    os.makedirs(tests_dir, exist_ok=True)

    if not os.path.exists(metamodels_dir):
        print(f"❌ No 'metamodels/' directory found.")
        return

    metamodel_files = [
        os.path.join(metamodels_dir, f)
        for f in os.listdir(metamodels_dir)
        if f.endswith('.ecore') or f.endswith('.json')
    ]

    if not metamodel_files:
        print("⚠️ No metamodel files found in 'metamodels/'.")
        return

    print(f"🔍 Found {len(metamodel_files)} metamodel(s) to process:\n")
    for path in metamodel_files:
        print(f"➡️  Processing {os.path.basename(path)} ...")
        try:
            # Save each test’s JSON result under /tests/
            test_metamodel2blockly(path, 'json', output_base_dir=tests_dir)
        except Exception as e:
            print(f"❌ Error processing {path}: {e}")
    print("\n🎉 All metamodels processed. Test outputs saved in /tests/")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Convert Ecore or BESSER metamodels to Blockly JSON/TSX/Web projects')
    parser.add_argument('metamodel', nargs='?', help='Path to a single metamodel (.ecore or .json)')
    parser.add_argument('--output', choices=['web', 'json', 'tsx'], default='web',
                        help='Output format (web, tsx, json)')
    parser.add_argument('--run_tests', action='store_true',
                        help='Process all metamodels in the metamodels/ directory')

    args = parser.parse_args()

    if args.run_tests:
        run_tests_on_all_metamodels(output_format=args.output)
    elif args.metamodel:
        test_metamodel2blockly(args.metamodel, args.output)
        print(f"output: {args.output}")
    else:
        parser.print_help()
