// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Model",
  "message0": "Model imports %1 elements %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "IMPORTS",
      "check": [
        "Import"
      ]
    },
    {
      "type": "input_statement",
      "name": "ELEMENTS",
      "check": [
        "Element"
      ]
    }
  ],
  "colour": 285,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Import",
  "message0": "Import importURI %1",
  "args0": [
    {
      "type": "field_input",
      "name": "importURI",
      "text": ""
    }
  ],
  "colour": 251,
  "output": "Import"
},
  {
  "type": "Element",
  "message0": "Element",
  "args0": [],
  "colour": 213,
  "output": "Element"
},
  {
  "type": "Statemachine",
  "message0": "Statemachine state %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "STATE",
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
  "type": "State",
  "message0": "State type %1 name %2 element %3",
  "args0": [
    {
      "type": "field_input",
      "name": "type",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ELEMENT",
      "check": [
        "Activity"
      ]
    }
  ],
  "colour": 103,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Activity",
  "message0": "Activity",
  "args0": [],
  "colour": 116,
  "output": "Activity"
},
  {
  "type": "TransitionBlock",
  "message0": "TransitionBlock event %1 transition %2",
  "args0": [
    {
      "type": "field_input",
      "name": "event",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "TRANSITION",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 47,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition guard %1 action %2 state %3",
  "args0": [
    {
      "type": "field_input",
      "name": "guard",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "action",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "STATE",
      "check": [
        "State"
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
    {kind: "block" as const, type: "Model"},
    {kind: "block" as const, type: "Import"},
    {kind: "block" as const, type: "Element"},
    {kind: "block" as const, type: "Statemachine"},
    {kind: "block" as const, type: "State"},
    {kind: "block" as const, type: "Activity"},
    {kind: "block" as const, type: "TransitionBlock"},
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
