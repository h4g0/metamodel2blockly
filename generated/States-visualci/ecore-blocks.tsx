// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Module",
  "message0": "Module name %1 machines %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "MACHINES",
      "check": [
        "Statemachine"
      ]
    }
  ],
  "colour": 62,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Statemachine",
  "message0": "Statemachine initial %1 name %2 value %3 events %4 states %5",
  "args0": [
    {
      "type": "field_input",
      "name": "initial",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "value",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "EVENTS",
      "check": [
        "Event"
      ]
    },
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
  "type": "Event",
  "message0": "Event name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 51,
  "output": "Event"
},
  {
  "type": "State",
  "message0": "State initial %1 name %2 transitions %3",
  "args0": [
    {
      "type": "field_input",
      "name": "initial",
      "text": ""
    },
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
  {
  "type": "SimpleState",
  "message0": "SimpleState value %1",
  "args0": [
    {
      "type": "field_input",
      "name": "value",
      "text": ""
    }
  ],
  "colour": 146,
  "output": "SimpleState"
},
  {
  "type": "CompoundState",
  "message0": "CompoundState machine %1",
  "args0": [
    {
      "type": "input_value",
      "name": "MACHINE",
      "check": [
        "Statemachine"
      ]
    }
  ],
  "colour": 246,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition event %1 state %2",
  "args0": [
    {
      "type": "input_value",
      "name": "EVENT",
      "check": [
        "Event"
      ]
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
    {kind: "block" as const, type: "Module"},
    {kind: "block" as const, type: "Statemachine"},
    {kind: "block" as const, type: "Event"},
    {kind: "block" as const, type: "State"},
    {kind: "block" as const, type: "SimpleState"},
    {kind: "block" as const, type: "CompoundState"},
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
