// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel
// Max 4 inputs per line to prevent wide blocks

export const ECORE_BLOCKS = [
  {
  "type": "NotificationSettings",
  "colour": 2,
  "message0": "NotificationSettings enableEmail %1 notifyOn %2 enablePush %3 appconfig %4",
  "args0": [
    {
      "type": "field_input",
      "name": "enableEmail",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "notifyOn",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "enablePush",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "APPCONFIG",
      "check": [
        "AppConfig"
      ]
    }
  ],
  "output": "NotificationSettings",
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "AppConfig",
  "colour": 8,
  "message0": "AppConfig loginRequired %1 defaultLanguage %2 description %3 name %4",
  "args0": [
    {
      "type": "field_input",
      "name": "loginRequired",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "defaultLanguage",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "description",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "message1": "featureconfig %1 notificationsettings %2 communityconfig %3 theme %4",
  "args1": [
    {
      "type": "input_value",
      "name": "FEATURECONFIG",
      "check": [
        "FeatureConfig"
      ]
    },
    {
      "type": "input_value",
      "name": "NOTIFICATIONSETTINGS",
      "check": [
        "NotificationSettings"
      ]
    },
    {
      "type": "input_value",
      "name": "COMMUNITYCONFIG",
      "check": [
        "CommunityConfig"
      ]
    },
    {
      "type": "input_value",
      "name": "THEME",
      "check": [
        "Theme"
      ]
    }
  ],
  "message2": "roleconfig %1",
  "args2": [
    {
      "type": "input_value",
      "name": "ROLECONFIG",
      "check": [
        "RoleConfig"
      ]
    }
  ],
  "output": "AppConfig",
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "CommunityConfig",
  "colour": 108,
  "message0": "CommunityConfig maxSubcommunity %1 privacy %2 name %3 type %4",
  "args0": [
    {
      "type": "field_input",
      "name": "maxSubcommunity",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "privacy",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "type",
      "text": ""
    }
  ],
  "message1": "allowSubcommunities %1 appconfig_1 %2",
  "args1": [
    {
      "type": "field_input",
      "name": "allowSubcommunities",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "APPCONFIG_1",
      "check": [
        "AppConfig"
      ]
    }
  ],
  "output": "CommunityConfig",
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "FeatureConfig",
  "colour": 34,
  "message0": "FeatureConfig enableChat %1 enableItems %2 enableAuctions %3 enableRatings %4",
  "args0": [
    {
      "type": "field_input",
      "name": "enableChat",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "enableItems",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "enableAuctions",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "enableRatings",
      "text": ""
    }
  ],
  "message1": "enableSales %1 enableNegotiations %2 enableExchanges %3 enableReports %4",
  "args1": [
    {
      "type": "field_input",
      "name": "enableSales",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "enableNegotiations",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "enableExchanges",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "enableReports",
      "text": ""
    }
  ],
  "message2": "enableWishlist %1 enableGiveaways %2 enableOffers %3 enableSubcommunities %4",
  "args2": [
    {
      "type": "field_input",
      "name": "enableWishlist",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "enableGiveaways",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "enableOffers",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "enableSubcommunities",
      "text": ""
    }
  ],
  "message3": "enableNotifications %1 appconfig_4 %2",
  "args3": [
    {
      "type": "field_input",
      "name": "enableNotifications",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "APPCONFIG_4",
      "check": [
        "AppConfig"
      ]
    }
  ],
  "output": "FeatureConfig",
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Theme",
  "colour": 268,
  "message0": "Theme primaryColor %1 fontFamily %2 layout %3 secondaryColor %4",
  "args0": [
    {
      "type": "field_input",
      "name": "primaryColor",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "fontFamily",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "layout",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "secondaryColor",
      "text": ""
    }
  ],
  "message1": "logo %1 appconfig_2 %2",
  "args1": [
    {
      "type": "field_input",
      "name": "logo",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "APPCONFIG_2",
      "check": [
        "AppConfig"
      ]
    }
  ],
  "output": "Theme",
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "RoleConfig",
  "colour": 65,
  "message0": "RoleConfig minModeratorsPerCommunity %1 requireVerifiedToPublish %2 allowMember %3 allowModerator %4",
  "args0": [
    {
      "type": "field_input",
      "name": "minModeratorsPerCommunity",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "requireVerifiedToPublish",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "allowMember",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "allowModerator",
      "text": ""
    }
  ],
  "message1": "allowAdmin %1 defaultRole %2 appconfig_3 %3",
  "args1": [
    {
      "type": "field_input",
      "name": "allowAdmin",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "defaultRole",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "APPCONFIG_3",
      "check": [
        "AppConfig"
      ]
    }
  ],
  "output": "RoleConfig",
  "previousStatement": null,
  "nextStatement": null
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "NotificationSettings"},
    {kind: "block" as const, type: "AppConfig"},
    {kind: "block" as const, type: "CommunityConfig"},
    {kind: "block" as const, type: "FeatureConfig"},
    {kind: "block" as const, type: "Theme"},
    {kind: "block" as const, type: "RoleConfig"},
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
