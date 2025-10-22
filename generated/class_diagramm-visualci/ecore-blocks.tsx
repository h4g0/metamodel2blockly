// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Package",
  "message0": "Package name %1 associations %2 classes %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ASSOCIATIONS",
      "check": [
        "RefAssociation"
      ]
    },
    {
      "type": "input_statement",
      "name": "CLASSES",
      "check": [
        "RefClass"
      ]
    }
  ],
  "colour": 273,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "DataType",
  "message0": "DataType name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 142,
  "output": "DataType"
},
  {
  "type": "Method",
  "message0": "Method name %1 modifier %2 parameters %3 primitive_return %4 return %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "modifier",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "PARAMETERS",
      "check": [
        "RefParameter"
      ]
    },
    {
      "type": "input_value",
      "name": "PRIMITIVE_RETURN",
      "check": [
        "RefDataType"
      ]
    },
    {
      "type": "input_value",
      "name": "RETURN",
      "check": [
        "RefClass"
      ]
    }
  ],
  "colour": 198,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Attribute",
  "message0": "Attribute name %1 modifier %2 primitive_type %3 type %4",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "modifier",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "PRIMITIVE_TYPE",
      "check": [
        "RefDataType"
      ]
    },
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "RefClass"
      ]
    }
  ],
  "colour": 96,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Parameter",
  "message0": "Parameter name %1 primitive_type %2 type %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "PRIMITIVE_TYPE",
      "check": [
        "RefDataType"
      ]
    },
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "RefClass"
      ]
    }
  ],
  "colour": 3,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Class",
  "message0": "Class modifier %1 name %2 attributes %3 methods %4 parent %5",
  "args0": [
    {
      "type": "field_input",
      "name": "modifier",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ATTRIBUTES",
      "check": [
        "RefAttribute"
      ]
    },
    {
      "type": "input_statement",
      "name": "METHODS",
      "check": [
        "RefMethod"
      ]
    },
    {
      "type": "input_value",
      "name": "PARENT",
      "check": [
        "RefClass"
      ]
    }
  ],
  "colour": 211,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Association",
  "message0": "Association minCardinality %1 maxCardinality %2 name %3 isAggregation %4 source %5 target %6",
  "args0": [
    {
      "type": "field_input",
      "name": "minCardinality",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "maxCardinality",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "isAggregation",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "RefClass"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGET",
      "check": [
        "RefClass"
      ]
    }
  ],
  "colour": 139,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "RefAttribute",
  "message0": "RefAttribute",
  "args0": [],
  "colour": 103,
  "output": "RefAttribute"
},
  {
  "type": "RefAssociation",
  "message0": "RefAssociation",
  "args0": [],
  "colour": 325,
  "output": "RefAssociation"
},
  {
  "type": "RefMethod",
  "message0": "RefMethod",
  "args0": [],
  "colour": 99,
  "output": "RefMethod"
},
  {
  "type": "RefParameter",
  "message0": "RefParameter",
  "args0": [],
  "colour": 204,
  "output": "RefParameter"
},
  {
  "type": "RefPackage",
  "message0": "RefPackage",
  "args0": [],
  "colour": 115,
  "output": "RefPackage"
},
  {
  "type": "RefDataType",
  "message0": "RefDataType",
  "args0": [],
  "colour": 244,
  "output": "RefDataType"
},
  {
  "type": "RefClass",
  "message0": "RefClass",
  "args0": [],
  "colour": 241,
  "output": "RefClass"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Package"},
    {kind: "block" as const, type: "DataType"},
    {kind: "block" as const, type: "Method"},
    {kind: "block" as const, type: "Attribute"},
    {kind: "block" as const, type: "Parameter"},
    {kind: "block" as const, type: "Class"},
    {kind: "block" as const, type: "Association"},
    {kind: "block" as const, type: "RefAttribute"},
    {kind: "block" as const, type: "RefAssociation"},
    {kind: "block" as const, type: "RefMethod"},
    {kind: "block" as const, type: "RefParameter"},
    {kind: "block" as const, type: "RefPackage"},
    {kind: "block" as const, type: "RefDataType"},
    {kind: "block" as const, type: "RefClass"},
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
