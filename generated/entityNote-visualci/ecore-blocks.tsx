// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "EntityNote",
  "message0": "EntityNote description %1",
  "args0": [
    {
      "type": "field_input",
      "name": "description",
      "text": ""
    }
  ],
  "colour": 167,
  "output": "EntityNote"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "EntityNote"},
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
