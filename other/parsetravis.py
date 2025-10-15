from model import print_meta_model_details, print_metamodel_details, print_metamodel_instance
from yamlparser import get_pretty_yaml
from travisconcepts import keys_tools, keys_when

def parseTool(tool,metamodel):
    Tool = metamodel.getEClassifier('Tool')
    myTool = Tool()

    myTool.eSet("Name", get_pretty_yaml({tool[0]: tool[1]}))

    return myTool

def parseWhen(when,metamodel):
    When = metamodel.getEClassifier('When')
    myWhen = When()

    '''push = when.get("push","")

    if push != "":
        myWhen.eSet("Trigger", get_pretty_yaml(push))'''
    
    if isinstance(when,dict):
        myWhen.eSet("Trigger", get_pretty_yaml(when))
        return myWhen
    
    myWhen.eSet("Trigger", get_pretty_yaml({when[0]:when[1]}))

    return myWhen

def parseEnvironment(environemnt,metamodel):
    Environemnt = metamodel.getEClassifier('Environment')
    
    environemnts = list()

    if isinstance(environemnt,str):
        myEnvironemnt = Environemnt()

        myEnvironemnt.eSet("Key", str(environemnt))
        myEnvironemnt.eSet("Value", "")

        environemnts.append(myEnvironemnt)

        return environemnts

    for currenv in environemnt:

        myEnvironemnt = Environemnt()

        myEnvironemnt.eSet("Key", str(currenv))
        myEnvironemnt.eSet("Value", str(currenv))

        environemnts.append(myEnvironemnt)

    return environemnts

def hasif(command):
    return command[0] == "if"

def parseIF(ifcomand,metamodel,previous=None):

    
    ifcondition = ifcomand.get("if","")

    if ifcondition == "":
        return
    
    IfThenElse = metamodel.getEClassifier('IfThenElse')
    myIfThenElse = IfThenElse()
    myIfThenElse.eSet("Condition",  ifcondition)

    myCommand = parseJobCommand(ifcomand,metamodel,previous)

    If = metamodel.getEClassifier('If')
    myIf = If()
    myIf.command.append(myCommand)
    
    myIfThenElse.eSet("true",myIf)

    return (myIfThenElse,myCommand)

def parseJobCommand(command,metamodel,previous=None):
    Commamnd = metamodel.getEClassifier('Command')

    myCommand = Commamnd() 

    myCommand.eSet("Name", "")

    tool_name = ""

    def set_tool(tool):
        Tool = metamodel.getEClassifier('Tool')
        myTool = Tool()
        myTool.eSet("Name", str(tool))

        myCommand.eSet("tool",myTool)


    def set_parameter(parameter):
        Parameter = metamodel.getEClassifier('Parameter')
        myParameter = Parameter()
        myParameter.eSet("Parameter", parameter)
            
        myCommand.parameter.append(myParameter)

    if isinstance(command,str):
        tool_name = command
        set_tool(tool_name)

    if isinstance(command, tuple):
        set_tool(command[0])
        if isinstance(command[1],str):
            set_parameter(command[1])
        else:
            set_parameter(get_pretty_yaml(command[1]))
    

    
    if previous != None:
        myCommand.depends.extend([previous])

    return myCommand


def parseJobCommandsAndIfs(commands,metamodel):
    mycommands = list()
    myifs = list()

    previous = None

    if isinstance(commands, list):
        for command in commands:
                myCommand = parseJobCommand(command,metamodel,previous)
                mycommands.append(myCommand)
                previous = myCommand

    if isinstance(commands, dict):
        for command in commands.items():
            if hasif(command):
                myIfThenElse,myCommand = parseIF(command,metamodel,previous)
                myifs.append(myIfThenElse)
                previous = myCommand
            else:
                myCommand = parseJobCommand(command,metamodel,previous)
                mycommands.append(myCommand)
                previous = myCommand


    return (mycommands,myifs)

def parseJobTools(job,metamodel):
    tools = []


    runson = job.get("runs-on","")

    if runson != "":
        Tool = metamodel.getEClassifier('Tool')

        myTool = Tool()

        myTool.eSet("Name", str(runson))

        tools.append(myTool)
    
    def parse_tem(term):
    
        strategy = job.get(term,"")

        if strategy != "":
            Tool = metamodel.getEClassifier('Tool')

            myTool = Tool()

            myTool.eSet("Name", get_pretty_yaml({term: strategy}))

            tools.append(myTool)

    parse_tem("strategy")
    parse_tem("container")
    parse_tem("services")

    

    return tools

def parseJob(job,metamodel,pastjobs):
    Job = metamodel.getEClassifier('Job')
    myJob = Job()

    myJob.eSet("Name", job[0])


    content = job[1]
    
    

    mycommands,myifs = parseJobCommandsAndIfs(content,metamodel)

    for mycommand in mycommands:
        myJob.command.append(mycommand)
    for myif in myifs:
        myJob.ifthenelse.append(myif)

    return myJob

def parseJobs(jobs,metamodel):
    myjobs = []
    
    for job in jobs.items():
        myJob = parseJob(job,metamodel,myjobs)
        myjobs.append(myJob)

    return myjobs


def parsePermissions(permission,metamodel):
    Permission = metamodel.getEClassifier('Permission')
    
    permissions = list()

    if isinstance(permission,str):
        permission = {permission: None}
    
    for currentper in permission.items():

        myPermission = Permission()

        myPermission.eSet("Key", str(currentper[0]))
        myPermission.eSet("Value", str(currentper[1]))

        permissions.append(myPermission)

    return permissions

def parsePipeline(yamlfile,metamodel):
    Pipeline = metamodel.getEClassifier('Pipeline')

   
    myPipeline = Pipeline()
    
    if yamlfile == None:
        return Pipeline
    
    name = yamlfile.get("name","")
    myPipeline.eSet("Name", name)

    permission = yamlfile.get("permissions","")

    if permission != "":
        permissions = parsePermissions(permission,metamodel)

        for currper in permissions:
            myPipeline.permission.append(currper)

    concurrency = yamlfile.get("concurrency","")

    if concurrency != "":
        myPipeline.eSet("Concurrent",True)

    for item in yamlfile.items():
        if item[0] in keys_when:

            when = item[1]
            myWhen = parseWhen(when,metamodel)

            myPipeline.when.append(myWhen)

        elif item[0] in keys_tools:
            myTool = parseTool(item,metamodel)

            myPipeline.tool.append(myTool)

        else:
            myJob = parseJob(item,metamodel,[])
            myPipeline.job.append(myJob)

    environment = yamlfile.get("env","")

    if environment != "":
        environments = parseEnvironment(environment,metamodel)

        for currenv in environments:
            myPipeline.environment.append(currenv)
    
    if concurrency != "":
        Environemnt = metamodel.getEClassifier('Environment')
        myEnvirnonment = Environemnt()

        myEnvirnonment.eSet("Key", "concurrency")
        myEnvirnonment.eSet("Value", get_pretty_yaml(concurrency))
        
        myPipeline.environment.append(myEnvirnonment)

    permission = yamlfile.get("permissions","")

    if permission != "":
        permissions = parsePermissions(permission,metamodel)

        for currper in permissions:
            myPipeline.permission.append(currper)
    
    '''jobs = yamlfile.get("jobs","")
    
    if jobs != "":
        alljobs = parseJobs(jobs,metamodel)
        for currjob in alljobs:
            myPipeline.job.append(currjob)'''

    return myPipeline

def parse_travis(yamlfile,metamodel):
    metamodel = metamodel.contents[0]

    myPipeline = parsePipeline(yamlfile,metamodel)
    
    return myPipeline
