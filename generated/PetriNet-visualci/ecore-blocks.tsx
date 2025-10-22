// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "PetriNet",
  "message0": "PetriNet name %1 elements %2 arcs %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ELEMENTS",
      "check": [
        "Node"
      ]
    },
    {
      "type": "input_statement",
      "name": "ARCS",
      "check": [
        "Arc"
      ]
    }
  ],
  "colour": 225,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Node",
  "message0": "Node name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 83,
  "output": "Node"
},
  {
  "type": "Place",
  "message0": "Place tokens %1",
  "args0": [
    {
      "type": "field_input",
      "name": "tokens",
      "text": ""
    }
  ],
  "colour": 321,
  "output": "Place"
},
  {
  "type": "Transition",
  "message0": "Transition",
  "args0": [],
  "colour": 258,
  "output": "Transition"
},
  {
  "type": "Arc",
  "message0": "Arc input %1 output %2",
  "args0": [
    {
      "type": "input_value",
      "name": "INPUT",
      "check": [
        "Node"
      ]
    },
    {
      "type": "input_value",
      "name": "OUTPUT",
      "check": [
        "Node"
      ]
    }
  ],
  "colour": 243,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "PetriNet"},
    {kind: "block" as const, type: "Node"},
    {kind: "block" as const, type: "Place"},
    {kind: "block" as const, type: "Transition"},
    {kind: "block" as const, type: "Arc"},
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
