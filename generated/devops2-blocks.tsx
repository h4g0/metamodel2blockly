// Custom Ecore model blocks for Blockly
export const ECORE_BLOCKS = [
    {
    "type": "Pipeline",
    "message0": "Pipeline Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "Name",
            "text": "Name"
        },
        {
            "type": "field_input",
            "name": "Concurrent",
            "text": "Concurrent"
        },
        {
            "type": "input_value",
            "name": "when",
            "check": [
                "When"
            ]
        },
        {
            "type": "input_value",
            "name": "job",
            "check": [
                "Job"
            ]
        },
        {
            "type": "input_value",
            "name": "tool",
            "check": [
                "Tool"
            ]
        },
        {
            "type": "input_value",
            "name": "environment",
            "check": [
                "Environment"
            ]
        },
        {
            "type": "input_value",
            "name": "permission",
            "check": [
                "Permission"
            ]
        }
    ],
    "colour": 191,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Job",
    "message0": "Job Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "Name",
            "text": "Name"
        },
        {
            "type": "field_input",
            "name": "AllowFailure",
            "text": "AllowFailure"
        },
        {
            "type": "field_input",
            "name": "Description",
            "text": "Description"
        },
        {
            "type": "input_value",
            "name": "tool",
            "check": [
                "Tool"
            ]
        },
        {
            "type": "input_value",
            "name": "command",
            "check": [
                "Command"
            ]
        },
        {
            "type": "input_value",
            "name": "ifthenelse",
            "check": [
                "IfThenElse"
            ]
        },
        {
            "type": "input_value",
            "name": "input",
            "check": [
                "Artifact"
            ]
        },
        {
            "type": "input_value",
            "name": "environment",
            "check": [
                "Environment"
            ]
        },
        {
            "type": "input_value",
            "name": "permission",
            "check": [
                "Permission"
            ]
        }
    ],
    "colour": 304,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Command",
    "message0": "Command Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "Name",
            "text": "Name"
        },
        {
            "type": "input_value",
            "name": "tool",
            "check": [
                "Tool"
            ]
        },
        {
            "type": "input_value",
            "name": "parameter",
            "check": [
                "Parameter"
            ]
        }
    ],
    "colour": 72,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Environment",
    "message0": "Environment Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "Key",
            "text": "Key"
        },
        {
            "type": "field_input",
            "name": "Value",
            "text": "Value"
        }
    ],
    "colour": 227
},
    {
    "type": "When",
    "message0": "When Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "Name",
            "text": "Name"
        },
        {
            "type": "field_input",
            "name": "Trigger",
            "text": "Trigger"
        },
        {
            "type": "field_input",
            "name": "Timer",
            "text": "Timer"
        }
    ],
    "colour": 295
},
    {
    "type": "Artifact",
    "message0": "Artifact Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "Name",
            "text": "Name"
        }
    ],
    "colour": 94
},
    {
    "type": "Tool",
    "message0": "Tool Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "Name",
            "text": "Name"
        }
    ],
    "colour": 53
},
    {
    "type": "IfThenElse",
    "message0": "IfThenElse Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "Condition",
            "text": "Condition"
        },
        {
            "type": "input_value",
            "name": "true",
            "check": [
                "If"
            ]
        },
        {
            "type": "input_value",
            "name": "false",
            "check": [
                "Else"
            ]
        }
    ],
    "colour": 142,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Parameter",
    "message0": "Parameter Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "Parameter",
            "text": "Parameter"
        }
    ],
    "colour": 240
},
    {
    "type": "Permission",
    "message0": "Permission Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "Key",
            "text": "Key"
        },
        {
            "type": "field_input",
            "name": "Value",
            "text": "Value"
        }
    ],
    "colour": 269
},
    {
    "type": "If",
    "message0": "If Containments",
    "args0": [
        {
            "type": "input_value",
            "name": "command",
            "check": [
                "Command"
            ]
        },
        {
            "type": "input_value",
            "name": "ifthenelse",
            "check": [
                "IfThenElse"
            ]
        }
    ],
    "colour": 346,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Else",
    "message0": "Else Containments",
    "args0": [
        {
            "type": "input_value",
            "name": "command",
            "check": [
                "Command"
            ]
        },
        {
            "type": "input_value",
            "name": "ifthenelse",
            "check": [
                "IfThenElse"
            ]
        }
    ],
    "colour": 351,
    "previousStatement": null,
    "nextStatement": null
},
];

export const ECORE_TOOLBOX = {
    kind: "flyoutToolbox",
    contents: [
        {"kind": "block", "type": "Pipeline"},
        {"kind": "block", "type": "Job"},
        {"kind": "block", "type": "Command"},
        {"kind": "block", "type": "Environment"},
        {"kind": "block", "type": "When"},
        {"kind": "block", "type": "Artifact"},
        {"kind": "block", "type": "Tool"},
        {"kind": "block", "type": "IfThenElse"},
        {"kind": "block", "type": "Parameter"},
        {"kind": "block", "type": "Permission"},
        {"kind": "block", "type": "If"},
        {"kind": "block", "type": "Else"},
    ],
};
