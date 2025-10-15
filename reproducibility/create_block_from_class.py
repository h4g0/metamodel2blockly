import json
import os
import zlib
from collections import OrderedDict

def _compute_colour(name: str) -> int:
    """Stable colour value in [0, 359] based on CRC32 of the class name."""
    return zlib.crc32(name.encode()) % 360

def convert_metamodel_to_blockly(metamodel):
    """Convert an Ecore-like metamodel to a Blockly JSON representation that
    mirrors the structure of the manually-fixed TSX blocks (placeholders, input
    statements, output typing, etc.).

    :param metamodel: List of tuples, each containing
                      (class_name, [attributes, containments, relationships])
    :return: Dict[str, dict] representing Blockly block JSON definitions.
    """
    blockly_blocks = {}

    for class_info in metamodel:
        class_name = class_info[0]
        attributes = class_info[1][0]
        containments = class_info[1][1]
        relationships = class_info[1][2]

        # Base structure with stable color
        block = {
            "type": class_name,
            "message0": "",
            "args0": [],
            "colour": _compute_colour(class_name),
        }

        # Build message and args arrays
        message_parts = [class_name]
        
        # 1. Attributes - field inputs
        if attributes:
            for attr in attributes:
                message_parts.append(f"{attr['name']} %{len(block['args0']) + 1}")
                field_def = {
                    "type": "field_input",
                    "name": attr["name"],
                    "text": ""  # Empty default text
                }
                block["args0"].append(field_def)

        # 2. Containments - input_statement (multi-child) or input_value (single child)
        if containments:
            for containment in containments:
                if containment["many"]:
                    message_parts.append(f"{containment['name']} %{len(block['args0']) + 1}")
                    stmt_def = {
                        "type": "input_statement",
                        "name": containment["name"].upper(),
                        "check": [containment["type"]]
                    }
                    block["args0"].append(stmt_def)
                else:
                    message_parts.append(f"{containment['name']} %{len(block['args0']) + 1}")
                    input_val = {
                        "type": "input_value",
                        "name": containment["name"].upper(),
                        "check": [containment["type"]]
                    }
                    block["args0"].append(input_val)

        # 3. Relationships - input_value for references
        if relationships:
            for relationship in relationships:
                if relationship["many"]:
                    message_parts.append(f"{relationship['name']} %{len(block['args0']) + 1}")
                    stmt_def = {
                        "type": "input_statement",
                        "name": relationship["name"].upper(),
                        "check": [relationship["type"]]
                    }
                    block["args0"].append(stmt_def)
                else:
                    message_parts.append(f"{relationship['name']} %{len(block['args0']) + 1}")
                    input_val = {
                        "type": "input_value",
                        "name": relationship["name"].upper(),
                        "check": [relationship["type"]]
                    }
                    block["args0"].append(input_val)

        # Combine message parts
        block["message0"] = " ".join(message_parts)

        # 4. Connection / output typing rules
        # Blocks with containments or relationships act as statement blocks
        if containments or relationships:
            block["previousStatement"] = None
            block["nextStatement"] = None
        else:
            # Leaf blocks (only attributes) act as value blocks
            block["output"] = class_name

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
    
    # Create toolbox XML without categories - blocks directly available
    toolbox_content = []
    for block_type in blockly_blocks.keys():
        toolbox_content.append(f'        <block type="{block_type}"></block>')
    
    # HTML template with Blockly integration
    html_template = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Blockly Metamodel Editor</title>
    <script src="https://unpkg.com/blockly/blockly.min.js"></script>
    <script src="https://unpkg.com/blockly/msg/en.js"></script>
    <style>
        body {{ margin: 0; font-family: sans-serif; }}
        #blocklyDiv {{ 
            position: absolute; 
            width: 100%; 
            height: 100%; 
        }}
        #controls {{
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 1000;
            background: white;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }}
        button {{
            margin: 5px;
            padding: 5px 10px;
            cursor: pointer;
        }}
    </style>
</head>
<body>
    <div id="controls">
        <button onclick="exportCode()">Export XML</button>
        <button onclick="clearWorkspace()">Clear</button>
    </div>
    <div id="blocklyDiv"></div>
    
    <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox">
{chr(10).join(toolbox_content)}
    </xml>

    <script>
        // Custom block definitions
        const blockDefinitions = {json.dumps(blockly_blocks, indent=8)};
        
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
            }},
            scrollbars: true
        }});

        // Export functionality
        function exportCode() {{
            const xml = Blockly.Xml.workspaceToDom(workspace);
            const xmlText = Blockly.Xml.domToPrettyText(xml);
            
            // Create download link
            const blob = new Blob([xmlText], {{type: 'text/xml'}});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'blockly_model.xml';
            a.click();
            URL.revokeObjectURL(url);
        }}

        function clearWorkspace() {{
            if (confirm('Are you sure you want to clear the workspace?')) {{
                workspace.clear();
            }}
        }}
    </script>
