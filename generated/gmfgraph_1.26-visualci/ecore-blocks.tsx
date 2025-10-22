// Custom Ecore model blocks for Blockly
// Generated automatically from metamodel

export const ECORE_BLOCKS = [
  {
  "type": "Canvas",
  "message0": "Canvas figures %1 nodes %2 connections %3 compartments %4 labels %5",
  "args0": [
    {
      "type": "input_statement",
      "name": "FIGURES",
      "check": [
        "FigureGallery"
      ]
    },
    {
      "type": "input_statement",
      "name": "NODES",
      "check": [
        "Node"
      ]
    },
    {
      "type": "input_statement",
      "name": "CONNECTIONS",
      "check": [
        "Connection"
      ]
    },
    {
      "type": "input_statement",
      "name": "COMPARTMENTS",
      "check": [
        "Compartment"
      ]
    },
    {
      "type": "input_statement",
      "name": "LABELS",
      "check": [
        "DiagramLabel"
      ]
    }
  ],
  "colour": 94,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "FigureGallery",
  "message0": "FigureGallery implementationBundle %1 figures %2",
  "args0": [
    {
      "type": "field_input",
      "name": "implementationBundle",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "FIGURES",
      "check": [
        "Figure"
      ]
    }
  ],
  "colour": 302,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Identity",
  "message0": "Identity name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "name",
      "text": ""
    }
  ],
  "colour": 314,
  "output": "Identity"
},
  {
  "type": "DiagramElement",
  "message0": "DiagramElement facets %1 figure %2",
  "args0": [
    {
      "type": "input_statement",
      "name": "FACETS",
      "check": [
        "VisualFacet"
      ]
    },
    {
      "type": "input_value",
      "name": "FIGURE",
      "check": [
        "FigureHandle"
      ]
    }
  ],
  "colour": 20,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Node",
  "message0": "Node resizeConstraint %1 affixedParentSide %2 nodeFigure %3",
  "args0": [
    {
      "type": "field_input",
      "name": "resizeConstraint",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "affixedParentSide",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "NODEFIGURE",
      "check": [
        "Figure"
      ]
    }
  ],
  "colour": 83,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Connection",
  "message0": "Connection connectionFigure %1",
  "args0": [
    {
      "type": "input_value",
      "name": "CONNECTIONFIGURE",
      "check": [
        "Figure"
      ]
    }
  ],
  "colour": 86,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Compartment",
  "message0": "Compartment collapsible %1 needsTitle %2",
  "args0": [
    {
      "type": "field_input",
      "name": "collapsible",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "needsTitle",
      "text": ""
    }
  ],
  "colour": 265,
  "output": "Compartment"
},
  {
  "type": "DiagramLabel",
  "message0": "DiagramLabel elementIcon %1",
  "args0": [
    {
      "type": "field_input",
      "name": "elementIcon",
      "text": ""
    }
  ],
  "colour": 319,
  "output": "DiagramLabel"
},
  {
  "type": "VisualFacet",
  "message0": "VisualFacet",
  "args0": [],
  "colour": 236,
  "output": "VisualFacet"
},
  {
  "type": "GeneralFacet",
  "message0": "GeneralFacet identifier %1 data %2",
  "args0": [
    {
      "type": "field_input",
      "name": "identifier",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "data",
      "text": ""
    }
  ],
  "colour": 6,
  "output": "GeneralFacet"
},
  {
  "type": "AlignmentFacet",
  "message0": "AlignmentFacet alignment %1",
  "args0": [
    {
      "type": "field_input",
      "name": "alignment",
      "text": ""
    }
  ],
  "colour": 14,
  "output": "AlignmentFacet"
},
  {
  "type": "GradientFacet",
  "message0": "GradientFacet direction %1",
  "args0": [
    {
      "type": "field_input",
      "name": "direction",
      "text": ""
    }
  ],
  "colour": 46,
  "output": "GradientFacet"
},
  {
  "type": "LabelOffsetFacet",
  "message0": "LabelOffsetFacet x %1 y %2",
  "args0": [
    {
      "type": "field_input",
      "name": "x",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "y",
      "text": ""
    }
  ],
  "colour": 259,
  "output": "LabelOffsetFacet"
},
  {
  "type": "DefaultSizeFacet",
  "message0": "DefaultSizeFacet defaultSize %1",
  "args0": [
    {
      "type": "input_value",
      "name": "DEFAULTSIZE",
      "check": [
        "Dimension"
      ]
    }
  ],
  "colour": 75,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "FigureMarker",
  "message0": "FigureMarker parent %1",
  "args0": [
    {
      "type": "input_value",
      "name": "PARENT",
      "check": [
        "Figure"
      ]
    }
  ],
  "colour": 253,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "FigureHandle",
  "message0": "FigureHandle referencingElements %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "REFERENCINGELEMENTS",
      "check": [
        "DiagramElement"
      ]
    }
  ],
  "colour": 146,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Figure",
  "message0": "Figure children %1 foregroundColor %2 backgroundColor %3 maximumSize %4 minimumSize %5 preferredSize %6 font %7 insets %8 border %9 location %10 size %11",
  "args0": [
    {
      "type": "input_statement",
      "name": "CHILDREN",
      "check": [
        "FigureMarker"
      ]
    },
    {
      "type": "input_value",
      "name": "FOREGROUNDCOLOR",
      "check": [
        "Color"
      ]
    },
    {
      "type": "input_value",
      "name": "BACKGROUNDCOLOR",
      "check": [
        "Color"
      ]
    },
    {
      "type": "input_value",
      "name": "MAXIMUMSIZE",
      "check": [
        "Dimension"
      ]
    },
    {
      "type": "input_value",
      "name": "MINIMUMSIZE",
      "check": [
        "Dimension"
      ]
    },
    {
      "type": "input_value",
      "name": "PREFERREDSIZE",
      "check": [
        "Dimension"
      ]
    },
    {
      "type": "input_value",
      "name": "FONT",
      "check": [
        "Font"
      ]
    },
    {
      "type": "input_value",
      "name": "INSETS",
      "check": [
        "Insets"
      ]
    },
    {
      "type": "input_value",
      "name": "BORDER",
      "check": [
        "Border"
      ]
    },
    {
      "type": "input_value",
      "name": "LOCATION",
      "check": [
        "Point"
      ]
    },
    {
      "type": "input_value",
      "name": "SIZE",
      "check": [
        "Point"
      ]
    }
  ],
  "colour": 324,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "FigureRef",
  "message0": "FigureRef figure %1",
  "args0": [
    {
      "type": "input_value",
      "name": "FIGURE",
      "check": [
        "Figure"
      ]
    }
  ],
  "colour": 29,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "ConnectionFigure",
  "message0": "ConnectionFigure",
  "args0": [],
  "colour": 320,
  "output": "ConnectionFigure"
},
  {
  "type": "DecorationFigure",
  "message0": "DecorationFigure",
  "args0": [],
  "colour": 191,
  "output": "DecorationFigure"
},
  {
  "type": "Shape",
  "message0": "Shape outline %1 fill %2 lineWidth %3 lineKind %4 xorFill %5 xorOutline %6 resolvedChildren %7",
  "args0": [
    {
      "type": "field_input",
      "name": "outline",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "fill",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "lineWidth",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "lineKind",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "xorFill",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "xorOutline",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "RESOLVEDCHILDREN",
      "check": [
        "Figure"
      ]
    }
  ],
  "colour": 292,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Label",
  "message0": "Label text %1",
  "args0": [
    {
      "type": "field_input",
      "name": "text",
      "text": ""
    }
  ],
  "colour": 252,
  "output": "Label"
},
  {
  "type": "LabeledContainer",
  "message0": "LabeledContainer",
  "args0": [],
  "colour": 50,
  "output": "LabeledContainer"
},
  {
  "type": "Rectangle",
  "message0": "Rectangle",
  "args0": [],
  "colour": 226,
  "output": "Rectangle"
},
  {
  "type": "RoundedRectangle",
  "message0": "RoundedRectangle cornerWidth %1 cornerHeight %2",
  "args0": [
    {
      "type": "field_input",
      "name": "cornerWidth",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "cornerHeight",
      "text": ""
    }
  ],
  "colour": 289,
  "output": "RoundedRectangle"
},
  {
  "type": "Ellipse",
  "message0": "Ellipse",
  "args0": [],
  "colour": 158,
  "output": "Ellipse"
},
  {
  "type": "Polyline",
  "message0": "Polyline template %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "TEMPLATE",
      "check": [
        "Point"
      ]
    }
  ],
  "colour": 206,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Polygon",
  "message0": "Polygon",
  "args0": [],
  "colour": 214,
  "output": "Polygon"
},
  {
  "type": "ScalablePolygon",
  "message0": "ScalablePolygon",
  "args0": [],
  "colour": 70,
  "output": "ScalablePolygon"
},
  {
  "type": "PolylineConnection",
  "message0": "PolylineConnection sourceDecoration %1 targetDecoration %2",
  "args0": [
    {
      "type": "input_value",
      "name": "SOURCEDECORATION",
      "check": [
        "DecorationFigure"
      ]
    },
    {
      "type": "input_value",
      "name": "TARGETDECORATION",
      "check": [
        "DecorationFigure"
      ]
    }
  ],
  "colour": 236,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "PolylineDecoration",
  "message0": "PolylineDecoration",
  "args0": [],
  "colour": 309,
  "output": "PolylineDecoration"
},
  {
  "type": "PolygonDecoration",
  "message0": "PolygonDecoration",
  "args0": [],
  "colour": 251,
  "output": "PolygonDecoration"
},
  {
  "type": "CustomClass",
  "message0": "CustomClass qualifiedClassName %1 bundleName %2 attributes %3",
  "args0": [
    {
      "type": "field_input",
      "name": "qualifiedClassName",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "bundleName",
      "text": ""
    },
    {
      "type": "input_statement",
      "name": "ATTRIBUTES",
      "check": [
        "CustomAttribute"
      ]
    }
  ],
  "colour": 66,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "CustomAttribute",
  "message0": "CustomAttribute name %1 value %2 directAccess %3 multiStatementValue %4",
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
    },
    {
      "type": "field_input",
      "name": "directAccess",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "multiStatementValue",
      "text": ""
    }
  ],
  "colour": 106,
  "output": "CustomAttribute"
},
  {
  "type": "FigureAccessor",
  "message0": "FigureAccessor accessor %1 typedFigure %2",
  "args0": [
    {
      "type": "field_input",
      "name": "accessor",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "TYPEDFIGURE",
      "check": [
        "CustomFigure"
      ]
    }
  ],
  "colour": 327,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "CustomFigure",
  "message0": "CustomFigure customChildren %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "CUSTOMCHILDREN",
      "check": [
        "FigureAccessor"
      ]
    }
  ],
  "colour": 97,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "CustomDecoration",
  "message0": "CustomDecoration",
  "args0": [],
  "colour": 41,
  "output": "CustomDecoration"
},
  {
  "type": "CustomConnection",
  "message0": "CustomConnection",
  "args0": [],
  "colour": 112,
  "output": "CustomConnection"
},
  {
  "type": "Color",
  "message0": "Color",
  "args0": [],
  "colour": 253,
  "output": "Color"
},
  {
  "type": "RGBColor",
  "message0": "RGBColor red %1 green %2 blue %3",
  "args0": [
    {
      "type": "field_input",
      "name": "red",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "green",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "blue",
      "text": ""
    }
  ],
  "colour": 90,
  "output": "RGBColor"
},
  {
  "type": "ConstantColor",
  "message0": "ConstantColor value %1",
  "args0": [
    {
      "type": "field_input",
      "name": "value",
      "text": ""
    }
  ],
  "colour": 272,
  "output": "ConstantColor"
},
  {
  "type": "Font",
  "message0": "Font",
  "args0": [],
  "colour": 36,
  "output": "Font"
},
  {
  "type": "BasicFont",
  "message0": "BasicFont faceName %1 height %2 style %3",
  "args0": [
    {
      "type": "field_input",
      "name": "faceName",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "height",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "style",
      "text": ""
    }
  ],
  "colour": 171,
  "output": "BasicFont"
},
  {
  "type": "Point",
  "message0": "Point x %1 y %2",
  "args0": [
    {
      "type": "field_input",
      "name": "x",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "y",
      "text": ""
    }
  ],
  "colour": 200,
  "output": "Point"
},
  {
  "type": "Dimension",
  "message0": "Dimension dx %1 dy %2",
  "args0": [
    {
      "type": "field_input",
      "name": "dx",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "dy",
      "text": ""
    }
  ],
  "colour": 263,
  "output": "Dimension"
},
  {
  "type": "Insets",
  "message0": "Insets top %1 left %2 bottom %3 right %4",
  "args0": [
    {
      "type": "field_input",
      "name": "top",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "left",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "bottom",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "right",
      "text": ""
    }
  ],
  "colour": 278,
  "output": "Insets"
},
  {
  "type": "Border",
  "message0": "Border",
  "args0": [],
  "colour": 321,
  "output": "Border"
},
  {
  "type": "LineBorder",
  "message0": "LineBorder width %1 color %2",
  "args0": [
    {
      "type": "field_input",
      "name": "width",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "COLOR",
      "check": [
        "Color"
      ]
    }
  ],
  "colour": 22,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "MarginBorder",
  "message0": "MarginBorder insets %1",
  "args0": [
    {
      "type": "input_value",
      "name": "INSETS",
      "check": [
        "Insets"
      ]
    }
  ],
  "colour": 59,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "CompoundBorder",
  "message0": "CompoundBorder outer %1 inner %2",
  "args0": [
    {
      "type": "input_value",
      "name": "OUTER",
      "check": [
        "Border"
      ]
    },
    {
      "type": "input_value",
      "name": "INNER",
      "check": [
        "Border"
      ]
    }
  ],
  "colour": 145,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "CustomBorder",
  "message0": "CustomBorder",
  "args0": [],
  "colour": 220,
  "output": "CustomBorder"
},
  {
  "type": "LayoutData",
  "message0": "LayoutData owner %1",
  "args0": [
    {
      "type": "input_value",
      "name": "OWNER",
      "check": [
        "Layoutable"
      ]
    }
  ],
  "colour": 100,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "CustomLayoutData",
  "message0": "CustomLayoutData",
  "args0": [],
  "colour": 266,
  "output": "CustomLayoutData"
},
  {
  "type": "GridLayoutData",
  "message0": "GridLayoutData grabExcessHorizontalSpace %1 grabExcessVerticalSpace %2 verticalAlignment %3 horizontalAlignment %4 verticalSpan %5 horizontalSpan %6 horizontalIndent %7 sizeHint %8",
  "args0": [
    {
      "type": "field_input",
      "name": "grabExcessHorizontalSpace",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "grabExcessVerticalSpace",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "verticalAlignment",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "horizontalAlignment",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "verticalSpan",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "horizontalSpan",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "horizontalIndent",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "SIZEHINT",
      "check": [
        "Dimension"
      ]
    }
  ],
  "colour": 152,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "BorderLayoutData",
  "message0": "BorderLayoutData alignment %1 vertical %2",
  "args0": [
    {
      "type": "field_input",
      "name": "alignment",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "vertical",
      "text": ""
    }
  ],
  "colour": 146,
  "output": "BorderLayoutData"
},
  {
  "type": "Layoutable",
  "message0": "Layoutable layoutData %1 layout %2",
  "args0": [
    {
      "type": "input_value",
      "name": "LAYOUTDATA",
      "check": [
        "LayoutData"
      ]
    },
    {
      "type": "input_value",
      "name": "LAYOUT",
      "check": [
        "Layout"
      ]
    }
  ],
  "colour": 289,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "Layout",
  "message0": "Layout",
  "args0": [],
  "colour": 188,
  "output": "Layout"
},
  {
  "type": "CustomLayout",
  "message0": "CustomLayout",
  "args0": [],
  "colour": 137,
  "output": "CustomLayout"
},
  {
  "type": "GridLayout",
  "message0": "GridLayout numColumns %1 equalWidth %2 margins %3 spacing %4",
  "args0": [
    {
      "type": "field_input",
      "name": "numColumns",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "equalWidth",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "MARGINS",
      "check": [
        "Dimension"
      ]
    },
    {
      "type": "input_value",
      "name": "SPACING",
      "check": [
        "Dimension"
      ]
    }
  ],
  "colour": 309,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "BorderLayout",
  "message0": "BorderLayout spacing %1",
  "args0": [
    {
      "type": "input_value",
      "name": "SPACING",
      "check": [
        "Dimension"
      ]
    }
  ],
  "colour": 353,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "FlowLayout",
  "message0": "FlowLayout vertical %1 matchMinorSize %2 forceSingleLine %3 majorAlignment %4 minorAlignment %5 majorSpacing %6 minorSpacing %7",
  "args0": [
    {
      "type": "field_input",
      "name": "vertical",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "matchMinorSize",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "forceSingleLine",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "majorAlignment",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "minorAlignment",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "majorSpacing",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "minorSpacing",
      "text": ""
    }
  ],
  "colour": 220,
  "output": "FlowLayout"
},
  {
  "type": "XYLayout",
  "message0": "XYLayout",
  "args0": [],
  "colour": 273,
  "output": "XYLayout"
},
  {
  "type": "XYLayoutData",
  "message0": "XYLayoutData topLeft %1 size %2",
  "args0": [
    {
      "type": "input_value",
      "name": "TOPLEFT",
      "check": [
        "Point"
      ]
    },
    {
      "type": "input_value",
      "name": "SIZE",
      "check": [
        "Dimension"
      ]
    }
  ],
  "colour": 262,
  "previousStatement": null,
  "nextStatement": null
},
  {
  "type": "StackLayout",
  "message0": "StackLayout",
  "args0": [],
  "colour": 164,
  "output": "StackLayout"
},
] as const;

