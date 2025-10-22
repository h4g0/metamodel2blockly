// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Module",
  "message0": "Module id %1 types %2",
  "args0": [
    {
      "type": "field_input",
      "name": "id",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "TYPES",
      "check": [
        "Type"
      ]
    }
  ],
  "colour": 62,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Type",
  "message0": "Type id %1",
  "args0": [
    {
      "type": "field_input",
      "name": "id",
      "text": ""
    }
  ],
  "colour": 191,
  "output": "Type"
},
  {
  "type": "Entity",
  "message0": "Entity properties %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "PROPERTIES",
      "check": [
        "Property"
      ]
    }
  ],
  "colour": 270,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "DataType",
  "message0": "DataType",
  "args0": [],
  "colour": 142,
  "output": "DataType"
},
  {
  "type": "Property",
  "message0": "Property id %1",
  "args0": [
    {
      "type": "field_input",
      "name": "id",
      "text": ""
    }
  ],
  "colour": 328,
  "output": "Property"
},
  {
  "type": "Attribute",
  "message0": "Attribute type %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "DataType"
      ]
    }
  ],
  "colour": 96,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Reference",
  "message0": "Reference type %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "Entity"
      ]
    }
  ],
  "colour": 40,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Module"},
    {kind: "block" as const, type: "Type"},
    {kind: "block" as const, type: "Entity"},
    {kind: "block" as const, type: "DataType"},
    {kind: "block" as const, type: "Property"},
    {kind: "block" as const, type: "Attribute"},
    {kind: "block" as const, type: "Reference"},
  ],
} as const;

// Helper function to register blocks with Blockly
export function registerEcoreBlocks() {
  ECORE_BLOCKS.forEach((blockDef) => {
    if (typeof Blockly !== 'undefined' && Blockly.Blocks) {
      Blockly.Blocks[blockDef.type] = {
        init: function() {
          this.jsonInit(blockDef);
        }
      };
    }
  });
}
