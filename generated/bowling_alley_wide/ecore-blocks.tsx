// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel
// Max 4 inputs per line to prevent wide blocks

export const ECORE_BLOCKS = [
  {
  "type": "League",
  "colour": 190,
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
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Tournament",
  "colour": 185,
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
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "TournamentType",
  "colour": 94,
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
  "output": "TournamentType"
},
  {
  "type": "Player",
  "colour": 235,
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
  "message1": "playerId %1 email %2 phoneNumber %3 address %4",
  "args1": [
    {
      "type": "field_input",
      "name": "playerId",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "email",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "phoneNumber",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "address",
      "text": ""
    }
  ],
  "message2": "city %1 country %2 handicap %3 averageScore %4",
  "args2": [
    {
      "type": "field_input",
      "name": "city",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "country",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "handicap",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "averageScore",
      "text": ""
    }
  ],
  "message3": "highestScore %1 dominantHand %2 preferredLane %3 teamName %4",
  "args3": [
    {
      "type": "field_input",
      "name": "highestScore",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "dominantHand",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "preferredLane",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "teamName",
      "text": ""
    }
  ],
  "message4": "ranking %1 gamesPlayed %2 joinDate %3 isActive %4",
  "args4": [
    {
      "type": "field_input",
      "name": "ranking",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "gamesPlayed",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "joinDate",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "isActive",
      "text": ""
    }
  ],
  "output": "Player"
},
  {
  "type": "Game",
  "colour": 162,
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
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Matchup",
  "colour": 317,
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
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Frame",
  "colour": 153,
  "message0": "Frame score %1",
  "args0": [
    {
      "type": "field_input",
      "name": "score",
      "text": ""
    }
  ],
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
