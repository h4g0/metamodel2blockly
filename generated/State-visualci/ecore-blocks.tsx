// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Node",
  "message0": "Node incoming %1 outgoing %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "INCOMING",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_statement",
      "name": "OUTGOING",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 83,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition triggerEventName %1 guard %2 source %3 target %4",
  "args0": [
    {
      "type": "field_input",
      "name": "triggerEventName",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "GUARD",
      "check": [
        "Condition"
      ]
    },
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "Node"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGET",
      "check": [
        "Node"
      ]
    }
  ],
  "colour": 258,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "InitialNode",
  "message0": "InitialNode",
  "args0": [],
  "colour": 234,
  "output": "InitialNode"
},
  {
  "type": "FinalNode",
  "message0": "FinalNode",
  "args0": [],
  "colour": 191,
  "output": "FinalNode"
},
  {
  "type": "ConditionalNode",
  "message0": "ConditionalNode condition %1",
  "args0": [
    {
      "type": "input_value",
      "name": "CONDITION",
      "check": [
        "Condition"
      ]
    }
  ],
  "colour": 14,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "State",
  "message0": "State name %1 duration %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "duration",
      "text": ""
    }
  ],
  "colour": 103,
  "output": "State"
},
  {
  "type": "StateMachine",
  "message0": "StateMachine name %1 nodes %2 transitions %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "NODES",
      "check": [
        "Node"
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
  "colour": 220,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Condition",
  "message0": "Condition expression %1",
  "args0": [
    {
      "type": "field_input",
      "name": "expression",
      "text": ""
    }
  ],
  "colour": 96,
  "output": "Condition"
},
  {
  "type": "TimeoutTransition",
  "message0": "TimeoutTransition",
  "args0": [],
  "colour": 187,
  "output": "TimeoutTransition"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Node"},
    {kind: "block" as const, type: "Transition"},
    {kind: "block" as const, type: "InitialNode"},
    {kind: "block" as const, type: "FinalNode"},
    {kind: "block" as const, type: "ConditionalNode"},
    {kind: "block" as const, type: "State"},
    {kind: "block" as const, type: "StateMachine"},
    {kind: "block" as const, type: "Condition"},
    {kind: "block" as const, type: "TimeoutTransition"},
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
