// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "SmartContract",
  "message0": "SmartContract SCName %1 FileName %2 PragmaSolidity %3 primitivetypes %4 gvariables %5 events %6 assets %7 users %8 mappings %9 structs %10 localfunctions %11 globalfunctions %12 localtypes %13 constructors %14",
  "args0": [
    {
      "type": "field_input",
      "name": "SCName",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "FileName",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "PragmaSolidity",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "PRIMITIVETYPES",
      "check": [
        "PrimitiveType"
      ]
    },
    {
      "type": "input_statement",
      "name": "GVARIABLES",
      "check": [
        "GVariable"
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
      "type": "input_statement",
      "name": "ASSETS",
      "check": [
        "Asset"
      ]
    },
    {
      "type": "input_statement",
      "name": "USERS",
      "check": [
        "User"
      ]
    },
    {
      "type": "input_statement",
      "name": "MAPPINGS",
      "check": [
        "Mapping"
      ]
    },
    {
      "type": "input_statement",
      "name": "STRUCTS",
      "check": [
        "Struct"
      ]
    },
    {
      "type": "input_statement",
      "name": "LOCALFUNCTIONS",
      "check": [
        "LocalFunction"
      ]
    },
    {
      "type": "input_statement",
      "name": "GLOBALFUNCTIONS",
      "check": [
        "GlobalFunction"
      ]
    },
    {
      "type": "input_statement",
      "name": "LOCALTYPES",
      "check": [
        "Type"
      ]
    },
    {
      "type": "input_statement",
      "name": "CONSTRUCTORS",
      "check": [
        "Constructor"
      ]
    }
  ],
  "colour": 113,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "PrimitiveType",
  "message0": "PrimitiveType PType %1",
  "args0": [
    {
      "type": "field_input",
      "name": "PType",
      "text": ""
    }
  ],
  "colour": 188,
  "output": "PrimitiveType"
},
  {
  "type": "GVariable",
  "message0": "GVariable VisGV %1 primitivets %2",
  "args0": [
    {
      "type": "field_input",
      "name": "VisGV",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "PRIMITIVETS",
      "check": [
        "PrimitiveType"
      ]
    }
  ],
  "colour": 258,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "EventMember",
  "message0": "EventMember TypeE %1 type %2",
  "args0": [
    {
      "type": "field_input",
      "name": "TypeE",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "Type"
      ]
    }
  ],
  "colour": 1,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Asset",
  "message0": "Asset NameA %1",
  "args0": [
    {
      "type": "field_input",
      "name": "NameA",
      "text": ""
    }
  ],
  "colour": 0,
  "output": "Asset"
},
  {
  "type": "User",
  "message0": "User NameU %1 TUser %2",
  "args0": [
    {
      "type": "field_input",
      "name": "NameU",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "TUser",
      "text": ""
    }
  ],
  "colour": 191,
  "output": "User"
},
  {
  "type": "Mapping",
  "message0": "Mapping NameM %1 A1 %2 A2 %3 VisM %4",
  "args0": [
    {
      "type": "field_input",
      "name": "NameM",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "A1",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "A2",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "VisM",
      "text": ""
    }
  ],
  "colour": 238,
  "output": "Mapping"
},
  {
  "type": "StructMember",
  "message0": "StructMember TypeSM %1 VisSM %2 type %3",
  "args0": [
    {
      "type": "field_input",
      "name": "TypeSM",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "VisSM",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "Type"
      ]
    }
  ],
  "colour": 352,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "FunctionParameter",
  "message0": "FunctionParameter NameFP %1 PType %2 VisFP %3 type %4",
  "args0": [
    {
      "type": "field_input",
      "name": "NameFP",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "PType",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "VisFP",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "Type"
      ]
    }
  ],
  "colour": 249,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Return",
  "message0": "Return NameR %1 type %2",
  "args0": [
    {
      "type": "field_input",
      "name": "NameR",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "Type"
      ]
    }
  ],
  "colour": 25,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Function",
  "message0": "Function Instructions %1 NameF %2 TypeFunction %3 functionparameters %4 returns %5",
  "args0": [
    {
      "type": "field_input",
      "name": "Instructions",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "NameF",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "TypeFunction",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "FUNCTIONPARAMETERS",
      "check": [
        "FunctionParameter"
      ]
    },
    {
      "type": "input_statement",
      "name": "RETURNS",
      "check": [
        "Return"
      ]
    }
  ],
  "colour": 235,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Struct",
  "message0": "Struct NameS %1 instancestructs %2 structmembers %3",
  "args0": [
    {
      "type": "field_input",
      "name": "NameS",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "INSTANCESTRUCTS",
      "check": [
        "InstanceStruct"
      ]
    },
    {
      "type": "input_statement",
      "name": "STRUCTMEMBERS",
      "check": [
        "StructMember"
      ]
    }
  ],
  "colour": 200,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "InstanceStruct",
  "message0": "InstanceStruct VisIS %1 NameIS %2",
  "args0": [
    {
      "type": "field_input",
      "name": "VisIS",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "NameIS",
      "text": ""
    }
  ],
  "colour": 52,
  "output": "InstanceStruct"
},
  {
  "type": "LocalFunction",
  "message0": "LocalFunction VisLF %1",
  "args0": [
    {
      "type": "field_input",
      "name": "VisLF",
      "text": ""
    }
  ],
  "colour": 118,
  "output": "LocalFunction"
},
  {
  "type": "GlobalFunction",
  "message0": "GlobalFunction VisGF %1",
  "args0": [
    {
      "type": "field_input",
      "name": "VisGF",
      "text": ""
    }
  ],
  "colour": 39,
  "output": "GlobalFunction"
},
  {
  "type": "Event",
  "message0": "Event NameE %1 eventmembers %2",
  "args0": [
    {
      "type": "field_input",
      "name": "NameE",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "EVENTMEMBERS",
      "check": [
        "EventMember"
      ]
    }
  ],
  "colour": 51,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Type",
  "message0": "Type NamePPal %1",
  "args0": [
    {
      "type": "field_input",
      "name": "NamePPal",
      "text": ""
    }
  ],
  "colour": 191,
  "output": "Type"
},
  {
  "type": "Repository",
  "message0": "Repository NameR %1 smartcontracts %2 globaltypes %3",
  "args0": [
    {
      "type": "field_input",
      "name": "NameR",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "SMARTCONTRACTS",
      "check": [
        "SmartContract"
      ]
    },
    {
      "type": "input_statement",
      "name": "GLOBALTYPES",
      "check": [
        "Type"
      ]
    }
  ],
  "colour": 85,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Constructor",
  "message0": "Constructor Content %1 constructorps %2",
  "args0": [
    {
      "type": "field_input",
      "name": "Content",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "CONSTRUCTORPS",
      "check": [
        "ConstructorP"
      ]
    }
  ],
  "colour": 182,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "ConstructorP",
  "message0": "ConstructorP NameC %1 type %2",
  "args0": [
    {
      "type": "field_input",
      "name": "NameC",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "Type"
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
    {kind: "block" as const, type: "SmartContract"},
    {kind: "block" as const, type: "PrimitiveType"},
    {kind: "block" as const, type: "GVariable"},
    {kind: "block" as const, type: "EventMember"},
    {kind: "block" as const, type: "Asset"},
    {kind: "block" as const, type: "User"},
    {kind: "block" as const, type: "Mapping"},
    {kind: "block" as const, type: "StructMember"},
    {kind: "block" as const, type: "FunctionParameter"},
    {kind: "block" as const, type: "Return"},
    {kind: "block" as const, type: "Function"},
    {kind: "block" as const, type: "Struct"},
    {kind: "block" as const, type: "InstanceStruct"},
    {kind: "block" as const, type: "LocalFunction"},
    {kind: "block" as const, type: "GlobalFunction"},
    {kind: "block" as const, type: "Event"},
    {kind: "block" as const, type: "Type"},
    {kind: "block" as const, type: "Repository"},
    {kind: "block" as const, type: "Constructor"},
    {kind: "block" as const, type: "ConstructorP"},
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
