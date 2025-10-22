// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Statemachine",
  "message0": "Statemachine states %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "STATES",
      "check": [
        "State"
      ]
    }
  ],
  "colour": 48,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition targetState %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TARGETSTATE",
      "check": [
        "State"
      ]
    }
  ],
  "colour": 258,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "State",
  "message0": "State name %1 transitions %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "TRANSITIONS",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 103,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Statemachine"},
    {kind: "block" as const, type: "Transition"},
    {kind: "block" as const, type: "State"},
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
