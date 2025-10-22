// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Statechart",
  "message0": "Statechart topState %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TOPSTATE",
      "check": [
        "AND"
      ]
    }
  ],
  "colour": 191,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "State",
  "message0": "State name %1 next %2 rnext %3 rcontains %4",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "NEXT",
      "check": [
        "State"
      ]
    },
    {
      "type": "input_statement",
      "name": "RNEXT",
      "check": [
        "State"
      ]
    },
    {
      "type": "input_value",
      "name": "RCONTAINS",
      "check": [
        "Compound"
      ]
    }
  ],
  "colour": 103,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "HyperEdge",
  "message0": "HyperEdge",
  "args0": [],
  "colour": 291,
  "output": "HyperEdge"
},
  {
  "type": "Basic",
  "message0": "Basic",
  "args0": [],
  "colour": 7,
  "output": "Basic"
},
  {
  "type": "Compound",
  "message0": "Compound contains %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "CONTAINS",
      "check": [
        "State"
      ]
    }
  ],
  "colour": 174,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "AND",
  "message0": "AND",
  "args0": [],
  "colour": 135,
  "output": "AND"
},
  {
  "type": "OR",
  "message0": "OR",
  "args0": [],
  "colour": 277,
  "output": "OR"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Statechart"},
    {kind: "block" as const, type: "State"},
    {kind: "block" as const, type: "HyperEdge"},
    {kind: "block" as const, type: "Basic"},
    {kind: "block" as const, type: "Compound"},
    {kind: "block" as const, type: "AND"},
    {kind: "block" as const, type: "OR"},
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
