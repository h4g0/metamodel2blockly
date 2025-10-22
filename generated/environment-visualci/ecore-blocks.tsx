// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Environment",
  "message0": "Environment name %1 actions %2 links %3 priorityDefinitions %4 typesDefinition %5",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ACTIONS",
      "check": [
        "Action"
      ]
    },
    {
      "type": "input_statement",
      "name": "LINKS",
      "check": [
        "InterDSMLink"
      ]
    },
    {
      "type": "input_value",
      "name": "PRIORITYDEFINITIONS",
      "check": [
        "PriorityDefinition"
      ]
    },
    {
      "type": "input_value",
      "name": "TYPESDEFINITION",
      "check": [
        "TypesDefinition"
      ]
    }
  ],
  "colour": 29,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Type",
  "message0": "Type name %1 typeDefinition %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TYPEDEFINITION",
      "check": [
        "TypesDefinition"
      ]
    }
  ],
  "colour": 191,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "PrimitiveType",
  "message0": "PrimitiveType",
  "args0": [],
  "colour": 188,
  "output": "PrimitiveType"
},
  {
  "type": "Enumeration",
  "message0": "Enumeration fields %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "FIELDS",
      "check": [
        "Field"
      ]
    }
  ],
  "colour": 68,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Field",
  "message0": "Field name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 44,
  "output": "Field"
},
  {
  "type": "Action",
  "message0": "Action name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 116,
  "output": "Action"
},
  {
  "type": "InterDSMLink",
  "message0": "InterDSMLink name %1 target %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TARGET",
      "check": [
        "EObject"
      ]
    }
  ],
  "colour": 172,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "ObeoDSMObject",
  "message0": "ObeoDSMObject description %1 keywords %2 version %3 createdOn %4 modifiedOn %5 metadatas %6 behaviours %7 bindingRegistries %8",
  "args0": [
    {
      "type": "field_input",
      "name": "description",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "keywords",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "version",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "createdOn",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "modifiedOn",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "METADATAS",
      "check": [
        "MetaDataContainer"
      ]
    },
    {
      "type": "input_statement",
      "name": "BEHAVIOURS",
      "check": [
        "Behaviour"
      ]
    },
    {
      "type": "input_statement",
      "name": "BINDINGREGISTRIES",
      "check": [
        "BindingRegistry"
      ]
    }
  ],
  "colour": 178,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "MetaDataContainer",
  "message0": "MetaDataContainer metadatas %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "METADATAS",
      "check": [
        "MetaData"
      ]
    }
  ],
  "colour": 265,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Annotation",
  "message0": "Annotation title %1 body %2",
  "args0": [
    {
      "type": "field_input",
      "name": "title",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "body",
      "text": ""
    }
  ],
  "colour": 82,
  "output": "Annotation"
},
  {
  "type": "PriorityDefinition",
  "message0": "PriorityDefinition priorities %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "PRIORITIES",
      "check": [
        "Priority"
      ]
    }
  ],
  "colour": 75,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Priority",
  "message0": "Priority name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 81,
  "output": "Priority"
},
  {
  "type": "MetaData",
  "message0": "MetaData",
  "args0": [],
  "colour": 100,
  "output": "MetaData"
},
  {
  "type": "TypesDefinition",
  "message0": "TypesDefinition types %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "TYPES",
      "check": [
        "Type"
      ]
    }
  ],
  "colour": 67,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Behaviour",
  "message0": "Behaviour",
  "args0": [],
  "colour": 189,
  "output": "Behaviour"
},
  {
  "type": "StructuredType",
  "message0": "StructuredType",
  "args0": [],
  "colour": 298,
  "output": "StructuredType"
},
  {
  "type": "DTO",
  "message0": "DTO ownedContainer %1 ownedReferences %2 ownedAttributes %3 associatedTypes %4 properties %5 references %6 attributes %7 supertype %8",
  "args0": [
    {
      "type": "input_value",
      "name": "OWNEDCONTAINER",
      "check": [
        "FilterContainer"
      ]
    },
    {
      "type": "input_statement",
      "name": "OWNEDREFERENCES",
      "check": [
        "Reference"
      ]
    },
    {
      "type": "input_statement",
      "name": "OWNEDATTRIBUTES",
      "check": [
        "Attribute"
      ]
    },
    {
      "type": "input_statement",
      "name": "ASSOCIATEDTYPES",
      "check": [
        "StructuredType"
      ]
    },
    {
      "type": "input_statement",
      "name": "PROPERTIES",
      "check": [
        "Property"
      ]
    },
    {
      "type": "input_statement",
      "name": "REFERENCES",
      "check": [
        "Reference"
      ]
    },
    {
      "type": "input_statement",
      "name": "ATTRIBUTES",
      "check": [
        "Attribute"
      ]
    },
    {
      "type": "input_value",
      "name": "SUPERTYPE",
      "check": [
        "DTO"
      ]
    }
  ],
  "colour": 39,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "FilterContainer",
  "message0": "FilterContainer ownedFilters %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "OWNEDFILTERS",
      "check": [
        "Filter"
      ]
    }
  ],
  "colour": 150,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Filter",
  "message0": "Filter",
  "args0": [],
  "colour": 27,
  "output": "Filter"
},
  {
  "type": "Namespace",
  "message0": "Namespace name %1 ownedNamespaces %2 owner %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "OWNEDNAMESPACES",
      "check": [
        "Namespace"
      ]
    },
    {
      "type": "input_value",
      "name": "OWNER",
      "check": [
        "Namespace"
      ]
    }
  ],
  "colour": 341,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Attribute",
  "message0": "Attribute type %1 dto %2",
  "args0": [
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "PrimitiveType"
      ]
    },
    {
      "type": "input_value",
      "name": "DTO",
      "check": [
        "DTO"
      ]
    }
  ],
  "colour": 96,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Reference",
  "message0": "Reference isComposite %1 navigable %2 oppositeOf %3 type %4 dto %5",
  "args0": [
    {
      "type": "field_input",
      "name": "isComposite",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "navigable",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "OPPOSITEOF",
      "check": [
        "Reference"
      ]
    },
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "DTO"
      ]
    },
    {
      "type": "input_value",
      "name": "DTO",
      "check": [
        "DTO"
      ]
    }
  ],
  "colour": 40,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Property",
  "message0": "Property name %1 multiplicity %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "multiplicity",
      "text": ""
    }
  ],
  "colour": 328,
  "output": "Property"
},
  {
  "type": "BindingInfo",
  "message0": "BindingInfo references %1 elements %2 left %3 right %4 subBindingInfos %5 targets %6",
  "args0": [
    {
      "type": "input_statement",
      "name": "REFERENCES",
      "check": [
        "BindingReference"
      ]
    },
    {
      "type": "input_statement",
      "name": "ELEMENTS",
      "check": [
        "BindingElement"
      ]
    },
    {
      "type": "input_value",
      "name": "LEFT",
      "check": [
        "BoundableElement"
      ]
    },
    {
      "type": "input_value",
      "name": "RIGHT",
      "check": [
        "BoundableElement"
      ]
    },
    {
      "type": "input_statement",
      "name": "SUBBINDINGINFOS",
      "check": [
        "BindingInfo"
      ]
    },
    {
      "type": "input_statement",
      "name": "TARGETS",
      "check": [
        "BoundableElement"
      ]
    }
  ],
  "colour": 187,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "BindingReference",
  "message0": "BindingReference left %1 right %2",
  "args0": [
    {
      "type": "input_value",
      "name": "LEFT",
      "check": [
        "BindingElement"
      ]
    },
    {
      "type": "input_value",
      "name": "RIGHT",
      "check": [
        "BindingElement"
      ]
    }
  ],
  "colour": 89,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "BindingElement",
  "message0": "BindingElement bindingExpression %1 boundElement %2 referencedByAsLeft %3 referencedByAsRight %4 referencedBy %5 pathReferences %6",
  "args0": [
    {
      "type": "field_input",
      "name": "bindingExpression",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "BOUNDELEMENT",
      "check": [
        "BoundableElement"
      ]
    },
    {
      "type": "input_statement",
      "name": "REFERENCEDBYASLEFT",
      "check": [
        "BindingReference"
      ]
    },
    {
      "type": "input_statement",
      "name": "REFERENCEDBYASRIGHT",
      "check": [
        "BindingReference"
      ]
    },
    {
      "type": "input_statement",
      "name": "REFERENCEDBY",
      "check": [
        "BindingReference"
      ]
    },
    {
      "type": "input_statement",
      "name": "PATHREFERENCES",
      "check": [
        "BoundableElement"
      ]
    }
  ],
  "colour": 300,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "BindingRegistry",
  "message0": "BindingRegistry bindingInfos %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "BINDINGINFOS",
      "check": [
        "BindingInfo"
      ]
    }
  ],
  "colour": 5,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "BoundableElement",
  "message0": "BoundableElement",
  "args0": [],
  "colour": 274,
  "output": "BoundableElement"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Environment"},
    {kind: "block" as const, type: "Type"},
    {kind: "block" as const, type: "PrimitiveType"},
    {kind: "block" as const, type: "Enumeration"},
    {kind: "block" as const, type: "Field"},
    {kind: "block" as const, type: "Action"},
    {kind: "block" as const, type: "InterDSMLink"},
    {kind: "block" as const, type: "ObeoDSMObject"},
    {kind: "block" as const, type: "MetaDataContainer"},
    {kind: "block" as const, type: "Annotation"},
    {kind: "block" as const, type: "PriorityDefinition"},
    {kind: "block" as const, type: "Priority"},
    {kind: "block" as const, type: "MetaData"},
    {kind: "block" as const, type: "TypesDefinition"},
    {kind: "block" as const, type: "Behaviour"},
    {kind: "block" as const, type: "StructuredType"},
    {kind: "block" as const, type: "DTO"},
    {kind: "block" as const, type: "FilterContainer"},
    {kind: "block" as const, type: "Filter"},
    {kind: "block" as const, type: "Namespace"},
    {kind: "block" as const, type: "Attribute"},
    {kind: "block" as const, type: "Reference"},
    {kind: "block" as const, type: "Property"},
    {kind: "block" as const, type: "BindingInfo"},
    {kind: "block" as const, type: "BindingReference"},
    {kind: "block" as const, type: "BindingElement"},
    {kind: "block" as const, type: "BindingRegistry"},
    {kind: "block" as const, type: "BoundableElement"},
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
