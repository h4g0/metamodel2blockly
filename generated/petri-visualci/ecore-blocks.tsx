// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Place",
  "message0": "Place name %1 tokens %2 connection %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "tokens",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "CONNECTION",
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
  "message0": "Transition name %1 connection %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "CONNECTION",
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
  "type": "RedPetri",
  "message0": "RedPetri iniPlace %1 iniTrans %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "INIPLACE",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_statement",
      "name": "INITRANS",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 114,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Place"},
    {kind: "block" as const, type: "Transition"},
    {kind: "block" as const, type: "RedPetri"},
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
