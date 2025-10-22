// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Model",
  "message0": "Model action %1",
  "args0": [
    {
      "type": "input_value",
      "name": "ACTION",
      "check": [
        "Action"
      ]
    }
  ],
  "colour": 285,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Action",
  "message0": "Action assignment %1 eventAction %2",
  "args0": [
    {
      "type": "input_value",
      "name": "ASSIGNMENT",
      "check": [
        "Assignment"
      ]
    },
    {
      "type": "input_value",
      "name": "EVENTACTION",
      "check": [
        "EventAction"
      ]
    }
  ],
  "colour": 116,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Assignment",
  "message0": "Assignment leftvar %1 expression %2",
  "args0": [
    {
      "type": "field_input",
      "name": "leftvar",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "EXPRESSION",
      "check": [
        "EXPRESSION"
      ]
    }
  ],
  "colour": 186,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "EXPRESSION",
  "message0": "EXPRESSION operator %1 firstTerm %2 secondTerm %3 alone %4",
  "args0": [
    {
      "type": "field_input",
      "name": "operator",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "FIRSTTERM",
      "check": [
        "TERM"
      ]
    },
    {
      "type": "input_value",
      "name": "SECONDTERM",
      "check": [
        "TERM"
      ]
    },
    {
      "type": "input_value",
      "name": "ALONE",
      "check": [
        "TERM"
      ]
    }
  ],
  "colour": 358,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "TERM",
  "message0": "TERM variable %1 constant %2",
  "args0": [
    {
      "type": "field_input",
      "name": "variable",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "constant",
      "text": ""
    }
  ],
  "colour": 233,
  "output": "TERM"
},
  {
  "type": "EventAction",
  "message0": "EventAction eventName %1 eventExtension %2 parameters %3",
  "args0": [
    {
      "type": "field_input",
      "name": "eventName",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "eventExtension",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "PARAMETERS",
      "check": [
        "Parameters"
      ]
    }
  ],
  "colour": 27,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Parameters",
  "message0": "Parameters param %1 parameters %2",
  "args0": [
    {
      "type": "field_input",
      "name": "param",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "PARAMETERS",
      "check": [
        "Parameters"
      ]
    }
  ],
  "colour": 70,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Model"},
    {kind: "block" as const, type: "Action"},
    {kind: "block" as const, type: "Assignment"},
    {kind: "block" as const, type: "EXPRESSION"},
    {kind: "block" as const, type: "TERM"},
    {kind: "block" as const, type: "EventAction"},
    {kind: "block" as const, type: "Parameters"},
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
