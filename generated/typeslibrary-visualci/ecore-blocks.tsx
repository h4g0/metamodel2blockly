// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "NativeTypesLibrary",
  "message0": "NativeTypesLibrary name %1 nativeTypes %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "NATIVETYPES",
      "check": [
        "NativeType"
      ]
    }
  ],
  "colour": 166,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "TypeInstance",
  "message0": "TypeInstance length %1 precision %2 literals %3 nativeType %4",
  "args0": [
    {
      "type": "field_input",
      "name": "length",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "precision",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "literals",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "NATIVETYPE",
      "check": [
        "NativeType"
      ]
    }
  ],
  "colour": 232,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "NativeType",
  "message0": "NativeType name %1 spec %2 mapsTo %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "spec",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "MAPSTO",
      "check": [
        "NativeType"
      ]
    }
  ],
  "colour": 52,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "ComplexNamedType",
  "message0": "ComplexNamedType types %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "TYPES",
      "check": [
        "UserDefinedType"
      ]
    }
  ],
  "colour": 272,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "SimpleNamedType",
  "message0": "SimpleNamedType type %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "TypeInstance"
      ]
    }
  ],
  "colour": 96,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Type",
  "message0": "Type",
  "args0": [],
  "colour": 191,
  "output": "Type"
},
  {
  "type": "UserDefinedType",
  "message0": "UserDefinedType name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 190,
  "output": "UserDefinedType"
},
  {
  "type": "UserDefinedTypeRef",
  "message0": "UserDefinedTypeRef type %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TYPE",
      "check": [
        "UserDefinedType"
      ]
    }
  ],
  "colour": 80,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "UserDefinedTypesLibrary",
  "message0": "UserDefinedTypesLibrary name %1 userDefinedTypes %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "USERDEFINEDTYPES",
      "check": [
        "UserDefinedType"
      ]
    }
  ],
  "colour": 289,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "TypesLibraryUser",
  "message0": "TypesLibraryUser usedLibraries %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "USEDLIBRARIES",
      "check": [
        "TypesLibrary"
      ]
    }
  ],
  "colour": 170,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "TypesLibrary",
  "message0": "TypesLibrary kind %1",
  "args0": [
    {
      "type": "field_input",
      "name": "kind",
      "text": ""
    }
  ],
  "colour": 124,
  "output": "TypesLibrary"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "NativeTypesLibrary"},
    {kind: "block" as const, type: "TypeInstance"},
    {kind: "block" as const, type: "NativeType"},
    {kind: "block" as const, type: "ComplexNamedType"},
    {kind: "block" as const, type: "SimpleNamedType"},
    {kind: "block" as const, type: "Type"},
    {kind: "block" as const, type: "UserDefinedType"},
    {kind: "block" as const, type: "UserDefinedTypeRef"},
    {kind: "block" as const, type: "UserDefinedTypesLibrary"},
    {kind: "block" as const, type: "TypesLibraryUser"},
    {kind: "block" as const, type: "TypesLibrary"},
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
