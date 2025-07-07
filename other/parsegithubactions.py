from model import print_meta_model_details, print_metamodel_details, print_metamodel_instance
from yamlparser import get_pretty_yaml


def parseTool(tool,metamodel):
    Tool = metamodel.getEClassifier('Tool')
    myTool = Tool()

    myTool.eSet("Name", tool)

    return myTool

def parseWhen(when,metamodel):
    When = metamodel.getEClassifier('When')
    myWhen = When()

    '''push = when.get("push","")

    if push != "":
        myWhen.eSet("Trigger", get_pretty_yaml(push))'''
    
    myWhen.eSet("Trigger", get_pretty_yaml({when[0]:when[1]}))

    return myWhen

def parseEnvironment(environemnt,metamodel):
    Environemnt = metamodel.getEClassifier('Environment')
    
    environemnts = list()

    for currenv in environemnt.items():

        myEnvironemnt = Environemnt()

        myEnvironemnt.eSet("Key", str(currenv[0]))
        myEnvironemnt.eSet("Value", str(currenv[1]))

        environemnts.append(myEnvironemnt)

    return environemnts

def hasif(command):
    return command.get("if","") != ""

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

    name = command.get("name","")

    if name != "":
        myCommand.eSet("Name", name)
    
    def set_tool(tool):
        Tool = metamodel.getEClassifier('Tool')
        myTool = Tool()
        myTool.eSet("Name", tool)

        myCommand.eSet("tool",myTool)

    tool = command.get("uses","")

    if tool != "":
        set_tool(tool)

    if tool == "":
        tool = command.get("run","")
        if tool != "":
            set_tool(tool)

    def set_parameter(parameter):
        Parameter = metamodel.getEClassifier('Parameter')
        myParameter = Parameter()
        myParameter.eSet("Parameter", get_pretty_yaml(parameter))
            
        myCommand.parameter.append(myParameter)

    parameter = command.get("with","")
 
    if parameter != "":
       
        set_parameter(parameter)
 

    if parameter == "":
        parameter = command.get("env","")

        if parameter != "":
            set_parameter(parameter)
    
    if previous != None:
        myCommand.depends.extend([previous])

    return myCommand

def parseJobCommandsAndIfs(commands,metamodel):
    mycommands = list()
    myifs = list()

    previous = None

    for command in commands:
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
    parse_tem("defaults")
    

    return tools

def parseJob(job,metamodel,pastjobs):
    Job = metamodel.getEClassifier('Job')
    myJob = Job()

    myJob.eSet("Name", job[0])


    content = job[1]

    permission = content.get("permissions","")

    if permission != "":
        permissions = parsePermissions(permission,metamodel)

        for currper in permissions:
            myJob.permission.append(currper)

    secrets = content.get("secrets","")

    if secrets != "":
        Environemnt = metamodel.getEClassifier('Environment')
        myEnvironemnt = Environemnt()

        myEnvironemnt.eSet("Key", "secrets")
        myEnvironemnt.eSet("Value", str(secrets))

        myJob.environment.append(myEnvironemnt)


    env = content.get("env","")
    
    if env != "":
        envs = parseEnvironment(env,metamodel)
    
        for currenv in envs:
            myJob.environment.append(currenv)

    needs = content.get("needs","")

    if needs != "":
        pastjobsneeds = list(filter(lambda x: x.Name == needs,pastjobs))
        myJob.depends.extend(pastjobsneeds)
        
    jobIf = content.get("if","")

    
        
    tools = parseJobTools(content,metamodel)

    for tool in tools:
        myJob.tool.append(tool)

    commands = content.get("steps","")

    if commands != "" and jobIf == "":
        mycommands,myifs = parseJobCommandsAndIfs(commands,metamodel)
        for mycommand in mycommands:
            myJob.command.append(mycommand)
        for myif in myifs:
            myJob.ifthenelse.append(myif)

    
    if commands != "" and jobIf != "":

        mycommands,myifs = parseJobCommandsAndIfs(commands,metamodel)
        IfThenElse = metamodel.getEClassifier('IfThenElse')
        If = metamodel.getEClassifier('If')

        for mycommand in mycommands:
            myIfThenElse = IfThenElse()
            myIfThenElse.eSet("Condition",  jobIf)

            myIf = If()
            myIf.command.append(mycommand)
    
            myIfThenElse.eSet("true",myIf)

            myJob.ifthenelse.append(myIfThenElse)

        for myif in myifs:
            myIfThenElse = IfThenElse()
            myIfThenElse.eSet("Condition",  jobIf)

            myIf = If()
            myIf.ifthenelse.append(myif)
    
            myIfThenElse.eSet("true",myIf)

            myJob.ifthenelse.append(myIfThenElse)

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

    tools = parseJobTools(yamlfile,metamodel)

    for tool in tools:
        myPipeline.tool.append(tool)

    when = yamlfile.get(True,"")

    if when != "":
        if isinstance(when, str):
            myWhen = parseWhen((when,None),metamodel)

            myPipeline.when.append(myWhen)

        elif isinstance(when,list):
            for w in when:
                myWhen = parseWhen((w,None),metamodel)

                myPipeline.when.append(myWhen)
        else:
            for w in when.items():
                myWhen = parseWhen(w,metamodel)

                myPipeline.when.append(myWhen)

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
    jobs = yamlfile.get("jobs","")
    
    if jobs != "":
        alljobs = parseJobs(jobs,metamodel)
        for currjob in alljobs:
            myPipeline.job.append(currjob)

    return myPipeline

def parse_github_actions(yamlfile,metamodel):
    metamodel = metamodel.contents[0]

    myPipeline = parsePipeline(yamlfile,metamodel)
    
    return myPipeline