export const ECORE_TOOLBOX = {
  kind: "flyoutToolbox" as const,
  contents: [
    {kind: "block" as const, type: "Canvas"},
    {kind: "block" as const, type: "FigureGallery"},
    {kind: "block" as const, type: "Identity"},
    {kind: "block" as const, type: "DiagramElement"},
    {kind: "block" as const, type: "Node"},
    {kind: "block" as const, type: "Connection"},
    {kind: "block" as const, type: "Compartment"},
    {kind: "block" as const, type: "DiagramLabel"},
    {kind: "block" as const, type: "VisualFacet"},
    {kind: "block" as const, type: "GeneralFacet"},
    {kind: "block" as const, type: "AlignmentFacet"},
    {kind: "block" as const, type: "GradientFacet"},
    {kind: "block" as const, type: "LabelOffsetFacet"},
    {kind: "block" as const, type: "DefaultSizeFacet"},
    {kind: "block" as const, type: "FigureMarker"},
    {kind: "block" as const, type: "FigureHandle"},
    {kind: "block" as const, type: "Figure"},
    {kind: "block" as const, type: "FigureRef"},
    {kind: "block" as const, type: "ConnectionFigure"},
    {kind: "block" as const, type: "DecorationFigure"},
    {kind: "block" as const, type: "Shape"},
    {kind: "block" as const, type: "Label"},
    {kind: "block" as const, type: "LabeledContainer"},
    {kind: "block" as const, type: "Rectangle"},
    {kind: "block" as const, type: "RoundedRectangle"},
    {kind: "block" as const, type: "Ellipse"},
    {kind: "block" as const, type: "Polyline"},
    {kind: "block" as const, type: "Polygon"},
    {kind: "block" as const, type: "ScalablePolygon"},
    {kind: "block" as const, type: "PolylineConnection"},
    {kind: "block" as const, type: "PolylineDecoration"},
    {kind: "block" as const, type: "PolygonDecoration"},
    {kind: "block" as const, type: "CustomClass"},
    {kind: "block" as const, type: "CustomAttribute"},
    {kind: "block" as const, type: "FigureAccessor"},
    {kind: "block" as const, type: "CustomFigure"},
    {kind: "block" as const, type: "CustomDecoration"},
    {kind: "block" as const, type: "CustomConnection"},
    {kind: "block" as const, type: "Color"},
    {kind: "block" as const, type: "RGBColor"},
    {kind: "block" as const, type: "ConstantColor"},
    {kind: "block" as const, type: "Font"},
    {kind: "block" as const, type: "BasicFont"},
    {kind: "block" as const, type: "Point"},
    {kind: "block" as const, type: "Dimension"},
    {kind: "block" as const, type: "Insets"},
    {kind: "block" as const, type: "Border"},
    {kind: "block" as const, type: "LineBorder"},
    {kind: "block" as const, type: "MarginBorder"},
    {kind: "block" as const, type: "CompoundBorder"},
    {kind: "block" as const, type: "CustomBorder"},
    {kind: "block" as const, type: "LayoutData"},
    {kind: "block" as const, type: "CustomLayoutData"},
    {kind: "block" as const, type: "GridLayoutData"},
    {kind: "block" as const, type: "BorderLayoutData"},
    {kind: "block" as const, type: "Layoutable"},
    {kind: "block" as const, type: "Layout"},
    {kind: "block" as const, type: "CustomLayout"},
    {kind: "block" as const, type: "GridLayout"},
    {kind: "block" as const, type: "BorderLayout"},
    {kind: "block" as const, type: "FlowLayout"},
    {kind: "block" as const, type: "XYLayout"},
    {kind: "block" as const, type: "XYLayoutData"},
    {kind: "block" as const, type: "StackLayout"},
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
