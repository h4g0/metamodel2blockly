"use client"
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import Script from "next/script"
import { ECORE_BLOCKS, ECORE_TOOLBOX } from "./ecore-blocks"
import { EcoreGenerator } from "./blockly-code-generator"

// Define props interface
interface BlocklyWorkspaceProps {
  onChange?: (xml: string, code: string) => void
  initialXml?: string
  onWorkspaceLoaded?: (workspace: any) => void
}

// Define ref interface for exposed methods
export interface BlocklyWorkspaceRef {
  serializeWorkspace: () => string
  loadWorkspace: (jsonData: string) => void
  clearWorkspace: () => void
}

// Default pipeline configuration JSON
const DEFAULT_PIPELINE_JSON = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: "ecore_pipeline",
        id: "z[Ib{|:nKA_X-((s~Y7y",
        x: 75,
        y: 24,
        fields: {
          ATTR_NAME: "default_pipeline",
          ATTR_CONCURRENT: false,
        },
        inputs: {
          CONT_WHEN: {
            block: {
              type: "ecore_when",
              id: "DTaRHa_sIjpJ}I/yuaf3",
              fields: {
                ATTR_NAME: "on_workflow_dispatch",
                ATTR_TRIGGER: "workflow_dispatch",
                ATTR_TIMER: "",
              },
            },
          },
          CONT_JOB: {
            block: {
              type: "ecore_job",
              id: "g9%$Xvx-66h,Oh/PL!Ki",
              fields: {
                ATTR_NAME: "build",
                ATTR_ALLOWFAILURE: false,
                ATTR_DESCRIPTION: "Build and test the application",
              },
              inputs: {
                CONT_TOOL: {
                  block: {
                    type: "ecore_tool",
                    id: "fU!MZF|^*4yx9Zdg+SXA",
                    fields: {
                      ATTR_NAME: "ubuntu-latest",
                    },
                  },
                },
                CONT_COMMAND: {
                  block: {
                    type: "ecore_command",
                    id: "x~rd@7X]hL(FQntuYO:`",
                    fields: {
                      ATTR_NAME: "setup",
                    },
                    inputs: {
                      CONT_TOOL: {
                        block: {
                          type: "ecore_tool_value",
                          id: "R(v=JXNbA4YBt?wxmnPb",
                          fields: {
                            ATTR_NAME: "npm",
                          },
                        },
                      },
                      CONT_PARAMETER: {
                        block: {
                          type: "ecore_parameter",
                          id: "w(*oscU@^g#t^yE5@C5V",
                          fields: {
                            ATTR_PARAMETER: "install",
                          },
                          next: {
                            block: {
                              type: "ecore_parameter",
                              id: "N~m$CM,!TVZ+P.4Ai;aL",
                              fields: {
                                ATTR_PARAMETER: "install --ci",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
  },
}

// Add these constants at the top of the file, after the imports:
// Constants for localStorage keys
const STORAGE_KEY_WORKSPACE = "visualci_workspace"

// This component will be loaded dynamically to avoid SSR issues with Blockly
const BlocklyWorkspace = forwardRef<BlocklyWorkspaceRef, BlocklyWorkspaceProps>(
  ({ onChange, initialXml, onWorkspaceLoaded }, ref) => {
    const blocklyDiv = useRef<HTMLDivElement>(null)
    const [workspace, setWorkspace] = useState<any>(null)
    const [blocklyLoaded, setBlocklyLoaded] = useState(false)

    // Function to load the default pipeline structure
    const loadDefaultPipeline = (workspace: any) => {
      try {
        // Clear the workspace first
        workspace.clear()

        // Load the default pipeline JSON
        window.Blockly.serialization.workspaces.load(DEFAULT_PIPELINE_JSON, workspace)

        // Center the workspace on the pipeline block
        const blocks = workspace.getTopBlocks(false)
        if (blocks.length > 0) {
          workspace.centerOnBlock(blocks[0].id)
        }

        return blocks[0] // Return the pipeline block
      } catch (error) {
        console.error("Error loading default pipeline:", error)

        // Fallback to creating a simple pipeline if loading fails
        const pipelineBlock = workspace.newBlock("ecore_pipeline")
        pipelineBlock.setFieldValue("default_pipeline", "ATTR_NAME")
        pipelineBlock.initSvg()
        pipelineBlock.render()
        pipelineBlock.moveBy(50, 50)

        return pipelineBlock
      }
    }

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      serializeWorkspace: () => {
        if (!workspace) return ""
        try {
          // Serialize the workspace to JSON
          const json = window.Blockly.serialization.workspaces.save(workspace)
          const jsonString = JSON.stringify(json, null, 2)
          // Also save directly to localStorage to ensure it's always saved
          localStorage.setItem(STORAGE_KEY_WORKSPACE, jsonString)
          return jsonString
        } catch (error) {
          console.error("Error serializing workspace:", error)
          return ""
        }
      },
      loadWorkspace: (jsonData: string) => {
        if (!workspace) return
        try {
          console.log("Loading workspace from JSON data")
          // Clear the workspace first
          workspace.clear()

          // Parse the JSON data
          const json = JSON.parse(jsonData)

          // Load the workspace from JSON
          window.Blockly.serialization.workspaces.load(json, workspace)

          // Center the workspace view
          const blocks = workspace.getTopBlocks(false)
          if (blocks.length > 0) {
            workspace.centerOnBlock(blocks[0].id)
          }

          // Trigger onChange to update the generated code
          if (onChange) {
            const xml = window.Blockly.Xml.workspaceToDom(workspace)
            const xmlText = window.Blockly.Xml.domToText(xml)
            const code = EcoreGenerator.generateCode(workspace)
            onChange(xmlText, code)
          }
        } catch (error) {
          console.error("Error loading workspace from JSON:", error)
          alert("Error loading workspace: Invalid JSON format or incompatible workspace data")
        }
      },
      clearWorkspace: () => {
        if (!workspace) return

        // Just clear the workspace completely without loading the default pipeline
        workspace.clear()

        // Trigger onChange to update the generated code
        if (onChange) {
          const xml = window.Blockly.Xml.workspaceToDom(workspace)
          const xmlText = window.Blockly.Xml.domToText(xml)
          const code = EcoreGenerator.generateCode(workspace)
          onChange(xmlText, code)
        }
      },
    }))

    // Handle script load event
    const handleScriptLoad = () => {
      console.log("Blockly script loaded")
      setBlocklyLoaded(true)
    }

    // Initialize Blockly after the script has loaded
    const initBlockly = () => {
      if (!blocklyDiv.current || !window.Blockly) return

      try {
        console.log("Initializing Blockly...", window.Blockly)

        // Register custom blocks
        ECORE_BLOCKS.forEach((block) => {
          window.Blockly.Blocks[block.type] = {
            init: function () {
              this.jsonInit(block)
            },
          }
        })

        // Create workspace with responsive settings
        const newWorkspace = window.Blockly.inject(blocklyDiv.current, {
          toolbox: ECORE_TOOLBOX,
          grid: {
            spacing: 20,
            length: 3,
            colour: "#ccc",
            snap: true,
          },
          zoom: {
            controls: true,
            wheel: true,
            startScale: window.innerWidth < 768 ? 0.7 : 1.0, // Smaller scale on mobile
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
          },
          trashcan: true,
          scrollbars: true,
          sounds: false, // Disable sounds for better mobile experience
          move: {
            scrollbars: true,
            drag: true,
            wheel: true,
          },
          // Enable strict type checking
          typeCheck: true,
        })

        // Add automatic block creation for job and command blocks
        newWorkspace.addChangeListener((event: any) => {
          // Only handle block creation events
          if (event.type === window.Blockly.Events.BLOCK_CREATE) {
            // Get the created block
            const block = newWorkspace.getBlockById(event.blockId)

            if (block) {
              // Check if this is a newly created block or a copied block
              // If it's a copied block, it will already have connections
              const isNewlyCreated = !event.ids || event.ids.length <= 1

              // If a job block is created, automatically add a tool and command block to it
              if (block.type === "ecore_job") {
                // Add a tool block to the job if the tool input is empty
                if (!block.getInputTargetBlock("CONT_TOOL")) {
                  // Create a job tool block
                  const jobToolBlock = newWorkspace.newBlock("ecore_tool")
                  jobToolBlock.initSvg()
                  jobToolBlock.render()

                  // Set a default name for the job tool
                  jobToolBlock.setFieldValue("ubuntu-latest", "ATTR_NAME")

                  // Connect the tool block to the job block
                  const jobToolConnection = block.getInput("CONT_TOOL").connection
                  const jobToolBlockConnection = jobToolBlock.previousConnection
                  jobToolConnection.connect(jobToolBlockConnection)
                }

                // Check if the command input is empty
                if (!block.getInputTargetBlock("CONT_COMMAND")) {
                  // Create a command block
                  const commandBlock = newWorkspace.newBlock("ecore_command")
                  commandBlock.initSvg()
                  commandBlock.render()

                  // Set a default name for the command
                  commandBlock.setFieldValue("default_command", "ATTR_NAME")

                  // Connect the command block to the job block
                  const commandConnection = block.getInput("CONT_COMMAND").connection
                  const commandBlockConnection = commandBlock.previousConnection
                  commandConnection.connect(commandBlockConnection)

                  // Create a command tool block for the command
                  const toolBlock = newWorkspace.newBlock("ecore_tool_value")
                  toolBlock.initSvg()
                  toolBlock.render()

                  // Set a default name for the command tool
                  toolBlock.setFieldValue("npm", "ATTR_NAME")

                  // Connect the tool block to the command block
                  const toolConnection = commandBlock.getInput("CONT_TOOL").connection
                  const toolBlockConnection = toolBlock.outputConnection
                  toolConnection.connect(toolBlockConnection)

                  // Create a parameter block for the command
                  const parameterBlock = newWorkspace.newBlock("ecore_parameter")
                  parameterBlock.initSvg()
                  parameterBlock.render()

                  // Set a default value for the parameter
                  parameterBlock.setFieldValue("install", "ATTR_PARAMETER")

                  // Connect the parameter block to the command block
                  const parameterConnection = commandBlock.getInput("CONT_PARAMETER").connection
                  const parameterBlockConnection = parameterBlock.previousConnection
                  parameterConnection.connect(parameterBlockConnection)
                }
              }
              // If a command block is created manually, automatically add a tool block to it
              else if (block.type === "ecore_command" && isNewlyCreated) {
                // Only add child blocks if the command doesn't already have them
                // This prevents duplicate blocks when copying/pasting

                // Check if the tool input is empty
                if (!block.getInputTargetBlock("CONT_TOOL")) {
                  // Create a command tool block
                  const toolBlock = newWorkspace.newBlock("ecore_tool_value")
                  toolBlock.initSvg()
                  toolBlock.render()

                  // Set a default name for the command tool
                  toolBlock.setFieldValue("npm", "ATTR_NAME")

                  // Connect the tool block to the command block
                  const commandBlock = block // Assign the block to commandBlock
                  const toolConnection = commandBlock.getInput("CONT_TOOL").connection
                  const toolBlockConnection = toolBlock.outputConnection
                  toolConnection.connect(toolBlockConnection)
                }

                // Check if the parameter input is empty
                if (!block.getInputTargetBlock("CONT_PARAMETER")) {
                  // Create a parameter block
                  const parameterBlock = newWorkspace.newBlock("ecore_parameter")
                  parameterBlock.initSvg()
                  parameterBlock.render()

                  // Set a default value for the parameter
                  parameterBlock.setFieldValue("install", "ATTR_PARAMETER")

                  // Connect the parameter block to the command block
                  const parameterConnection = block.getInput("CONT_PARAMETER").connection
                  const parameterBlockConnection = parameterBlock.previousConnection
                  parameterConnection.connect(parameterBlockConnection)
                }
              }
            }
          }
        })

        // Check for saved workspace in localStorage first
        const savedWorkspace = localStorage.getItem(STORAGE_KEY_WORKSPACE)
        if (savedWorkspace) {
          try {
            console.log("Found saved workspace in localStorage, loading it...")
            // Parse and load the saved workspace
            const json = JSON.parse(savedWorkspace)
            window.Blockly.serialization.workspaces.load(json, newWorkspace)

            // Center the workspace on the first block
            const blocks = newWorkspace.getTopBlocks(false)
            if (blocks.length > 0) {
              newWorkspace.centerOnBlock(blocks[0].id)
            }
          } catch (error) {
            console.error("Error loading workspace from localStorage:", error)
            // If there's an error loading saved workspace, load the default pipeline
            loadDefaultPipeline(newWorkspace)
          }
        } else if (initialXml) {
          // If no saved workspace but initialXml is provided, load that
          const xml = window.Blockly.Xml.textToDom(initialXml)
          window.Blockly.Xml.domToWorkspace(xml, newWorkspace)
        } else {
          // If no saved workspace or initialXml, load the default pipeline
          console.log("No saved workspace found, loading default pipeline")
          loadDefaultPipeline(newWorkspace)
        }

        // Initialize the code generator
        if (window.Blockly.Ecore === undefined) {
          EcoreGenerator.init()
        }

        // Set up change listener with debounce to prevent rapid updates
        let changeTimeout: NodeJS.Timeout | null = null
        if (onChange) {
          newWorkspace.addChangeListener((event: any) => {
            // Only process events that change the workspace content
            if (
              event.type === window.Blockly.Events.BLOCK_MOVE ||
              event.type === window.Blockly.Events.BLOCK_CHANGE ||
              event.type === window.Blockly.Events.BLOCK_CREATE ||
              event.type === window.Blockly.Events.BLOCK_DELETE
            ) {
              // Clear previous timeout
              if (changeTimeout) {
                clearTimeout(changeTimeout)
              }

              // Set new timeout to debounce rapid changes
              changeTimeout = setTimeout(() => {
                const xml = window.Blockly.Xml.workspaceToDom(newWorkspace)
                const xmlText = window.Blockly.Xml.domToText(xml)

                // Generate code using our custom generator
                const code = EcoreGenerator.generateCode(newWorkspace)

                onChange(xmlText, code)
              }, 300)
            }
          })
        }

        // Handle window resize
        const handleResize = () => {
          window.Blockly.svgResize(newWorkspace)
        }

        window.addEventListener("resize", handleResize)

        // Store workspace for cleanup
        setWorkspace(newWorkspace)

        // Notify parent that workspace is loaded
        if (onWorkspaceLoaded) {
          onWorkspaceLoaded(newWorkspace)
        }

        // Return cleanup function
        return () => {
          window.removeEventListener("resize", handleResize)
          if (changeTimeout) {
            clearTimeout(changeTimeout)
          }
          if (newWorkspace) {
            newWorkspace.dispose()
          }
        }
      } catch (error) {
        console.error("Error initializing Blockly:", error)
      }
    }

    // Initialize Blockly when the component mounts and the script is loaded
    useEffect(() => {
      if (blocklyLoaded && blocklyDiv.current && !workspace) {
        initBlockly()
      }
    }, [blocklyLoaded, blocklyDiv, workspace, initialXml, onChange, onWorkspaceLoaded])

    return (
      <>
        <Script
          src="https://cdn.jsdelivr.net/npm/blockly@11.2.2/blockly.min.js"
          onLoad={handleScriptLoad}
          onError={(e) => console.error("Error loading Blockly script:", e)}
          strategy="afterInteractive"
        />
        <div ref={blocklyDiv} className="w-full h-full min-h-[300px] sm:min-h-[400px]" />
      </>
    )
  },
)

BlocklyWorkspace.displayName = "BlocklyWorkspace"

export default BlocklyWorkspace

// Add Blockly to the window type
declare global {
  interface Window {
    Blockly: any
  }
}
