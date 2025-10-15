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
          "check": ["Endpoint"]
        }
      ],
      "colour": 294,
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
          "check": ["Microservice"]
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
      "output": "ExecutionEnvironment"
    },
    {
      "type": "Version",
      "message0": "Version %1",
      "args0": [
        {
          "type": "field_input",
          "name": "versionString",
          "text": "versionString"
        }
      ],
      "colour": 14,
      "output": "Version"
    },
    {
      "type": "RESTOperation",
      "message0": "RESTOperation %1 %2 %3",
      "args0": [
        {"type": "field_input","name": "name","text": "name"},
        {"type": "field_input","name": "subPath","text": "subPath"},
        {"type": "field_input","name": "restVerb","text": "restVerb"}
      ],
      "colour": 97,
      "output": "RESTOperation"
    },
    {
      "type": "Endpoint",
      "message0": "Endpoint %1 %2 %3 %4",
      "args0": [
        {"type": "field_input","name": "ipAddress","text": "ipAddress"},
        {"type": "field_input","name": "port","text": "port"},
        {"type": "field_input","name": "url","text": "url"},
        {"type": "field_input","name": "protocol","text": "protocol"}
      ],
      "colour": 268,
      "output": "Endpoint"
    },
    {
      "type": "MicroserviceType",
      "message0": "MicroserviceType %1 Containments %2 %3",
      "args0": [
        {"type": "field_input","name": "identifier","text": "identifier"},
        {"type": "input_statement","name": "REST_OPS","check": ["RESTOperation"]},
        {"type": "input_statement","name": "VERSIONS","check": ["Version"]}
      ],
      "colour": 195,
      "previousStatement": null,
      "nextStatement": null
    },
    {
      "type": "MicroserviceRepository",
      "message0": "MicroserviceRepository Containments %1",
      "args0": [
        {"type": "input_statement","name": "MICROSERVICE_TYPES","check": ["MicroserviceType"]}
      ],
      "colour": 68,
      "previousStatement": null,
      "nextStatement": null
    },
    {
      "type": "Host",
      "message0": "Host %1 Containments %2",
      "args0": [
        {"type": "field_input","name": "hostname","text": "hostname"},
        {"type": "input_statement","name": "CONTAINERS","check": ["Container"]}
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
      "output": "Container"
    },
    {
      "type": "VirtualHost",
      "message0": "VirtualHost",
      "args0": [],
      "colour": 325,
      "output": "VirtualHost"
    },
    {
      "type": "PhysicalHost",
      "message0": "PhysicalHost Containments %1",
      "args0": [
        {"type": "input_statement","name": "VIRTUAL_HOSTS","check": ["VirtualHost"]}
      ],
      "colour": 293,
      "previousStatement": null,
      "nextStatement": null
    },
    {
      "type": "InfrastructureModel",
      "message0": "InfrastructureModel Containments %1",
      "args0": [
        {"type": "input_statement","name": "HOSTS","check": ["PhysicalHost"]}
      ],
      "colour": 281,
      "previousStatement": null,
      "nextStatement": null
    },
    {
      "type": "DependencyModel",
      "message0": "DependencyModel Containments %1",
      "args0": [
        {"type": "input_statement","name": "OP_DEPS","check": ["OperationToOperationCallingDependency"]}
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
      "output": "OperationToOperationCallingDependency"
    },
    {
      "type": "TimeSeries",
      "message0": "TimeSeries Containments %1",
      "args0": [
        {"type": "input_statement","name": "TS_POINTS","check": ["TimeSeriesPoint"]}
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
      "output": "TimeSeriesPoint"
    },
    {
      "type": "MicroserviceOperationTimeSeriesPoint",
      "message0": "MicroserviceOperationTimeSeriesPoint",
      "args0": [],
      "colour": 309,
      "output": "MicroserviceOperationTimeSeriesPoint"
    },
    {
      "type": "MetaModelStructure",
      "message0": "MetaModelStructure Containments %1 %2 %3 %4 %5",
      "args0": [
        {"type": "input_statement","name": "INFRASTRUCTURE","check": ["InfrastructureModel"]},
        {"type": "input_statement","name": "CONFIGS","check": ["Configuration"]},
        {"type": "input_statement","name": "DEPENDENCIES","check": ["DependencyModel"]},
        {"type": "input_statement","name": "TIMESERIES","check": ["TimeSeries"]},
        {"type": "input_statement","name": "REPOSITORY","check": ["MicroserviceRepository"]}
      ],
      "colour": 331,
      "previousStatement": null,
      "nextStatement": null
    }
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
      {"kind": "block", "type": "MetaModelStructure"}
    ]
  };  