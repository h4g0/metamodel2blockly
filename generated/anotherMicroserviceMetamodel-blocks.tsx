// Custom Ecore model blocks for Blockly
export const ECORE_BLOCKS = [
    {
    "type": "Microservice",
    "message0": "Microservice Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "uuid",
            "text": "uuid"
        },
        {
            "type": "input_value",
            "name": "endpoints",
            "check": [
                "Endpoint"
            ]
        }
    ],
    "colour": 294,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Configuration",
    "message0": "Configuration Containments",
    "args0": [
        {
            "type": "input_value",
            "name": "microservices",
            "check": [
                "Microservice"
            ]
        }
    ],
    "colour": 2,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "ExecutionEnvironment",
    "message0": "ExecutionEnvironment",
    "args0": [],
    "colour": 140,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Version",
    "message0": "Version Attributes",
    "args0": [
        {
            "type": "field_input",
            "name": "versionString",
            "text": "versionString"
        }
    ],
    "colour": 14
},
    {
    "type": "RESTOperation",
    "message0": "RESTOperation Attributes",
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
    "colour": 97
},
    {
    "type": "Endpoint",
    "message0": "Endpoint Attributes",
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
    "colour": 268,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "MicroserviceType",
    "message0": "MicroserviceType Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "identifier",
            "text": "identifier"
        },
        {
            "type": "input_value",
            "name": "restOperations",
            "check": [
                "RESTOperation"
            ]
        },
        {
            "type": "input_value",
            "name": "versions",
            "check": [
                "Version"
            ]
        }
    ],
    "colour": 195,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "MicroserviceRepository",
    "message0": "MicroserviceRepository Containments",
    "args0": [
        {
            "type": "input_value",
            "name": "microserviceTypes",
            "check": [
                "MicroserviceType"
            ]
        }
    ],
    "colour": 68,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Host",
    "message0": "Host Attributes Containments",
    "args0": [
        {
            "type": "field_input",
            "name": "hostname",
            "text": "hostname"
        },
        {
            "type": "input_value",
            "name": "containers",
            "check": [
                "Container"
            ]
        }
    ],
    "colour": 350,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "Container",
    "message0": "Container",
    "args0": [],
    "colour": 16,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "VirtualHost",
    "message0": "VirtualHost",
    "args0": [],
    "colour": 325,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "PhysicalHost",
    "message0": "PhysicalHost Containments",
    "args0": [
        {
            "type": "input_value",
            "name": "virtualHosts",
            "check": [
                "VirtualHost"
            ]
        }
    ],
    "colour": 293,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "InfrastructureModel",
    "message0": "InfrastructureModel Containments",
    "args0": [
        {
            "type": "input_value",
            "name": "hosts",
            "check": [
                "PhysicalHost"
            ]
        }
    ],
    "colour": 281,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "DependencyModel",
    "message0": "DependencyModel Containments",
    "args0": [
        {
            "type": "input_value",
            "name": "operationToOperationCallingDependencies",
            "check": [
                "OperationToOperationCallingDependency"
            ]
        }
    ],
    "colour": 39,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "OperationToOperationCallingDependency",
    "message0": "OperationToOperationCallingDependency",
    "args0": [],
    "colour": 258,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "TimeSeries",
    "message0": "TimeSeries Containments",
    "args0": [
        {
            "type": "input_value",
            "name": "timeSeriesPoints",
            "check": [
                "TimeSeriesPoint"
            ]
        }
    ],
    "colour": 49,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "TimeSeriesPoint",
    "message0": "TimeSeriesPoint",
    "args0": [],
    "colour": 93,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "MicroserviceOperationTimeSeriesPoint",
    "message0": "MicroserviceOperationTimeSeriesPoint",
    "args0": [],
    "colour": 309,
    "previousStatement": null,
    "nextStatement": null
},
    {
    "type": "MetaModelStructure",
    "message0": "MetaModelStructure Containments",
    "args0": [
        {
            "type": "input_value",
            "name": "infrastructure",
            "check": [
                "InfrastructureModel"
            ]
        },
        {
            "type": "input_value",
            "name": "configurations",
            "check": [
                "Configuration"
            ]
        },
        {
            "type": "input_value",
            "name": "dependencies",
            "check": [
                "DependencyModel"
            ]
        },
        {
            "type": "input_value",
            "name": "timeSeries",
            "check": [
                "TimeSeries"
            ]
        },
        {
            "type": "input_value",
            "name": "microserviceRepository",
            "check": [
                "MicroserviceRepository"
            ]
        }
    ],
    "colour": 331,
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
