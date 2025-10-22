// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "StateMachine",
  "message0": "StateMachine simple_states %1 transitions %2 events %3 final_states %4 composite_states %5 initial_state %6",
  "args0": [
    {
      "type": "input_statement",
      "name": "SIMPLE_STATES",
      "check": [
        "SimpleState"
      ]
    },
    {
      "type": "input_statement",
      "name": "TRANSITIONS",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_statement",
      "name": "EVENTS",
      "check": [
        "Event"
      ]
    },
    {
      "type": "input_value",
      "name": "FINAL_STATES",
      "check": [
        "Final_state"
      ]
    },
    {
      "type": "input_value",
      "name": "COMPOSITE_STATES",
      "check": [
        "Composite_state"
      ]
    },
    {
      "type": "input_value",
      "name": "INITIAL_STATE",
      "check": [
        "State"
      ]
    }
  ],
  "colour": 220,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "State",
  "message0": "State name %1 outgoing %2 incoming %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "OUTGOING",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_statement",
      "name": "INCOMING",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 103,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition name %1 source %2 target %3 triggers %4",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "State"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGET",
      "check": [
        "State"
      ]
    },
    {
      "type": "input_statement",
      "name": "TRIGGERS",
      "check": [
        "Event"
      ]
    }
  ],
  "colour": 258,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Final_state",
  "message0": "Final_state",
  "args0": [],
  "colour": 36,
  "output": "Final_state"
},
  {
  "type": "Event",
  "message0": "Event description %1 possible_states %2 causes %3",
  "args0": [
    {
      "type": "field_input",
      "name": "description",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "POSSIBLE_STATES",
      "check": [
        "State"
      ]
    },
    {
      "type": "input_statement",
      "name": "CAUSES",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 51,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Composite_state",
  "message0": "Composite_state substates %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "SUBSTATES",
      "check": [
        "State"
      ]
    }
  ],
  "colour": 126,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "SimpleState",
  "message0": "SimpleState",
  "args0": [],
  "colour": 146,
  "output": "SimpleState"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "StateMachine"},
    {kind: "block" as const, type: "State"},
    {kind: "block" as const, type: "Transition"},
    {kind: "block" as const, type: "Final_state"},
    {kind: "block" as const, type: "Event"},
    {kind: "block" as const, type: "Composite_state"},
    {kind: "block" as const, type: "SimpleState"},
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
