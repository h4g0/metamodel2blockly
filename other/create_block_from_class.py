import json
import os

def convert_metamodel_to_blockly(metamodel):
    """
    Convert an Ecore-like metamodel to Blockly JSON representation.
    
    :param metamodel: List of tuples, each containing (class_name, [attributes, containments, relationships])
    :return: Dictionary representing Blockly blocks
    """
    blockly_blocks = {}
    
    for class_info in metamodel:
        class_name = class_info[0]
        attributes = class_info[1][0]
        containments = class_info[1][1]
        relationships = class_info[1][2]
        
        # Base block structure
        block = {
            "type": class_name,
            "message0": f"{class_name}",
            "args0": [],
            "colour": hash(class_name) % 360,  # Deterministic color based on class name
        }
        
        # Add a section for attributes
        if attributes:
            block["message0"] += " Attributes"
            for attr in attributes:
                field = {
                    "type": "field_input",
                    "name": attr['name'],
                    "text": attr['name']
                }
                block['args0'].append(field)
        
        # Add a section for containments
        if containments:
            block["message0"] += " Containments"
            for containment in containments:
                input_field = {
                    "type": "input_value",
                    "name": containment['name'],
                    "check": [containment['type']],
                }
                block['args0'].append(input_field)
        
        # Optional connections
        if containments or relationships:
            block["previousStatement"] = None
            block["nextStatement"] = None
        
        blockly_blocks[class_name] = block
    
    return blockly_blocks

def generate_blockly_html(metamodel, output_path='blockly_editor.html'):
    """
    Generate an HTML file with Blockly environment for the given metamodel.
    
    :param metamodel: List of tuples representing the metamodel
    :param output_path: Path to save the HTML file
    """
    # Convert metamodel to Blockly blocks
    blockly_blocks = convert_metamodel_to_blockly(metamodel)
    
    # HTML template with Blockly integration
    html_template = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Blockly Metamodel Editor</title>
    <script src="https://unpkg.com/blockly/blockly.min.js"></script>
    <script src="https://unpkg.com/blockly/msg/en.js"></script>
    <style>
        body {{ margin: 0; }}
        #blocklyDiv {{ 
            position: absolute; 
            width: 100%; 
            height: 100%; 
        }}
    </style>
</head>
<body>
    <div id="blocklyDiv"></div>
    
    <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox">
        {''.join([f'<block type="{block_type}"></block>' for block_type in blockly_blocks.keys()])}
    </xml>

    <script>
        // Custom block definitions
        const blockDefinitions = {json.dumps(blockly_blocks, indent=2)};
        
        // Register custom blocks
        for (const [blockType, blockDef] of Object.entries(blockDefinitions)) {{
            Blockly.Blocks[blockType] = {{
                init: function() {{
                    this.jsonInit(blockDef);
                }}
            }};
        }}

        // Configure Blockly workspace
        const workspace = Blockly.inject('blocklyDiv', {{
            toolbox: document.getElementById('toolbox'),
            grid: {{
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true
            }},
            trashcan: true,
            zoom: {{
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            }}
        }});
    </script>
</body>
</html>
    """
    
    # Write HTML to file
    with open(output_path, 'w') as f:
        f.write(html_template)
    
    print(f"Blockly HTML editor generated at {os.path.abspath(output_path)}")

def generate_tsx_blocks(blockly_blocks, output_file='blockly_components.tsx'):
    """
    Generate TSX components from Blockly blocks in a single file.
    
    :param blockly_blocks: Dictionary of Blockly block definitions
    :param output_file: File to save all TSX components
    """
    # Create parent directory if needed
    output_dir = os.path.dirname(output_file)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir)
    
    # Generate ECORE_BLOCKS array
    tsx_content = "// Custom Ecore model blocks for Blockly\n"
    tsx_content += "export const ECORE_BLOCKS = [\n"
    for block_type, block_def in blockly_blocks.items():
        tsx_content += f"    {json.dumps(block_def, indent=4)},\n"
    tsx_content += "];\n\n"
    
    # Generate ECORE_TOOLBOX
    tsx_content += "export const ECORE_TOOLBOX = {\n"
    tsx_content += "    kind: \"flyoutToolbox\",\n"
    tsx_content += "    contents: [\n"
    for block_type in blockly_blocks:
        tsx_content += f"        {{\"kind\": \"block\", \"type\": \"{block_type}\"}},\n"
    tsx_content += "    ],\n"
    tsx_content += "};\n"
    
    # Write to single file
    with open(output_file, 'w') as f:
        f.write(tsx_content)
    
    print(f"Generated {len(blockly_blocks)} TSX block components in {os.path.abspath(output_file)}")

# Example usage
def main():
    metamodel = [('Pipeline', [[{'name': 'Name', 'type': 'EString', 'many': False}, {'name': 'Concurrent', 'type': 'EBoolean', 'many': False}], [{'name': 'when', 'type': 'When', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, {'name': 'job', 'type': 'Job', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, {'name': 'tool', 'type': 'Tool', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, {'name': 'environment', 'type': 'Environment', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, {'name': 'permission', 'type': 'Permission', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}], []]),
                 ('Job', [[{'name': 'Name', 'type': 'EString', 'many': False}, {'name': 'AllowFailure', 'type': 'EBoolean', 'many': False}, {'name': 'Description', 'type': 'EString', 'many': False}], [{'name': 'tool', 'type': 'Tool', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, {'name': 'command', 'type': 'Command', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, {'name': 'ifthenelse', 'type': 'IfThenElse', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, {'name': 'input', 'type': 'Artifact', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, {'name': 'environment', 'type': 'Environment', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, {'name': 'permission', 'type': 'Permission', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}], [{'name': 'output', 'type': 'Artifact', 'many': True, 'opposite_reference': None}, {'name': 'depends', 'type': 'Job', 'many': True, 'opposite_reference': None}]]),
                 # Add other classes...
                ]
    
    # Generate Blockly HTML editor
    generate_blockly_html(metamodel)
    
    # Generate TSX block components
    blockly_blocks = convert_metamodel_to_blockly(metamodel)
    generate_tsx_blocks(blockly_blocks)

if __name__ == "__main__":
    main()