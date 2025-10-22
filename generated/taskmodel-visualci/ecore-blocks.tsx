// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "ItemElement",
  "message0": "ItemElement name %1 description %2 visible %3 itemState %4 subDiagram %5 parent %6 references %7",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "description",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "visible",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "itemState",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "SUBDIAGRAM",
      "check": [
        "SubDiagram"
      ]
    },
    {
      "type": "input_value",
      "name": "PARENT",
      "check": [
        "ItemElement"
      ]
    },
    {
      "type": "input_statement",
      "name": "REFERENCES",
      "check": [
        "ReferElement"
      ]
    }
  ],
  "colour": 174,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "ShapeElement",
  "message0": "ShapeElement x %1 y %2 width %3 height %4 collapsed %5 x2 %6 y2 %7 width2 %8 height2 %9",
  "args0": [
    {
      "type": "field_input",
      "name": "x",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "y",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "width",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "height",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "collapsed",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "x2",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "y2",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "width2",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "height2",
      "text": ""
    }
  ],
  "colour": 57,
  "output": "ShapeElement"
},
  {
  "type": "LinkedElement",
  "message0": "LinkedElement sourceConnections %1 targetConnections %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "SOURCECONNECTIONS",
      "check": [
        "ConnectionElement"
      ]
    },
    {
      "type": "input_statement",
      "name": "TARGETCONNECTIONS",
      "check": [
        "ConnectionElement"
      ]
    }
  ],
  "colour": 267,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "LineElement",
  "message0": "LineElement lineStyle %1 sourceEndPoint %2 targetEndPoint %3 bendPoints %4",
  "args0": [
    {
      "type": "field_input",
      "name": "lineStyle",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "sourceEndPoint",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "targetEndPoint",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "bendPoints",
      "text": ""
    }
  ],
  "colour": 356,
  "output": "LineElement"
},
  {
  "type": "ConnectionElement",
  "message0": "ConnectionElement relationship %1 condition %2 source %3 target %4 source2 %5 target2 %6",
  "args0": [
    {
      "type": "field_input",
      "name": "relationship",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "condition",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "LinkedElement"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGET",
      "check": [
        "LinkedElement"
      ]
    },
    {
      "type": "input_value",
      "name": "SOURCE2",
      "check": [
        "LinkedElement"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGET2",
      "check": [
        "LinkedElement"
      ]
    }
  ],
  "colour": 126,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "WorkerElement",
  "message0": "WorkerElement items %1 initialize %2 finalize %3 run %4 initialTask %5",
  "args0": [
    {
      "type": "input_statement",
      "name": "ITEMS",
      "check": [
        "ItemElement"
      ]
    },
    {
      "type": "input_value",
      "name": "INITIALIZE",
      "check": [
        "StructBlockElement"
      ]
    },
    {
      "type": "input_value",
      "name": "FINALIZE",
      "check": [
        "StructBlockElement"
      ]
    },
    {
      "type": "input_value",
      "name": "RUN",
      "check": [
        "StructBlockElement"
      ]
    },
    {
      "type": "input_value",
      "name": "INITIALTASK",
      "check": [
        "ItemElement"
      ]
    }
  ],
  "colour": 50,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "BlockElement",
  "message0": "BlockElement statements %1",
  "args0": [
    {
      "type": "field_input",
      "name": "statements",
      "text": ""
    }
  ],
  "colour": 157,
  "output": "BlockElement"
},
  {
  "type": "TaskElement",
  "message0": "TaskElement params %1 states %2 construct %3 destruct %4 bifurcates %5 initialState %6",
  "args0": [
    {
      "type": "input_statement",
      "name": "PARAMS",
      "check": [
        "Parameter"
      ]
    },
    {
      "type": "input_statement",
      "name": "STATES",
      "check": [
        "StateElement"
      ]
    },
    {
      "type": "input_value",
      "name": "CONSTRUCT",
      "check": [
        "StructBlockElement"
      ]
    },
    {
      "type": "input_value",
      "name": "DESTRUCT",
      "check": [
        "StructBlockElement"
      ]
    },
    {
      "type": "input_statement",
      "name": "BIFURCATES",
      "check": [
        "ExpandTransElement"
      ]
    },
    {
      "type": "input_value",
      "name": "INITIALSTATE",
      "check": [
        "StateElement"
      ]
    }
  ],
  "colour": 146,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "StateElement",
  "message0": "StateElement attribute %1 entry %2 stay %3 exit %4 bifurcates %5",
  "args0": [
    {
      "type": "field_input",
      "name": "attribute",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "ENTRY",
      "check": [
        "StateAction"
      ]
    },
    {
      "type": "input_value",
      "name": "STAY",
      "check": [
        "StateAction"
      ]
    },
    {
      "type": "input_value",
      "name": "EXIT",
      "check": [
        "StateAction"
      ]
    },
    {
      "type": "input_statement",
      "name": "BIFURCATES",
      "check": [
        "ExpandTransElement"
      ]
    }
  ],
  "colour": 121,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "ActionElement",
  "message0": "ActionElement params %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "PARAMS",
      "check": [
        "Parameter"
      ]
    }
  ],
  "colour": 88,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "StateAction",
  "message0": "StateAction stateActionType %1",
  "args0": [
    {
      "type": "field_input",
      "name": "stateActionType",
      "text": ""
    }
  ],
  "colour": 51,
  "output": "StateAction"
},
  {
  "type": "Symbol",
  "message0": "Symbol direction %1 type %2 value %3",
  "args0": [
    {
      "type": "field_input",
      "name": "direction",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "type",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "value",
      "text": ""
    }
  ],
  "colour": 23,
  "output": "Symbol"
},
  {
  "type": "Constant",
  "message0": "Constant type %1 initValue %2",
  "args0": [
    {
      "type": "field_input",
      "name": "type",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "initValue",
      "text": ""
    }
  ],
  "colour": 238,
  "output": "Constant"
},
  {
  "type": "Function",
  "message0": "Function type %1 params %2",
  "args0": [
    {
      "type": "field_input",
      "name": "type",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "PARAMS",
      "check": [
        "Parameter"
      ]
    }
  ],
  "colour": 235,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "ModelElement",
  "message0": "ModelElement symbols %1 constants %2 functions %3 models %4",
  "args0": [
    {
      "type": "input_statement",
      "name": "SYMBOLS",
      "check": [
        "Symbol"
      ]
    },
    {
      "type": "input_statement",
      "name": "CONSTANTS",
      "check": [
        "Constant"
      ]
    },
    {
      "type": "input_statement",
      "name": "FUNCTIONS",
      "check": [
        "Function"
      ]
    },
    {
      "type": "input_statement",
      "name": "MODELS",
      "check": [
        "ModelElement"
      ]
    }
  ],
  "colour": 97,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "ModelDiagram",
  "message0": "ModelDiagram script %1 items %2 includeItems %3",
  "args0": [
    {
      "type": "field_input",
      "name": "script",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ITEMS",
      "check": [
        "ItemElement"
      ]
    },
    {
      "type": "input_statement",
      "name": "INCLUDEITEMS",
      "check": [
        "IncludedElement"
      ]
    }
  ],
  "colour": 304,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "IncludedElement",
  "message0": "IncludedElement includePath %1 items %2",
  "args0": [
    {
      "type": "field_input",
      "name": "includePath",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ITEMS",
      "check": [
        "ItemElement"
      ]
    }
  ],
  "colour": 295,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Parameter",
  "message0": "Parameter type %1 value %2",
  "args0": [
    {
      "type": "field_input",
      "name": "type",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "value",
      "text": ""
    }
  ],
  "colour": 3,
  "output": "Parameter"
},
  {
  "type": "EnumElement",
  "message0": "EnumElement enumItem %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "ENUMITEM",
      "check": [
        "EnumItemElement"
      ]
    }
  ],
  "colour": 249,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "EnumItemElement",
  "message0": "EnumItemElement value %1",
  "args0": [
    {
      "type": "field_input",
      "name": "value",
      "text": ""
    }
  ],
  "colour": 51,
  "output": "EnumItemElement"
},
  {
  "type": "ReferElement",
  "message0": "ReferElement attribute %1 path %2 items %3 realModel %4",
  "args0": [
    {
      "type": "field_input",
      "name": "attribute",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "path",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ITEMS",
      "check": [
        "ItemElement"
      ]
    },
    {
      "type": "input_value",
      "name": "REALMODEL",
      "check": [
        "ItemElement"
      ]
    }
  ],
  "colour": 28,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "SubDiagram",
  "message0": "SubDiagram items %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "ITEMS",
      "check": [
        "ReferElement"
      ]
    }
  ],
  "colour": 75,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "ConnectorElement",
  "message0": "ConnectorElement joinType %1 conType %2 params %3 withs %4 construct %5 destruct %6 exercise %7",
  "args0": [
    {
      "type": "field_input",
      "name": "joinType",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "conType",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "PARAMS",
      "check": [
        "Parameter"
      ]
    },
    {
      "type": "input_statement",
      "name": "WITHS",
      "check": [
        "WithElement"
      ]
    },
    {
      "type": "input_value",
      "name": "CONSTRUCT",
      "check": [
        "StructBlockElement"
      ]
    },
    {
      "type": "input_value",
      "name": "DESTRUCT",
      "check": [
        "StructBlockElement"
      ]
    },
    {
      "type": "input_value",
      "name": "EXERCISE",
      "check": [
        "StructBlockElement"
      ]
    }
  ],
  "colour": 124,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "WithElement",
  "message0": "WithElement cycle %1",
  "args0": [
    {
      "type": "field_input",
      "name": "cycle",
      "text": ""
    }
  ],
  "colour": 309,
  "output": "WithElement"
},
  {
  "type": "StructBlockElement",
  "message0": "StructBlockElement structType %1",
  "args0": [
    {
      "type": "field_input",
      "name": "structType",
      "text": ""
    }
  ],
  "colour": 68,
  "output": "StructBlockElement"
},
  {
  "type": "ExpandTransElement",
  "message0": "ExpandTransElement source %1 expand %2 trans %3",
  "args0": [
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "LinkedElement"
      ]
    },
    {
      "type": "input_value",
      "name": "EXPAND",
      "check": [
        "LinkedElement"
      ]
    },
    {
      "type": "input_value",
      "name": "TRANS",
      "check": [
        "LinkedElement"
      ]
    }
  ],
  "colour": 197,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "ItemElement"},
    {kind: "block" as const, type: "ShapeElement"},
    {kind: "block" as const, type: "LinkedElement"},
    {kind: "block" as const, type: "LineElement"},
    {kind: "block" as const, type: "ConnectionElement"},
    {kind: "block" as const, type: "WorkerElement"},
    {kind: "block" as const, type: "BlockElement"},
    {kind: "block" as const, type: "TaskElement"},
    {kind: "block" as const, type: "StateElement"},
    {kind: "block" as const, type: "ActionElement"},
    {kind: "block" as const, type: "StateAction"},
    {kind: "block" as const, type: "Symbol"},
    {kind: "block" as const, type: "Constant"},
    {kind: "block" as const, type: "Function"},
    {kind: "block" as const, type: "ModelElement"},
    {kind: "block" as const, type: "ModelDiagram"},
    {kind: "block" as const, type: "IncludedElement"},
    {kind: "block" as const, type: "Parameter"},
    {kind: "block" as const, type: "EnumElement"},
    {kind: "block" as const, type: "EnumItemElement"},
    {kind: "block" as const, type: "ReferElement"},
    {kind: "block" as const, type: "SubDiagram"},
    {kind: "block" as const, type: "ConnectorElement"},
    {kind: "block" as const, type: "WithElement"},
    {kind: "block" as const, type: "StructBlockElement"},
    {kind: "block" as const, type: "ExpandTransElement"},
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
