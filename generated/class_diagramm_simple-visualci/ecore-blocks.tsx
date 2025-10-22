// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Class",
  "message0": "Class",
  "args0": [],
  "colour": 211,
  "output": "Class"
},
  {
  "type": "Package",
  "message0": "Package",
  "args0": [],
  "colour": 273,
  "output": "Package"
},
  {
  "type": "Attribute",
  "message0": "Attribute",
  "args0": [],
  "colour": 96,
  "output": "Attribute"
},
  {
  "type": "DataType",
  "message0": "DataType",
  "args0": [],
  "colour": 142,
  "output": "DataType"
},
  {
  "type": "Association",
  "message0": "Association name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 139,
  "output": "Association"
},
  {
  "type": "Method",
  "message0": "Method",
  "args0": [],
  "colour": 198,
  "output": "Method"
},
  {
  "type": "Parameter",
  "message0": "Parameter name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 3,
  "output": "Parameter"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Class"},
    {kind: "block" as const, type: "Package"},
    {kind: "block" as const, type: "Attribute"},
    {kind: "block" as const, type: "DataType"},
    {kind: "block" as const, type: "Association"},
    {kind: "block" as const, type: "Method"},
    {kind: "block" as const, type: "Parameter"},
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
