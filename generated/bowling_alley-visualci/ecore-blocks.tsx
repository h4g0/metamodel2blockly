// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "League",
  "message0": "League name %1 player %2",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "PLAYER",
      "check": [
        "Player"
      ]
    }
  ],
  "colour": 190,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Tournament",
  "message0": "Tournament type %1 matchup %2",
  "args0": [
    {
      "type": "field_input",
      "name": "type",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "MATCHUP",
      "check": [
        "Matchup"
      ]
    }
  ],
  "colour": 185,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "TournamentType",
  "message0": "TournamentType Pro %1 Amateur %2",
  "args0": [
    {
      "type": "field_input",
      "name": "Pro",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "Amateur",
      "text": ""
    }
  ],
  "colour": 94,
  "output": "TournamentType"
},
  {
  "type": "Player",
  "message0": "Player name %1 dateOfBirth %2 height %3 isPro %4",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "dateOfBirth",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "height",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "isPro",
      "text": ""
    }
  ],
  "colour": 235,
  "output": "Player"
},
  {
  "type": "Game",
  "message0": "Game attribute %1 frame %2 player %3",
  "args0": [
    {
      "type": "field_input",
      "name": "attribute",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "FRAME",
      "check": [
        "Frame"
      ]
    },
    {
      "type": "input_value",
      "name": "PLAYER",
      "check": [
        "Player"
      ]
    }
  ],
  "colour": 162,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Matchup",
  "message0": "Matchup attribute %1 game %2",
  "args0": [
    {
      "type": "field_input",
      "name": "attribute",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "GAME",
      "check": [
        "Game"
      ]
    }
  ],
  "colour": 317,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Frame",
  "message0": "Frame score %1",
  "args0": [
    {
      "type": "field_input",
      "name": "score",
      "text": ""
    }
  ],
  "colour": 153,
  "output": "Frame"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "League"},
    {kind: "block" as const, type: "Tournament"},
    {kind: "block" as const, type: "TournamentType"},
    {kind: "block" as const, type: "Player"},
    {kind: "block" as const, type: "Game"},
    {kind: "block" as const, type: "Matchup"},
    {kind: "block" as const, type: "Frame"},
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
