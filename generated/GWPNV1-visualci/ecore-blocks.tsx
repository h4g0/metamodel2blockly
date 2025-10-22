// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Place",
  "message0": "Place net %1 src %2 dst %3",
  "args0": [
    {
      "type": "input_value",
      "name": "NET",
      "check": [
        "Net"
      ]
    },
    {
      "type": "input_statement",
      "name": "SRC",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_statement",
      "name": "DST",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 321,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition net %1 src %2 dst %3",
  "args0": [
    {
      "type": "input_value",
      "name": "NET",
      "check": [
        "Net"
      ]
    },
    {
      "type": "input_statement",
      "name": "SRC",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_statement",
      "name": "DST",
      "check": [
        "Place"
      ]
    }
  ],
  "colour": 258,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Net",
  "message0": "Net place %1 transition %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "PLACE",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_statement",
      "name": "TRANSITION",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 303,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Place"},
    {kind: "block" as const, type: "Transition"},
    {kind: "block" as const, type: "Net"},
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
