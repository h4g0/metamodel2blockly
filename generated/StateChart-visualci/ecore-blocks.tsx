// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Model",
  "message0": "Model name %1 nodes %2 transitions %3 variables %4",
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
    },
    {
      "type": "input_statement",
      "name": "VARIABLES",
      "check": [
        "Variable"
      ]
    }
  ],
  "colour": 285,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Node",
  "message0": "Node name %1 label %2 type %3 activity %4 Children %5 variables %6 Father_of %7",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "label",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "type",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "activity",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "CHILDREN",
      "check": [
        "Node"
      ]
    },
    {
      "type": "input_statement",
      "name": "VARIABLES",
      "check": [
        "Variable"
      ]
    },
    {
      "type": "input_value",
      "name": "FATHER_OF",
      "check": [
        "Node"
      ]
    }
  ],
  "colour": 83,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition TE %1 name %2 source %3 target %4",
  "args0": [
    {
      "type": "field_input",
      "name": "TE",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
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
  "type": "Variable",
  "message0": "Variable name %1 type %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "type",
      "text": ""
    }
  ],
  "colour": 35,
  "output": "Variable"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Model"},
    {kind: "block" as const, type: "Node"},
    {kind: "block" as const, type: "Transition"},
    {kind: "block" as const, type: "Variable"},
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
