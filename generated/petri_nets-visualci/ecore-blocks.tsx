// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "PetriNet",
  "message0": "PetriNet elems %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "ELEMS",
      "check": [
        "NamedElement"
      ]
    }
  ],
  "colour": 225,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "NamedElement",
  "message0": "NamedElement name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 152,
  "output": "NamedElement"
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
  "message0": "Transition in %1 out %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "IN",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_statement",
      "name": "OUT",
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
    {kind: "block" as const, type: "PetriNet"},
    {kind: "block" as const, type: "NamedElement"},
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
