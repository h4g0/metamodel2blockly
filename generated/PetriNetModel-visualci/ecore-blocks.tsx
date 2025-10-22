// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "PetriNetRoot",
  "message0": "PetriNetRoot elements %1 arcs %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "ELEMENTS",
      "check": [
        "Element"
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
  "colour": 19,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Element",
  "message0": "Element name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 213,
  "output": "Element"
},
  {
  "type": "Place",
  "message0": "Place Tokens %1",
  "args0": [
    {
      "type": "field_input",
      "name": "Tokens",
      "text": ""
    }
  ],
  "colour": 321,
  "output": "Place"
},
  {
  "type": "Transition",
  "message0": "Transition minTime %1 maxTime %2",
  "args0": [
    {
      "type": "field_input",
      "name": "minTime",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "maxTime",
      "text": ""
    }
  ],
  "colour": 258,
  "output": "Transition"
},
  {
  "type": "Arc",
  "message0": "Arc In %1 Out %2",
  "args0": [
    {
      "type": "input_value",
      "name": "IN",
      "check": [
        "Element"
      ]
    },
    {
      "type": "input_value",
      "name": "OUT",
      "check": [
        "Element"
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
    {kind: "block" as const, type: "PetriNetRoot"},
    {kind: "block" as const, type: "Element"},
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
