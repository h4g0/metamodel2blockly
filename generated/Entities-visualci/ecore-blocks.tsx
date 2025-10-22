// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Model",
  "message0": "Model imports %1 elements %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "IMPORTS",
      "check": [
        "Import"
      ]
    },
    {
      "type": "input_statement",
      "name": "ELEMENTS",
      "check": [
        "Type"
      ]
    }
  ],
  "colour": 285,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Import",
  "message0": "Import importURI %1",
  "args0": [
    {
      "type": "field_input",
      "name": "importURI",
      "text": ""
    }
  ],
  "colour": 251,
  "output": "Import"
},
  {
  "type": "Type",
  "message0": "Type name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 191,
  "output": "Type"
},
  {
  "type": "SimpleType",
  "message0": "SimpleType",
  "args0": [],
  "colour": 156,
  "output": "SimpleType"
},
  {
  "type": "Entity",
  "message0": "Entity properties %1 extends %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "PROPERTIES",
      "check": [
        "Property"
      ]
    },
    {
      "type": "input_value",
      "name": "EXTENDS",
      "check": [
        "Entity"
      ]
    }
  ],
  "colour": 270,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Property",
  "message0": "Property name %1 many %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "many",
      "text": ""
    }
  ],
  "colour": 328,
  "output": "Property"
},
  {
  "type": "SimpleProperty",
  "message0": "SimpleProperty type %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "SimpleType"
      ]
    }
  ],
  "colour": 142,
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
    {kind: "block" as const, type: "Model"},
    {kind: "block" as const, type: "Import"},
    {kind: "block" as const, type: "Type"},
    {kind: "block" as const, type: "SimpleType"},
    {kind: "block" as const, type: "Entity"},
    {kind: "block" as const, type: "Property"},
    {kind: "block" as const, type: "SimpleProperty"},
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
