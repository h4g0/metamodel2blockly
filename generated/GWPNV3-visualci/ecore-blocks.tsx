// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Place",
  "message0": "Place net %1 out %2 in %3",
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
      "name": "OUT",
      "check": [
        "PTArc"
      ]
    },
    {
      "type": "input_statement",
      "name": "IN",
      "check": [
        "TPArc"
      ]
    }
  ],
  "colour": 321,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition net %1 in %2 out %3",
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
      "name": "IN",
      "check": [
        "PTArc"
      ]
    },
    {
      "type": "input_statement",
      "name": "OUT",
      "check": [
        "TPArc"
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
  {
  "type": "Arc",
  "message0": "Arc",
  "args0": [],
  "colour": 243,
  "output": "Arc"
},
  {
  "type": "PTArc",
  "message0": "PTArc dst %1 src %2",
  "args0": [
    {
      "type": "input_value",
      "name": "DST",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_value",
      "name": "SRC",
      "check": [
        "Place"
      ]
    }
  ],
  "colour": 266,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "TPArc",
  "message0": "TPArc src %1 dst %2",
  "args0": [
    {
      "type": "input_value",
      "name": "SRC",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_value",
      "name": "DST",
      "check": [
        "Place"
      ]
    }
  ],
  "colour": 317,
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
    {kind: "block" as const, type: "Arc"},
    {kind: "block" as const, type: "PTArc"},
    {kind: "block" as const, type: "TPArc"},
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
