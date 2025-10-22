// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Model",
  "message0": "Model trigger %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TRIGGER",
      "check": [
        "Trigger"
      ]
    }
  ],
  "colour": 285,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Trigger",
  "message0": "Trigger left %1 right %2",
  "args0": [
    {
      "type": "input_value",
      "name": "LEFT",
      "check": [
        "Left"
      ]
    },
    {
      "type": "input_value",
      "name": "RIGHT",
      "check": [
        "Right"
      ]
    }
  ],
  "colour": 329,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Left",
  "message0": "Left event %1",
  "args0": [
    {
      "type": "input_value",
      "name": "EVENT",
      "check": [
        "Event"
      ]
    }
  ],
  "colour": 206,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Right",
  "message0": "Right op %1 value %2 event %3",
  "args0": [
    {
      "type": "field_input",
      "name": "op",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "value",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "EVENT",
      "check": [
        "Event"
      ]
    }
  ],
  "colour": 264,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Event",
  "message0": "Event eventName %1 eventExtension %2 nowEvent %3",
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
      "type": "field_input",
      "name": "nowEvent",
      "text": ""
    }
  ],
  "colour": 51,
  "output": "Event"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Model"},
    {kind: "block" as const, type: "Trigger"},
    {kind: "block" as const, type: "Left"},
    {kind: "block" as const, type: "Right"},
    {kind: "block" as const, type: "Event"},
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
