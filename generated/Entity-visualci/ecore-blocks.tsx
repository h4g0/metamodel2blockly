// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "System",
  "message0": "System entity %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "ENTITY",
      "check": [
        "Entity"
      ]
    }
  ],
  "colour": 205,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Entity",
  "message0": "Entity name %1 inDomain %2 system %3 relationships %4",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "inDomain",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "SYSTEM",
      "check": [
        "System"
      ]
    },
    {
      "type": "input_statement",
      "name": "RELATIONSHIPS",
      "check": [
        "Relationship"
      ]
    }
  ],
  "colour": 270,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Relationship",
  "message0": "Relationship name %1 entities %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ENTITIES",
      "check": [
        "Entity"
      ]
    }
  ],
  "colour": 296,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Attribute",
  "message0": "Attribute name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 96,
  "output": "Attribute"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "System"},
    {kind: "block" as const, type: "Entity"},
    {kind: "block" as const, type: "Relationship"},
    {kind: "block" as const, type: "Attribute"},
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
