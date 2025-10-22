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
  "message0": "Place postt %1 pret %2 cnet %3",
  "args0": [
    {
      "type": "input_statement",
      "name": "POSTT",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_statement",
      "name": "PRET",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_value",
      "name": "CNET",
      "check": [
        "Net"
      ]
    }
  ],
  "colour": 321,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition prep %1 postp %2 cnet %3",
  "args0": [
    {
      "type": "input_statement",
      "name": "PREP",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_statement",
      "name": "POSTP",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_value",
      "name": "CNET",
      "check": [
        "Net"
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
