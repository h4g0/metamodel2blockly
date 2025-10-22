// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "PetriNet",
  "message0": "PetriNet name %1 nodes %2 arcs %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "NODES",
      "check": [
        "RefNodes"
      ]
    },
    {
      "type": "input_statement",
      "name": "ARCS",
      "check": [
        "RefArcs"
      ]
    }
  ],
  "colour": 225,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "RefPetriNets",
  "message0": "RefPetriNets",
  "args0": [],
  "colour": 79,
  "output": "RefPetriNets"
},
  {
  "type": "Node",
  "message0": "Node name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 83,
  "output": "Node"
},
  {
  "type": "Arc",
  "message0": "Arc name %1 target %2 source %3",
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
        "RefNodes"
      ]
    },
    {
      "type": "input_value",
      "name": "SOURCE",
      "check": [
        "RefNodes"
      ]
    }
  ],
  "colour": 243,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "RefArcs",
  "message0": "RefArcs",
  "args0": [],
  "colour": 272,
  "output": "RefArcs"
},
  {
  "type": "RefNodes",
  "message0": "RefNodes",
  "args0": [],
  "colour": 322,
  "output": "RefNodes"
},
  {
  "type": "Transition",
  "message0": "Transition",
  "args0": [],
  "colour": 258,
  "output": "Transition"
},
  {
  "type": "Place",
  "message0": "Place marking %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "MARKING",
      "check": [
        "RefTokens"
      ]
    }
  ],
  "colour": 321,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Token",
  "message0": "Token name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 279,
  "output": "Token"
},
  {
  "type": "RefTokens",
  "message0": "RefTokens",
  "args0": [],
  "colour": 333,
  "output": "RefTokens"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "PetriNet"},
    {kind: "block" as const, type: "RefPetriNets"},
    {kind: "block" as const, type: "Node"},
    {kind: "block" as const, type: "Arc"},
    {kind: "block" as const, type: "RefArcs"},
    {kind: "block" as const, type: "RefNodes"},
    {kind: "block" as const, type: "Transition"},
    {kind: "block" as const, type: "Place"},
    {kind: "block" as const, type: "Token"},
    {kind: "block" as const, type: "RefTokens"},
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
