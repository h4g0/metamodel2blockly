// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Pipeline",
  "message0": "Pipeline Name %1 Concurrent %2 when %3 job %4 tool %5 environment %6 permission %7",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "Concurrent",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "WHEN",
      "check": [
        "When"
      ]
    },
    {
      "type": "input_statement",
      "name": "JOB",
      "check": [
        "Job"
      ]
    },
    {
      "type": "input_statement",
      "name": "TOOL",
      "check": [
        "Tool"
      ]
    },
    {
      "type": "input_statement",
      "name": "ENVIRONMENT",
      "check": [
        "Environment"
      ]
    },
    {
      "type": "input_statement",
      "name": "PERMISSION",
      "check": [
        "Permission"
      ]
    }
  ],
  "colour": 135,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Job",
  "message0": "Job Name %1 AllowFailure %2 Description %3 tool %4 command %5 ifthenelse %6 input %7 environment %8 permission %9 output %10 depends %11",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "AllowFailure",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "Description",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "TOOL",
      "check": [
        "Tool"
      ]
    },
    {
      "type": "input_statement",
      "name": "COMMAND",
      "check": [
        "Command"
      ]
    },
    {
      "type": "input_statement",
      "name": "IFTHENELSE",
      "check": [
        "IfThenElse"
      ]
    },
    {
      "type": "input_statement",
      "name": "INPUT",
      "check": [
        "Artifact"
      ]
    },
    {
      "type": "input_statement",
      "name": "ENVIRONMENT",
      "check": [
        "Environment"
      ]
    },
    {
      "type": "input_statement",
      "name": "PERMISSION",
      "check": [
        "Permission"
      ]
    },
    {
      "type": "input_statement",
      "name": "OUTPUT",
      "check": [
        "Artifact"
      ]
    },
    {
      "type": "input_statement",
      "name": "DEPENDS",
      "check": [
        "Job"
      ]
    }
  ],
  "colour": 144,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Command",
  "message0": "Command Name %1 tool %2 parameter %3 depends %4",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TOOL",
      "check": [
        "Tool"
      ]
    },
    {
      "type": "input_statement",
      "name": "PARAMETER",
      "check": [
        "Parameter"
      ]
    },
    {
      "type": "input_statement",
      "name": "DEPENDS",
      "check": [
        "Command"
      ]
    }
  ],
  "colour": 32,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Environment",
  "message0": "Environment Key %1 Value %2",
  "args0": [
    {
      "type": "field_input",
      "name": "Key",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "Value",
      "text": ""
    }
  ],
  "colour": 29,
  "output": "Environment"
},
  {
  "type": "When",
  "message0": "When Name %1 Trigger %2 Timer %3",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "Trigger",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "Timer",
      "text": ""
    }
  ],
  "colour": 274,
  "output": "When"
},
  {
  "type": "Artifact",
  "message0": "Artifact Name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
      "text": ""
    }
  ],
  "colour": 58,
  "output": "Artifact"
},
  {
  "type": "Tool",
  "message0": "Tool Name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "Name",
      "text": ""
    }
  ],
  "colour": 255,
  "output": "Tool"
},
  {
  "type": "IfThenElse",
  "message0": "IfThenElse Condition %1 true %2 false %3",
  "args0": [
    {
      "type": "field_input",
      "name": "Condition",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TRUE",
      "check": [
        "If"
      ]
    },
    {
      "type": "input_value",
      "name": "FALSE",
      "check": [
        "Else"
      ]
    }
  ],
  "colour": 256,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Parameter",
  "message0": "Parameter Parameter %1",
  "args0": [
    {
      "type": "field_input",
      "name": "Parameter",
      "text": ""
    }
  ],
  "colour": 3,
  "output": "Parameter"
},
  {
  "type": "Permission",
  "message0": "Permission Key %1 Value %2",
  "args0": [
    {
      "type": "field_input",
      "name": "Key",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "Value",
      "text": ""
    }
  ],
  "colour": 162,
  "output": "Permission"
},
  {
  "type": "If",
  "message0": "If command %1 ifthenelse %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "COMMAND",
      "check": [
        "Command"
      ]
    },
    {
      "type": "input_statement",
      "name": "IFTHENELSE",
      "check": [
        "IfThenElse"
      ]
    }
  ],
  "colour": 286,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Else",
  "message0": "Else command %1 ifthenelse %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "COMMAND",
      "check": [
        "Command"
      ]
    },
    {
      "type": "input_statement",
      "name": "IFTHENELSE",
      "check": [
        "IfThenElse"
      ]
    }
  ],
  "colour": 333,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Pipeline"},
    {kind: "block" as const, type: "Job"},
    {kind: "block" as const, type: "Command"},
    {kind: "block" as const, type: "Environment"},
    {kind: "block" as const, type: "When"},
    {kind: "block" as const, type: "Artifact"},
    {kind: "block" as const, type: "Tool"},
    {kind: "block" as const, type: "IfThenElse"},
    {kind: "block" as const, type: "Parameter"},
    {kind: "block" as const, type: "Permission"},
    {kind: "block" as const, type: "If"},
    {kind: "block" as const, type: "Else"},
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
