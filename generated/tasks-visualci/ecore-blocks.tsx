// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "TasksModel",
  "message0": "TasksModel author %1 projects %2",
  "args0": [
    {
      "type": "field_input",
      "name": "author",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "PROJECTS",
      "check": [
        "Project"
      ]
    }
  ],
  "colour": 312,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Task",
  "message0": "Task name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 131,
  "output": "Task"
},
  {
  "type": "Project",
  "message0": "Project name %1 tasks %2 model %3",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "TASKS",
      "check": [
        "Task"
      ]
    },
    {
      "type": "input_value",
      "name": "MODEL",
      "check": [
        "TasksModel"
      ]
    }
  ],
  "colour": 90,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Label",
  "message0": "Label",
  "args0": [],
  "colour": 252,
  "output": "Label"
},
  {
  "type": "PersonalProj",
  "message0": "PersonalProj",
  "args0": [],
  "colour": 130,
  "output": "PersonalProj"
},
  {
  "type": "TeamProj",
  "message0": "TeamProj",
  "args0": [],
  "colour": 198,
  "output": "TeamProj"
},
  {
  "type": "Simple",
  "message0": "Simple",
  "args0": [],
  "colour": 116,
  "output": "Simple"
},
  {
  "type": "Composite",
  "message0": "Composite subtasks %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "SUBTASKS",
      "check": [
        "Simple"
      ]
    }
  ],
  "colour": 291,
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "TasksModel"},
    {kind: "block" as const, type: "Task"},
    {kind: "block" as const, type: "Project"},
    {kind: "block" as const, type: "Label"},
    {kind: "block" as const, type: "PersonalProj"},
    {kind: "block" as const, type: "TeamProj"},
    {kind: "block" as const, type: "Simple"},
    {kind: "block" as const, type: "Composite"},
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
