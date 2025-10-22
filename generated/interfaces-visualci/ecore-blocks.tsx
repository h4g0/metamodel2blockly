// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "IControlDashboard",
  "message0": "IControlDashboard",
  "args0": [],
  "colour": 103,
  "output": "IControlDashboard"
},
  {
  "type": "IDisplay",
  "message0": "IDisplay curVal %1",
  "args0": [
    {
      "type": "field_input",
      "name": "curVal",
      "text": ""
    }
  ],
  "colour": 22,
  "output": "IDisplay"
},
  {
  "type": "IFuelometer",
  "message0": "IFuelometer",
  "args0": [],
  "colour": 313,
  "output": "IFuelometer"
},
  {
  "type": "IGauge",
  "message0": "IGauge curValRepDisplayed %1 val %2",
  "args0": [
    {
      "type": "field_input",
      "name": "curValRepDisplayed",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "VAL",
      "check": [
        "IGaugeValue"
      ]
    }
  ],
  "colour": 212,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "IGaugeAnalogicDisplay",
  "message0": "IGaugeAnalogicDisplay",
  "args0": [],
  "colour": 167,
  "output": "IGaugeAnalogicDisplay"
},
  {
  "type": "IGaugeDigitalDisplay",
  "message0": "IGaugeDigitalDisplay",
  "args0": [],
  "colour": 14,
  "output": "IGaugeDigitalDisplay"
},
  {
  "type": "IGaugeDisplay",
  "message0": "IGaugeDisplay displayedVal %1",
  "args0": [
    {
      "type": "field_input",
      "name": "displayedVal",
      "text": ""
    }
  ],
  "colour": 65,
  "output": "IGaugeDisplay"
},
  {
  "type": "IGaugeMonotonic",
  "message0": "IGaugeMonotonic",
  "args0": [],
  "colour": 64,
  "output": "IGaugeMonotonic"
},
  {
  "type": "IGaugeValue",
  "message0": "IGaugeValue",
  "args0": [],
  "colour": 203,
  "output": "IGaugeValue"
},
  {
  "type": "IGaugeVariant",
  "message0": "IGaugeVariant",
  "args0": [],
  "colour": 199,
  "output": "IGaugeVariant"
},
  {
  "type": "ILocTracker",
  "message0": "ILocTracker",
  "args0": [],
  "colour": 104,
  "output": "ILocTracker"
},
  {
  "type": "IOdometer",
  "message0": "IOdometer",
  "args0": [],
  "colour": 81,
  "output": "IOdometer"
},
  {
  "type": "ISpeedometer",
  "message0": "ISpeedometer",
  "args0": [],
  "colour": 333,
  "output": "ISpeedometer"
},
  {
  "type": "Observer",
  "message0": "Observer",
  "args0": [],
  "colour": 233,
  "output": "Observer"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "IControlDashboard"},
    {kind: "block" as const, type: "IDisplay"},
    {kind: "block" as const, type: "IFuelometer"},
    {kind: "block" as const, type: "IGauge"},
    {kind: "block" as const, type: "IGaugeAnalogicDisplay"},
    {kind: "block" as const, type: "IGaugeDigitalDisplay"},
    {kind: "block" as const, type: "IGaugeDisplay"},
    {kind: "block" as const, type: "IGaugeMonotonic"},
    {kind: "block" as const, type: "IGaugeValue"},
    {kind: "block" as const, type: "IGaugeVariant"},
    {kind: "block" as const, type: "ILocTracker"},
    {kind: "block" as const, type: "IOdometer"},
    {kind: "block" as const, type: "ISpeedometer"},
    {kind: "block" as const, type: "Observer"},
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
