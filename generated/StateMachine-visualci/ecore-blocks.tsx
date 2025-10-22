// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
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
  "type": "StateMachine",
  "message0": "StateMachine regions %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "REGIONS",
      "check": [
        "Region"
      ]
    }
  ],
  "colour": 220,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "State",
  "message0": "State",
  "args0": [],
  "colour": 103,
  "output": "State"
},
  {
  "type": "StateMachineDescription",
  "message0": "StateMachineDescription states %1 transitions %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "STATES",
      "check": [
        "AbstractState"
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
  "colour": 181,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Region",
  "message0": "Region",
  "args0": [],
  "colour": 312,
  "output": "Region"
},
  {
  "type": "AbstractState",
  "message0": "AbstractState incomingTransitions %1 outcomingTransitions %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "INCOMINGTRANSITIONS",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_statement",
      "name": "OUTCOMINGTRANSITIONS",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 96,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition guard %1 from %2 to %3",
  "args0": [
    {
      "type": "field_input",
      "name": "guard",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "FROM",
      "check": [
        "AbstractState"
      ]
    },
    {
      "type": "input_value",
      "name": "TO",
      "check": [
        "AbstractState"
      ]
    }
  ],
  "colour": 258,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "InitialState",
  "message0": "InitialState",
  "args0": [],
  "colour": 9,
  "output": "InitialState"
},
  {
  "type": "FinalState",
  "message0": "FinalState",
  "args0": [],
  "colour": 133,
  "output": "FinalState"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "NamedElement"},
    {kind: "block" as const, type: "StateMachine"},
    {kind: "block" as const, type: "State"},
    {kind: "block" as const, type: "StateMachineDescription"},
    {kind: "block" as const, type: "Region"},
    {kind: "block" as const, type: "AbstractState"},
    {kind: "block" as const, type: "Transition"},
    {kind: "block" as const, type: "InitialState"},
    {kind: "block" as const, type: "FinalState"},
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