</body>
</html>"""
    
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
    
    # Generate TypeScript content
    tsx_content = "// Custom Ecore model blocks for Blockly\n"
    tsx_content += "// Generated automatically from metamodel\n\n"
    
    # Generate ECORE_BLOCKS array with proper TypeScript typing
    tsx_content += "export const ECORE_BLOCKS = [\n"
    for block_type, block_def in blockly_blocks.items():
        tsx_content += f"  {json.dumps(block_def, indent=2)},\n"
    tsx_content += "] as const;\n\n"
    
    # Generate ECORE_TOOLBOX with flyout style (no categories)
    tsx_content += "export const ECORE_TOOLBOX = {\n"
    tsx_content += "  kind: \"flyoutToolbox\" as const,\n"
    tsx_content += "  contents: [\n"
    for block_type in blockly_blocks:
        tsx_content += f"    {{kind: \"block\" as const, type: \"{block_type}\"}},\n"
    tsx_content += "  ],\n"
    tsx_content += "} as const;\n\n"
    
    # Add block registration helper
    tsx_content += "// Helper function to register blocks with Blockly\n"
    tsx_content += "export function registerEcoreBlocks() {\n"
    tsx_content += "  ECORE_BLOCKS.forEach((blockDef) => {\n"
    tsx_content += "    if (typeof Blockly !== 'undefined' && Blockly.Blocks) {\n"
    tsx_content += "      Blockly.Blocks[blockDef.type] = {\n"
    tsx_content += "        init: function() {\n"
    tsx_content += "          this.jsonInit(blockDef);\n"
    tsx_content += "        }\n"
    tsx_content += "      };\n"
    tsx_content += "    }\n"
    tsx_content += "  });\n"
    tsx_content += "}\n"
    
    # Write to single file
    with open(output_file, 'w') as f:
        f.write(tsx_content)
    
    print(f"Generated {len(blockly_blocks)} TSX block components in {os.path.abspath(output_file)}")

# Example usage
def main():
    # Sample metamodel with more complete structure
    metamodel = [
        ('Pipeline', [
            [
                {'name': 'Name', 'type': 'EString', 'many': False}, 
                {'name': 'Concurrent', 'type': 'EBoolean', 'many': False}
            ], 
            [
                {'name': 'when', 'type': 'When', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, 
                {'name': 'job', 'type': 'Job', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, 
                {'name': 'tool', 'type': 'Tool', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, 
                {'name': 'environment', 'type': 'Environment', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, 
                {'name': 'permission', 'type': 'Permission', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}
            ], 
            []
        ]),
        ('Job', [
            [
                {'name': 'Name', 'type': 'EString', 'many': False}, 
                {'name': 'AllowFailure', 'type': 'EBoolean', 'many': False}, 
                {'name': 'Description', 'type': 'EString', 'many': False}
            ], 
            [
                {'name': 'tool', 'type': 'Tool', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, 
                {'name': 'command', 'type': 'Command', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, 
                {'name': 'ifthenelse', 'type': 'IfThenElse', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, 
                {'name': 'input', 'type': 'Artifact', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, 
                {'name': 'environment', 'type': 'Environment', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}, 
                {'name': 'permission', 'type': 'Permission', 'many': True, 'containment_type': 'Composition', 'opposite_reference': None}
            ], 
            [
                {'name': 'output', 'type': 'Artifact', 'many': True, 'opposite_reference': None}, 
                {'name': 'depends', 'type': 'Job', 'many': True, 'opposite_reference': None}
            ]
        ]),
        ('Tool', [
            [
                {'name': 'Name', 'type': 'EString', 'many': False},
                {'name': 'Version', 'type': 'EString', 'many': False}
            ], 
            [], 
            []
        ]),
        ('Command', [
            [
                {'name': 'Name', 'type': 'EString', 'many': False},
                {'name': 'Script', 'type': 'EString', 'many': False}
            ], 
            [], 
            []
        ]),
        ('Environment', [
            [
                {'name': 'Key', 'type': 'EString', 'many': False},
                {'name': 'Value', 'type': 'EString', 'many': False}
            ], 
            [], 
            []
        ]),
        ('Artifact', [
            [
                {'name': 'Name', 'type': 'EString', 'many': False},
                {'name': 'Path', 'type': 'EString', 'many': False}
            ], 
            [], 
            []
        ])
    ]
    
    # Generate Blockly HTML editor
    generate_blockly_html(metamodel)
    
    # Generate TSX block components
    blockly_blocks = convert_metamodel_to_blockly(metamodel)
    generate_tsx_blocks(blockly_blocks)

if __name__ == "__main__":
    main()