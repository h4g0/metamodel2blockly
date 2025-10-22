// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Net",
  "message0": "Net places %1 transitions %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "PLACES",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_statement",
      "name": "TRANSITIONS",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 303,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Place",
  "message0": "Place name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 321,
  "output": "Place"
},
  {
  "type": "Transition",
  "message0": "Transition name %1 input %2 output %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "INPUT",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_statement",
      "name": "OUTPUT",
      "check": [
        "Place"
      ]
    }
  ],
  "colour": 258,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Net"},
    {kind: "block" as const, type: "Place"},
    {kind: "block" as const, type: "Transition"},
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
