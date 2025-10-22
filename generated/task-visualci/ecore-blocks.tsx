// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "TaskModel",
  "message0": "TaskModel contents %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "CONTENTS",
      "check": [
        "Content"
      ]
    }
  ],
  "colour": 206,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Content",
  "message0": "Content intend %1 text %2 tags %3 links %4 segments %5 images %6 parent %7 taskModel %8",
  "args0": [
    {
      "type": "field_input",
      "name": "intend",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "text",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "TAGS",
      "check": [
        "Tag"
      ]
    },
    {
      "type": "input_statement",
      "name": "LINKS",
      "check": [
        "Link"
      ]
    },
    {
      "type": "input_statement",
      "name": "SEGMENTS",
      "check": [
        "TextSegment"
      ]
    },
    {
      "type": "input_statement",
      "name": "IMAGES",
      "check": [
        "Image"
      ]
    },
    {
      "type": "input_value",
      "name": "PARENT",
      "check": [
        "Container"
      ]
    },
    {
      "type": "input_value",
      "name": "TASKMODEL",
      "check": [
        "TaskModel"
      ]
    }
  ],
  "colour": 141,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Task",
  "message0": "Task",
  "args0": [],
  "colour": 131,
  "output": "Task"
},
  {
  "type": "Note",
  "message0": "Note",
  "args0": [],
  "colour": 306,
  "output": "Note"
},
  {
  "type": "Project",
  "message0": "Project",
  "args0": [],
  "colour": 90,
  "output": "Project"
},
  {
  "type": "GlobalTaskModel",
  "message0": "GlobalTaskModel",
  "args0": [],
  "colour": 166,
  "output": "GlobalTaskModel"
},
  {
  "type": "Container",
  "message0": "Container children %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "CHILDREN",
      "check": [
        "Content"
      ]
    }
  ],
  "colour": 176,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "EmptyLine",
  "message0": "EmptyLine",
  "args0": [],
  "colour": 346,
  "output": "EmptyLine"
},
  {
  "type": "Code",
  "message0": "Code lang %1",
  "args0": [
    {
      "type": "field_input",
      "name": "lang",
      "text": ""
    }
  ],
  "colour": 174,
  "output": "Code"
},
  {
  "type": "TextSegment",
  "message0": "TextSegment offset %1 length %2 content %3",
  "args0": [
    {
      "type": "field_input",
      "name": "offset",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "length",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "CONTENT",
      "check": [
        "Content"
      ]
    }
  ],
  "colour": 150,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Tag",
  "message0": "Tag name %1 value %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "value",
      "text": ""
    }
  ],
  "colour": 235,
  "output": "Tag"
},
  {
  "type": "Link",
  "message0": "Link url %1 description %2",
  "args0": [
    {
      "type": "field_input",
      "name": "url",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "description",
      "text": ""
    }
  ],
  "colour": 239,
  "output": "Link"
},
  {
  "type": "Text",
  "message0": "Text value %1",
  "args0": [
    {
      "type": "field_input",
      "name": "value",
      "text": ""
    }
  ],
  "colour": 57,
  "output": "Text"
},
  {
  "type": "Image",
  "message0": "Image",
  "args0": [],
  "colour": 195,
  "output": "Image"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "TaskModel"},
    {kind: "block" as const, type: "Content"},
    {kind: "block" as const, type: "Task"},
    {kind: "block" as const, type: "Note"},
    {kind: "block" as const, type: "Project"},
    {kind: "block" as const, type: "GlobalTaskModel"},
    {kind: "block" as const, type: "Container"},
    {kind: "block" as const, type: "EmptyLine"},
    {kind: "block" as const, type: "Code"},
    {kind: "block" as const, type: "TextSegment"},
    {kind: "block" as const, type: "Tag"},
    {kind: "block" as const, type: "Link"},
    {kind: "block" as const, type: "Text"},
    {kind: "block" as const, type: "Image"},
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
