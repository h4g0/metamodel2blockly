// Custom Ecore model blocks for Blockly
export const ECORE_BLOCKS = [
    {
    "type": "SmartContract",
    "message0": "SmartContract Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "SCName",
            "text": "SCName"
        },
        {
            "type": "field_input",
            "name": "FileName",
            "text": "FileName"
        },
        {
            "type": "field_input",
            "name": "PragmaSolidity",
            "text": "PragmaSolidity"
        },
        {
            "type": "input_value",
            "name": "primitivetypes",
            "check": [
                "PrimitiveType"
            ]
        },
        {
            "type": "input_value",
            "name": "gvariables",
            "check": [
                "GVariable"
            ]
        },
        {
            "type": "input_value",
            "name": "events",
            "check": [
                "Event"
            ]
        },
        {
            "type": "input_value",
            "name": "assets",
            "check": [
                "Asset"
            ]
        },
        {
            "type": "input_value",
            "name": "users",
            "check": [
                "User"
            ]
        },
        {
            "type": "input_value",
            "name": "mappings",
            "check": [
                "Mapping"
            ]
        },
        {
            "type": "input_value",
            "name": "structs",
            "check": [
                "Struct"
            ]
        },
        {
            "type": "input_value",
            "name": "localfunctions",
            "check": [
                "LocalFunction"
            ]
        },
        {
            "type": "input_value",
            "name": "globalfunctions",
            "check": [
                "GlobalFunction"
            ]
        },
        {
            "type": "input_value",
            "name": "localtypes",
            "check": [
                "Type"
            ]
        },
        {
            "type": "input_value",
            "name": "constructors",
            "check": [
                "Constructor"
            ]
        }
    ],
    "colour": 3,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "PrimitiveType",
    "message0": "PrimitiveType Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "PType",
            "text": "PType"
        }
    ],
    "colour": 237
},
    {
    "type": "GVariable",
    "message0": "GVariable Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "VisGV",
            "text": "VisGV"
        }
    ],
    "colour": 218,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "EventMember",
    "message0": "EventMember Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "TypeE",
            "text": "TypeE"
        }
    ],
    "colour": 196,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Asset",
    "message0": "Asset Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "NameA",
            "text": "NameA"
        }
    ],
    "colour": 322
},
    {
    "type": "User",
    "message0": "User Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "NameU",
            "text": "NameU"
        },
        {
            "type": "field_input",
            "name": "TUser",
            "text": "TUser"
        }
    ],
    "colour": 146
},
    {
    "type": "Mapping",
    "message0": "Mapping Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "NameM",
            "text": "NameM"
        },
        {
            "type": "field_input",
            "name": "A1",
            "text": "A1"
        },
        {
            "type": "field_input",
            "name": "A2",
            "text": "A2"
        },
        {
            "type": "field_input",
            "name": "VisM",
            "text": "VisM"
        }
    ],
    "colour": 98
},
    {
    "type": "StructMember",
    "message0": "StructMember Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "TypeSM",
            "text": "TypeSM"
        },
        {
            "type": "field_input",
            "name": "VisSM",
            "text": "VisSM"
        }
    ],
    "colour": 243,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "FunctionParameter",
    "message0": "FunctionParameter Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "NameFP",
            "text": "NameFP"
        },
        {
            "type": "field_input",
            "name": "PType",
            "text": "PType"
        },
        {
            "type": "field_input",
            "name": "VisFP",
            "text": "VisFP"
        }
    ],
    "colour": 271,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Return",
    "message0": "Return Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "NameR",
            "text": "NameR"
        }
    ],
    "colour": 165,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Function",
    "message0": "Function Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "Instructions",
            "text": "Instructions"
        },
        {
            "type": "field_input",
            "name": "NameF",
            "text": "NameF"
        },
        {
            "type": "field_input",
            "name": "TypeFunction",
            "text": "TypeFunction"
        },
        {
            "type": "input_value",
            "name": "functionparameters",
            "check": [
                "FunctionParameter"
            ]
        },
        {
            "type": "input_value",
            "name": "returns",
            "check": [
                "Return"
            ]
        }
    ],
    "colour": 68,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Struct",
    "message0": "Struct Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "NameS",
            "text": "NameS"
        },
        {
            "type": "input_value",
            "name": "instancestructs",
            "check": [
                "InstanceStruct"
            ]
        },
        {
            "type": "input_value",
            "name": "structmembers",
            "check": [
                "StructMember"
            ]
        }
    ],
    "colour": 299,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "InstanceStruct",
    "message0": "InstanceStruct Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "VisIS",
            "text": "VisIS"
        },
        {
            "type": "field_input",
            "name": "NameIS",
            "text": "NameIS"
        }
    ],
    "colour": 268
},
    {
    "type": "LocalFunction",
    "message0": "LocalFunction Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "VisLF",
            "text": "VisLF"
        }
    ],
    "colour": 235
},
    {
    "type": "GlobalFunction",
    "message0": "GlobalFunction Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "VisGF",
            "text": "VisGF"
        }
    ],
    "colour": 349
},
    {
    "type": "Event",
    "message0": "Event Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "NameE",
            "text": "NameE"
        },
        {
            "type": "input_value",
            "name": "eventmembers",
            "check": [
                "EventMember"
            ]
        }
    ],
    "colour": 350,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Type",
    "message0": "Type Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "NamePPal",
            "text": "NamePPal"
        }
    ],
    "colour": 52
},
    {
    "type": "Repository",
    "message0": "Repository Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "NameR",
            "text": "NameR"
        },
        {
            "type": "input_value",
            "name": "smartcontracts",
            "check": [
                "SmartContract"
            ]
        },
        {
            "type": "input_value",
            "name": "globaltypes",
            "check": [
                "Type"
            ]
        }
    ],
    "colour": 306,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Constructor",
    "message0": "Constructor Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "Content",
            "text": "Content"
        },
        {
            "type": "input_value",
            "name": "constructorps",
            "check": [
                "ConstructorP"
            ]
        }
    ],
    "colour": 29,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "ConstructorP",
    "message0": "ConstructorP Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "NameC",
            "text": "NameC"
        }
    ],
    "colour": 193,
    "previousStatement": null,
    "nextStatement": null
},
];

export const ECORE_TOOLBOX = {
    kind: "flyoutToolbox",
    contents: [
        {"kind": "block", "type": "SmartContract"},
        {"kind": "block", "type": "PrimitiveType"},
        {"kind": "block", "type": "GVariable"},
        {"kind": "block", "type": "EventMember"},
        {"kind": "block", "type": "Asset"},
        {"kind": "block", "type": "User"},
        {"kind": "block", "type": "Mapping"},
        {"kind": "block", "type": "StructMember"},
        {"kind": "block", "type": "FunctionParameter"},
        {"kind": "block", "type": "Return"},
        {"kind": "block", "type": "Function"},
        {"kind": "block", "type": "Struct"},
        {"kind": "block", "type": "InstanceStruct"},
        {"kind": "block", "type": "LocalFunction"},
        {"kind": "block", "type": "GlobalFunction"},
        {"kind": "block", "type": "Event"},
        {"kind": "block", "type": "Type"},
        {"kind": "block", "type": "Repository"},
        {"kind": "block", "type": "Constructor"},
        {"kind": "block", "type": "ConstructorP"},
    ],
};
