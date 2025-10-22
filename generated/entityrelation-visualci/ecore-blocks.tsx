// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "LogicalModel",
  "message0": "LogicalModel entities %1 relations %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "ENTITIES",
      "check": [
        "Entity"
      ]
    },
    {
      "type": "input_statement",
      "name": "RELATIONS",
      "check": [
        "Relation"
      ]
    }
  ],
  "colour": 350,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Entity",
  "message0": "Entity attributes %1 identifiers %2 primaryIdentifier %3",
  "args0": [
    {
      "type": "input_statement",
      "name": "ATTRIBUTES",
      "check": [
        "Attribute"
      ]
    },
    {
      "type": "input_statement",
      "name": "IDENTIFIERS",
      "check": [
        "Identifier"
      ]
    },
    {
      "type": "input_value",
      "name": "PRIMARYIDENTIFIER",
      "check": [
        "Identifier"
      ]
    }
  ],
  "colour": 270,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Relation",
  "message0": "Relation sourceRole %1 sourceCardinality %2 sourceIsComposite %3 targetRole %4 targetCardinality %5 targetIsComposite %6 elements %7 source %8 target %9 identifier %10",
  "args0": [
    {
      "type": "field_input",
      "name": "sourceRole",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "sourceCardinality",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "sourceIsComposite",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "targetRole",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "targetCardinality",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "targetIsComposite",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ELEMENTS",
      "check": [
        "RelationElement"
      ]
    },
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "Entity"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGET",
      "check": [
        "Entity"
      ]
    },
    {
      "type": "input_value",
      "name": "IDENTIFIER",
      "check": [
        "Identifier"
      ]
    }
  ],
  "colour": 103,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "RelationElement",
  "message0": "RelationElement sourceAttribute %1 targetAttribute %2",
  "args0": [
    {
      "type": "input_value",
      "name": "SOURCEATTRIBUTE",
      "check": [
        "Attribute"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGETATTRIBUTE",
      "check": [
        "Attribute"
      ]
    }
  ],
  "colour": 350,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Attribute",
  "message0": "Attribute required %1 inPrimaryIdentifier %2 type %3 owner %4 usedInIdentifier %5",
  "args0": [
    {
      "type": "field_input",
      "name": "required",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "inPrimaryIdentifier",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "Type"
      ]
    },
    {
      "type": "input_value",
      "name": "OWNER",
      "check": [
        "Entity"
      ]
    },
    {
      "type": "input_value",
      "name": "USEDINIDENTIFIER",
      "check": [
        "Identifier"
      ]
    }
  ],
  "colour": 96,
  "previousStatement": null,
  "nextStatement": null
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
  "type": "LogicalElement",
  "message0": "LogicalElement ID %1 comments %2",
  "args0": [
    {
      "type": "field_input",
      "name": "ID",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "comments",
      "text": ""
    }
  ],
  "colour": 41,
  "output": "LogicalElement"
},
  {
  "type": "Identifier",
  "message0": "Identifier attributes %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "ATTRIBUTES",
      "check": [
        "Attribute"
      ]
    }
  ],
  "colour": 290,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "LogicalModel"},
    {kind: "block" as const, type: "Entity"},
    {kind: "block" as const, type: "Relation"},
    {kind: "block" as const, type: "RelationElement"},
    {kind: "block" as const, type: "Attribute"},
    {kind: "block" as const, type: "NamedElement"},
    {kind: "block" as const, type: "LogicalElement"},
    {kind: "block" as const, type: "Identifier"},
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
