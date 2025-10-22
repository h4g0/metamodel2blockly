// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Diagram",
  "message0": "Diagram classes %1 associations %2 types %3 generalizations %4",
  "args0": [
    {
      "type": "input_statement",
      "name": "CLASSES",
      "check": [
        "Class"
      ]
    },
    {
      "type": "input_statement",
      "name": "ASSOCIATIONS",
      "check": [
        "Association"
      ]
    },
    {
      "type": "input_statement",
      "name": "TYPES",
      "check": [
        "PrimitiveDataType"
      ]
    },
    {
      "type": "input_statement",
      "name": "GENERALIZATIONS",
      "check": [
        "Generalization"
      ]
    }
  ],
  "colour": 356,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Association",
  "message0": "Association name %1 sourceMultiplicity %2 targetMultiplicity %3 source %4 target %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "sourceMultiplicity",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "targetMultiplicity",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "Class"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGET",
      "check": [
        "Class"
      ]
    }
  ],
  "colour": 139,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Class",
  "message0": "Class name %1 is_persistent %2 attribute %3 method %4",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "is_persistent",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ATTRIBUTE",
      "check": [
        "Attribute"
      ]
    },
    {
      "type": "input_statement",
      "name": "METHOD",
      "check": [
        "Method"
      ]
    }
  ],
  "colour": 211,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Aggregation",
  "message0": "Aggregation",
  "args0": [],
  "colour": 260,
  "output": "Aggregation"
},
  {
  "type": "Composition",
  "message0": "Composition",
  "args0": [],
  "colour": 248,
  "output": "Composition"
},
  {
  "type": "Dependency",
  "message0": "Dependency",
  "args0": [],
  "colour": 85,
  "output": "Dependency"
},
  {
  "type": "Generalization",
  "message0": "Generalization source %1 target %2",
  "args0": [
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "Class"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGET",
      "check": [
        "Class"
      ]
    }
  ],
  "colour": 286,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Interface",
  "message0": "Interface name %1 attribute %2 method %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ATTRIBUTE",
      "check": [
        "Attribute"
      ]
    },
    {
      "type": "input_statement",
      "name": "METHOD",
      "check": [
        "Method"
      ]
    }
  ],
  "colour": 198,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "InterfaceRealization",
  "message0": "InterfaceRealization source %1 target %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "SOURCE",
      "check": [
        "Interface"
      ]
    },
    {
      "type": "input_statement",
      "name": "TARGET",
      "check": [
        "Class"
      ]
    }
  ],
  "colour": 56,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Realization",
  "message0": "Realization source %1 target %2",
  "args0": [
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "Class"
      ]
    },
    {
      "type": "input_statement",
      "name": "TARGET",
      "check": [
        "Class"
      ]
    }
  ],
  "colour": 217,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Attribute",
  "message0": "Attribute name %1 is_primary %2 type %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "is_primary",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "AttributeValue"
      ]
    }
  ],
  "colour": 96,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "PrimitiveDataType",
  "message0": "PrimitiveDataType name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 235,
  "output": "PrimitiveDataType"
},
  {
  "type": "AttributeValue",
  "message0": "AttributeValue",
  "args0": [],
  "colour": 51,
  "output": "AttributeValue"
},
  {
  "type": "Method",
  "message0": "Method name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 198,
  "output": "Method"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Diagram"},
    {kind: "block" as const, type: "Association"},
    {kind: "block" as const, type: "Class"},
    {kind: "block" as const, type: "Aggregation"},
    {kind: "block" as const, type: "Composition"},
    {kind: "block" as const, type: "Dependency"},
    {kind: "block" as const, type: "Generalization"},
    {kind: "block" as const, type: "Interface"},
    {kind: "block" as const, type: "InterfaceRealization"},
    {kind: "block" as const, type: "Realization"},
    {kind: "block" as const, type: "Attribute"},
    {kind: "block" as const, type: "PrimitiveDataType"},
    {kind: "block" as const, type: "AttributeValue"},
    {kind: "block" as const, type: "Method"},
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
