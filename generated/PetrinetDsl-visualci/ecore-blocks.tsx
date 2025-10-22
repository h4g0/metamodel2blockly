// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "PetriNet",
  "message0": "PetriNet resources %1 places %2 transactions %3",
  "args0": [
    {
      "type": "input_statement",
      "name": "RESOURCES",
      "check": [
        "Resource"
      ]
    },
    {
      "type": "input_statement",
      "name": "PLACES",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_statement",
      "name": "TRANSACTIONS",
      "check": [
        "Transaction"
      ]
    }
  ],
  "colour": 225,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Resource",
  "message0": "Resource name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 64,
  "output": "Resource"
},
  {
  "type": "Place",
  "message0": "Place name %1 storages %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "STORAGES",
      "check": [
        "Storage"
      ]
    }
  ],
  "colour": 321,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Storage",
  "message0": "Storage count %1 capacity %2 resourceRef %3",
  "args0": [
    {
      "type": "field_input",
      "name": "count",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "capacity",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "RESOURCEREF",
      "check": [
        "Resource"
      ]
    }
  ],
  "colour": 16,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transaction",
  "message0": "Transaction name %1 assureStatements %2 takeStatements %3 putStatements %4",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ASSURESTATEMENTS",
      "check": [
        "AssureStatement"
      ]
    },
    {
      "type": "input_statement",
      "name": "TAKESTATEMENTS",
      "check": [
        "TakeStatement"
      ]
    },
    {
      "type": "input_statement",
      "name": "PUTSTATEMENTS",
      "check": [
        "PutStatement"
      ]
    }
  ],
  "colour": 334,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "AssureStatement",
  "message0": "AssureStatement count %1 resourceRef %2 placeRef %3",
  "args0": [
    {
      "type": "field_input",
      "name": "count",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "RESOURCEREF",
      "check": [
        "Resource"
      ]
    },
    {
      "type": "input_value",
      "name": "PLACEREF",
      "check": [
        "Place"
      ]
    }
  ],
  "colour": 303,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "TakeStatement",
  "message0": "TakeStatement count %1 resourceRef %2 placeRef %3",
  "args0": [
    {
      "type": "field_input",
      "name": "count",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "RESOURCEREF",
      "check": [
        "Resource"
      ]
    },
    {
      "type": "input_value",
      "name": "PLACEREF",
      "check": [
        "Place"
      ]
    }
  ],
  "colour": 25,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "PutStatement",
  "message0": "PutStatement count %1 resourceRef %2 placeRef %3",
  "args0": [
    {
      "type": "field_input",
      "name": "count",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "RESOURCEREF",
      "check": [
        "Resource"
      ]
    },
    {
      "type": "input_value",
      "name": "PLACEREF",
      "check": [
        "Place"
      ]
    }
  ],
  "colour": 275,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "PetriNet"},
    {kind: "block" as const, type: "Resource"},
    {kind: "block" as const, type: "Place"},
    {kind: "block" as const, type: "Storage"},
    {kind: "block" as const, type: "Transaction"},
    {kind: "block" as const, type: "AssureStatement"},
    {kind: "block" as const, type: "TakeStatement"},
    {kind: "block" as const, type: "PutStatement"},
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
