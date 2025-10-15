// Custom Ecore model blocks for Blockly
export const ECORE_BLOCKS = [
    {
    "type": "Microservice",
    "message0": "Microservice Attributes %1 Containments %2",
    "args0": [
        {
            "type": "field_input",
            "name": "uuid",
            "text": "uuid"
        },
        {
            "type": "input_statement",
            "name": "ENDPOINTS",
            "check": [
                "Endpoint"
            ]
        }
    ],
    "colour": 46,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Configuration",
    "message0": "Configuration Containments %1",
    "args0": [
        {
            "type": "input_statement",
            "name": "MICROSERVICES",
            "check": [
                "Microservice"
            ]
        }
    ],
    "colour": 7,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "ExecutionEnvironment",
    "message0": "ExecutionEnvironment",
    "args0": [],
    "colour": 329,
    "output": "ExecutionEnvironment"
},
    {
    "type": "Version",
    "message0": "Version Attributes %1",
    "args0": [
        {
            "type": "field_input",
            "name": "versionString",
            "text": "versionString"
        }
    ],
    "colour": 296,
    "output": "Version"
},
    {
    "type": "RESTOperation",
    "message0": "RESTOperation Attributes %1",
    "args0": [
        {
            "type": "field_input",
            "name": "name",
            "text": "name"
        },
        {
            "type": "field_input",
            "name": "subPath",
            "text": "subPath"
        },
        {
            "type": "field_input",
            "name": "restVerb",
            "text": "restVerb"
        }
    ],
    "colour": 94,
    "output": "RESTOperation"
},
    {
    "type": "Endpoint",
    "message0": "Endpoint Attributes %1",
    "args0": [
        {
            "type": "field_input",
            "name": "ipAddress",
            "text": "ipAddress"
        },
        {
            "type": "field_input",
            "name": "port",
            "text": "port"
        },
        {
            "type": "field_input",
            "name": "url",
            "text": "url"
        },
        {
            "type": "field_input",
            "name": "protocol",
            "text": "protocol"
        }
    ],
    "colour": 262,
    "output": "Endpoint"
},
    {
    "type": "MicroserviceType",
    "message0": "MicroserviceType Attributes %1 Containments %2 %3",
    "args0": [
        {
            "type": "field_input",
            "name": "identifier",
            "text": "identifier"
        },
        {
            "type": "input_statement",
            "name": "RESTOPERATIONS",
            "check": [
                "RESTOperation"
            ]
        },
        {
            "type": "input_statement",
            "name": "VERSIONS",
            "check": [
                "Version"
            ]
        }
    ],
    "colour": 214,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "MicroserviceRepository",
    "message0": "MicroserviceRepository Containments %1",
    "args0": [
        {
            "type": "input_statement",
            "name": "MICROSERVICETYPES",
            "check": [
                "MicroserviceType"
            ]
        }
    ],
    "colour": 72,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Host",
    "message0": "Host Attributes %1 Containments %2",
    "args0": [
        {
            "type": "field_input",
            "name": "hostname",
            "text": "hostname"
        },
        {
            "type": "input_statement",
            "name": "CONTAINERS",
            "check": [
                "Container"
            ]
        }
    ],
    "colour": 332,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Container",
    "message0": "Container",
    "args0": [],
    "colour": 154,
    "output": "Container"
},
    {
    "type": "VirtualHost",
    "message0": "VirtualHost",
    "args0": [],
    "colour": 26,
    "output": "VirtualHost"
},
    {
    "type": "PhysicalHost",
    "message0": "PhysicalHost Containments %1",
    "args0": [
        {
            "type": "input_statement",
            "name": "VIRTUALHOSTS",
            "check": [
                "VirtualHost"
            ]
        }
    ],
    "colour": 128,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "InfrastructureModel",
    "message0": "InfrastructureModel Containments %1",
    "args0": [
        {
            "type": "input_statement",
            "name": "HOSTS",
            "check": [
                "PhysicalHost"
            ]
        }
    ],
    "colour": 292,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "DependencyModel",
    "message0": "DependencyModel Containments %1",
    "args0": [
        {
            "type": "input_statement",
            "name": "OPERATIONTOOPERATIONCALLINGDEPENDENCIES",
            "check": [
                "OperationToOperationCallingDependency"
            ]
        }
    ],
    "colour": 233,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "OperationToOperationCallingDependency",
    "message0": "OperationToOperationCallingDependency",
    "args0": [],
    "colour": 21,
    "output": "OperationToOperationCallingDependency"
},
    {
    "type": "TimeSeries",
    "message0": "TimeSeries Containments %1",
    "args0": [
        {
            "type": "input_statement",
            "name": "TIMESERIESPOINTS",
            "check": [
                "TimeSeriesPoint"
            ]
        }
    ],
    "colour": 287,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "TimeSeriesPoint",
    "message0": "TimeSeriesPoint",
    "args0": [],
    "colour": 225,
    "output": "TimeSeriesPoint"
},
    {
    "type": "MicroserviceOperationTimeSeriesPoint",
    "message0": "MicroserviceOperationTimeSeriesPoint",
    "args0": [],
    "colour": 270,
    "output": "MicroserviceOperationTimeSeriesPoint"
},
    {
    "type": "MetaModelStructure",
    "message0": "MetaModelStructure Containments %1 %2 %3 %4 %5",
    "args0": [
        {
            "type": "input_value",
            "name": "INFRASTRUCTURE",
            "check": [
                "InfrastructureModel"
            ]
        },
        {
            "type": "input_statement",
            "name": "CONFIGURATIONS",
            "check": [
                "Configuration"
            ]
        },
        {
            "type": "input_value",
            "name": "DEPENDENCIES",
            "check": [
                "DependencyModel"
            ]
        },
        {
            "type": "input_value",
            "name": "TIMESERIES",
            "check": [
                "TimeSeries"
            ]
        },
        {
            "type": "input_value",
            "name": "MICROSERVICEREPOSITORY",
            "check": [
                "MicroserviceRepository"
            ]
        }
    ],
    "colour": 353,
    "previousStatement": null,
    "nextStatement": null
},
];

export const ECORE_TOOLBOX = {
    kind: "flyoutToolbox",
    contents: [
        {"kind": "block", "type": "Microservice"},
        {"kind": "block", "type": "Configuration"},
        {"kind": "block", "type": "ExecutionEnvironment"},
        {"kind": "block", "type": "Version"},
        {"kind": "block", "type": "RESTOperation"},
        {"kind": "block", "type": "Endpoint"},
        {"kind": "block", "type": "MicroserviceType"},
        {"kind": "block", "type": "MicroserviceRepository"},
        {"kind": "block", "type": "Host"},
        {"kind": "block", "type": "Container"},
        {"kind": "block", "type": "VirtualHost"},
        {"kind": "block", "type": "PhysicalHost"},
        {"kind": "block", "type": "InfrastructureModel"},
        {"kind": "block", "type": "DependencyModel"},
        {"kind": "block", "type": "OperationToOperationCallingDependency"},
        {"kind": "block", "type": "TimeSeries"},
        {"kind": "block", "type": "TimeSeriesPoint"},
        {"kind": "block", "type": "MicroserviceOperationTimeSeriesPoint"},
        {"kind": "block", "type": "MetaModelStructure"},
    ],
};
