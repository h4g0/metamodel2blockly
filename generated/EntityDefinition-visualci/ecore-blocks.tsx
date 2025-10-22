// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Market",
  "message0": "Market id %1 name %2 url %3 categories %4",
  "args0": [
    {
      "type": "field_input",
      "name": "id",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "url",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "CATEGORIES",
      "check": [
        "Category"
      ]
    }
  ],
  "colour": 189,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Category",
  "message0": "Category id %1 name %2 url %3 nodes %4 market %5",
  "args0": [
    {
      "type": "field_input",
      "name": "id",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "url",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "NODES",
      "check": [
        "Node"
      ]
    },
    {
      "type": "input_value",
      "name": "MARKET",
      "check": [
        "Market"
      ]
    }
  ],
  "colour": 287,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Node",
  "message0": "Node id %1 name %2 url %3 favorited %4 type %5 owner %6 shortdescription %7 body %8 created %9 changed %10 foundationmember %11 homepageurl %12 image %13 screenshot %14 version2 %15 license %16 companyname %17 status %18 eclipseversion %19 supporturl %20 updateurl %21 resource %22 categories %23 platforms %24 installableUnits %25 clicks %26 downloads %27",
  "args0": [
    {
      "type": "field_input",
      "name": "id",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "url",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "favorited",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "type",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "owner",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "shortdescription",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "body",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "created",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "changed",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "foundationmember",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "homepageurl",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "image",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "screenshot",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "version2",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "license",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "companyname",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "status",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "eclipseversion",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "supporturl",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "updateurl",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "resource",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "CATEGORIES",
      "check": [
        "Category"
      ]
    },
    {
      "type": "input_statement",
      "name": "PLATFORMS",
      "check": [
        "Platform"
      ]
    },
    {
      "type": "input_statement",
      "name": "INSTALLABLEUNITS",
      "check": [
        "InstallableUnit"
      ]
    },
    {
      "type": "input_statement",
      "name": "CLICKS",
      "check": [
        "Clickthrough"
      ]
    },
    {
      "type": "input_statement",
      "name": "DOWNLOADS",
      "check": [
        "Download"
      ]
    }
  ],
  "colour": 83,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "InstallableUnit",
  "message0": "InstallableUnit id %1 name %2 node %3",
  "args0": [
    {
      "type": "field_input",
      "name": "id",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "NODE",
      "check": [
        "Node"
      ]
    }
  ],
  "colour": 191,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Platform",
  "message0": "Platform name %1 id %2 nodes %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "id",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "NODES",
      "check": [
        "Node"
      ]
    }
  ],
  "colour": 53,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Clickthrough",
  "message0": "Clickthrough id %1 time %2 node %3",
  "args0": [
    {
      "type": "field_input",
      "name": "id",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "time",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "NODE",
      "check": [
        "Node"
      ]
    }
  ],
  "colour": 346,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Download",
  "message0": "Download id %1 time %2 node %3",
  "args0": [
    {
      "type": "field_input",
      "name": "id",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "time",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "NODE",
      "check": [
        "Node"
      ]
    }
  ],
  "colour": 334,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Market"},
    {kind: "block" as const, type: "Category"},
    {kind: "block" as const, type: "Node"},
    {kind: "block" as const, type: "InstallableUnit"},
    {kind: "block" as const, type: "Platform"},
    {kind: "block" as const, type: "Clickthrough"},
    {kind: "block" as const, type: "Download"},
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
