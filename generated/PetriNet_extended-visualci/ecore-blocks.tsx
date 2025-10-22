// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "LocatedElement",
  "message0": "LocatedElement location %1",
  "args0": [
    {
      "type": "field_input",
      "name": "location",
      "text": ""
    }
  ],
  "colour": 243,
  "output": "LocatedElement"
},
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
  "type": "PetriNet",
  "message0": "PetriNet elements %1 arcs %2 execs %3",
  "args0": [
    {
      "type": "input_statement",
      "name": "ELEMENTS",
      "check": [
        "Element"
      ]
    },
    {
      "type": "input_statement",
      "name": "ARCS",
      "check": [
        "Arc"
      ]
    },
    {
      "type": "input_statement",
      "name": "EXECS",
      "check": [
        "Execution"
      ]
    }
  ],
  "colour": 225,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Element",
  "message0": "Element net %1",
  "args0": [
    {
      "type": "input_value",
      "name": "NET",
      "check": [
        "PetriNet"
      ]
    }
  ],
  "colour": 213,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Place",
  "message0": "Place incomingArc %1 outgoingArc %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "INCOMINGARC",
      "check": [
        "TransitionToPlace"
      ]
    },
    {
      "type": "input_statement",
      "name": "OUTGOINGARC",
      "check": [
        "PlaceToTransition"
      ]
    }
  ],
  "colour": 321,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Transition",
  "message0": "Transition incomingArc %1 outgoingArc %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "INCOMINGARC",
      "check": [
        "PlaceToTransition"
      ]
    },
    {
      "type": "input_statement",
      "name": "OUTGOINGARC",
      "check": [
        "TransitionToPlace"
      ]
    }
  ],
  "colour": 258,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Arc",
  "message0": "Arc weight %1 net %2",
  "args0": [
    {
      "type": "field_input",
      "name": "weight",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "NET",
      "check": [
        "PetriNet"
      ]
    }
  ],
  "colour": 243,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "PlaceToTransition",
  "message0": "PlaceToTransition from %1 to %2",
  "args0": [
    {
      "type": "input_value",
      "name": "FROM",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_value",
      "name": "TO",
      "check": [
        "Transition"
      ]
    }
  ],
  "colour": 238,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "TransitionToPlace",
  "message0": "TransitionToPlace from %1 to %2",
  "args0": [
    {
      "type": "input_value",
      "name": "FROM",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_value",
      "name": "TO",
      "check": [
        "Place"
      ]
    }
  ],
  "colour": 120,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Execution",
  "message0": "Execution markings %1 movements %2 net %3",
  "args0": [
    {
      "type": "input_statement",
      "name": "MARKINGS",
      "check": [
        "Marking"
      ]
    },
    {
      "type": "input_statement",
      "name": "MOVEMENTS",
      "check": [
        "Movement"
      ]
    },
    {
      "type": "input_value",
      "name": "NET",
      "check": [
        "PetriNet"
      ]
    }
  ],
  "colour": 297,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Token",
  "message0": "Token placedAt %1 marking %2",
  "args0": [
    {
      "type": "input_value",
      "name": "PLACEDAT",
      "check": [
        "Place"
      ]
    },
    {
      "type": "input_value",
      "name": "MARKING",
      "check": [
        "Marking"
      ]
    }
  ],
  "colour": 279,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Marking",
  "message0": "Marking tokens %1 exec %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "TOKENS",
      "check": [
        "Token"
      ]
    },
    {
      "type": "input_value",
      "name": "EXEC",
      "check": [
        "Execution"
      ]
    }
  ],
  "colour": 216,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Movement",
  "message0": "Movement exec %1 fire %2 source %3 target %4",
  "args0": [
    {
      "type": "input_value",
      "name": "EXEC",
      "check": [
        "Execution"
      ]
    },
    {
      "type": "input_value",
      "name": "FIRE",
      "check": [
        "Transition"
      ]
    },
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "Marking"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGET",
      "check": [
        "Marking"
      ]
    }
  ],
  "colour": 217,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "LocatedElement"},
    {kind: "block" as const, type: "NamedElement"},
    {kind: "block" as const, type: "PetriNet"},
    {kind: "block" as const, type: "Element"},
    {kind: "block" as const, type: "Place"},
    {kind: "block" as const, type: "Transition"},
    {kind: "block" as const, type: "Arc"},
    {kind: "block" as const, type: "PlaceToTransition"},
    {kind: "block" as const, type: "TransitionToPlace"},
    {kind: "block" as const, type: "Execution"},
    {kind: "block" as const, type: "Token"},
    {kind: "block" as const, type: "Marking"},
    {kind: "block" as const, type: "Movement"},
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
