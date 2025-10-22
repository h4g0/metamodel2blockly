"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Layers,
  Copy,
  FileJson,
  GitBranch,
  ExternalLink,
  Terminal,
  Download,
  Upload,
} from "lucide-react"
import dynamic from "next/dynamic"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { deployAndRunGitHubActions, validateGitHubCredentials } from "./github-actions-service"
import type { BlocklyWorkspaceRef } from "./blockly-workspace"

// Add these constants at the top of the file, after the existing imports and before the BlocklyWorkspace component

// Constants for localStorage keys
const STORAGE_KEY_WORKSPACE = "visualci_workspace"
const STORAGE_KEY_GENERATED_CODE = "visualci_generated_code"

// Dynamically import the Blockly component to avoid SSR issues
const BlocklyWorkspace = dynamic(
  () =>
    import("./blockly-workspace").catch((err) => {
      console.error("Failed to load BlocklyWorkspace:", err)
      return () => <BlocklyFallback />
    }),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center bg-slate-100">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400 animate-spin mb-2" />
          <p className="text-slate-500 text-xs sm:text-sm">Loading visual editor...</p>
        </div>
      </div>
    ),
  },
)

// Fallback component for when Blockly can't be loaded
const BlocklyFallback = () => {
  const [code, setCode] = useState(`# Example Pipeline YAML
name: default_pipeline
concurrent: false

on:
  push:
    branches: [main]

jobs:
  build:
    description: "Build the application"
    continue-on-error: false
    steps:
      - name: npm_install
        with:
          args: "--production"
      
      - name: npm_build
  
  test:
    description: "Run tests"
    continue-on-error: true
    steps:
      - name: npm_test
  
  deploy:
    description: "Deploy to production"
    continue-on-error: false
    steps:
      - name: npm_deploy
    needs: [build, test]

env:
  NODE_ENV: "production"`)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 sm:px-4 sm:py-3 rounded-md flex items-center shadow-sm mb-2 sm:mb-4 text-xs sm:text-sm">
        <AlertCircle className="h-4 w-4 mr-1.5 sm:mr-2 flex-shrink-0 text-yellow-500" />
        <span>Visual editor could not be loaded. Using text editor instead.</span>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-full flex-grow min-h-[200px] p-2 sm:p-4 font-mono text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-md resize-none"
        spellCheck="false"
      />
    </div>
  )
}

/**
 * Extracts the pipeline name from YAML content
 * @param yamlContent The YAML content to parse
 * @returns The pipeline name or "pipeline" if not found
 */
function extractPipelineName(yamlContent: string): string {
  const nameMatch = yamlContent.match(/name:\s*([^\n]+)/)
  if (nameMatch && nameMatch[1]) {
    return nameMatch[1]
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .toLowerCase()
  }
  return "pipeline"
}

/**
 * Generates a random 5-digit number
 * @returns A string containing a random 5-digit number
 */
function generateRandomId(): string {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

export default function VisualCICDEnvironment() {
  const [activeTab, setActiveTab] = useState("results")
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
  const [generatedCode, setGeneratedCode] = useState<string>(`# Generated CI/CD Pipeline YAML
# This YAML is compatible with GitHub Actions

name: default_pipeline
concurrent: false

on:
  push:
    branches: [main]

jobs:
  build:
    description: "Build the application"
    continue-on-error: false
    steps:
      - name: npm_install
        with:
          args: "--production"
      
      - name: npm_build

env:
  NODE_ENV: "production"`)
  const [copySuccess, setCopySuccess] = useState(false)
  const [copyResultsSuccess, setCopyResultsSuccess] = useState(false)

  const [showConnectModal, setShowConnectModal] = useState(false)
  const [repository, setRepository] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [runUrl, setRunUrl] = useState<string | null>(null)

  const [validationError, setValidationError] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  // File upload related state
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Reference to the BlocklyWorkspace component
  const blocklyWorkspaceRef = useRef<BlocklyWorkspaceRef>(null)

  // Add a new state for validation errors
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Add state for error details dialog
  const [showErrorDetailsModal, setShowErrorDetailsModal] = useState(false)

  // Add a useEffect hook to load saved state when the component mounts
  // Add this right after all the useState declarations, before the handleBlocklyChange function
  useEffect(() => {
    // Load saved state from localStorage when the component mounts
    const loadSavedState = () => {
      try {
        // Load generated code
        const savedCode = localStorage.getItem(STORAGE_KEY_GENERATED_CODE)
        if (savedCode) {
          console.log("Loading saved code from localStorage")
          setGeneratedCode(savedCode)

          // Validate the loaded code
          const errors = validatePipelineStructure(savedCode)
          setValidationErrors(errors)

          // Update message type based on validation results
          if (errors.length > 0) {
            setMessageType("error")
          } else {
            setMessageType("success")
          }
        }
      } catch (error) {
        console.error("Error loading saved state:", error)
      }
    }

    loadSavedState()
  }, [])

  // Update the handleBlocklyChange function to include validation
  const handleBlocklyChange = (xml: string, code: string) => {
    console.log("Blockly change detected, updating code")
    setGeneratedCode(code)

    // Validate the pipeline structure
    const errors = validatePipelineStructure(code)
    setValidationErrors(errors)

    // Update message type based on validation results
    if (errors.length > 0) {
      setMessageType("error")
    } else {
      setMessageType("success")
    }

    // Save the generated code to localStorage
    localStorage.setItem(STORAGE_KEY_GENERATED_CODE, code)

    // Save the workspace state if we have a reference to it
    if (blocklyWorkspaceRef.current) {
      const workspaceJson = blocklyWorkspaceRef.current.serializeWorkspace()
      if (workspaceJson) {
        localStorage.setItem(STORAGE_KEY_WORKSPACE, workspaceJson)
      }
    }
  }

  // Add a function to load the workspace from localStorage when the BlocklyWorkspace is ready
  // Add this after the handleBlocklyChange function
  const handleWorkspaceLoaded = (workspace: any) => {
    console.log("Workspace loaded callback triggered")
    // The workspace is now loaded and ready to use
    // The loading of saved workspace is now handled directly in the blockly-workspace.tsx file
    // This callback is just for any additional setup needed after workspace is loaded
  }

  // Add this validation function after the handleBlocklyChange function
  const validatePipelineStructure = (yamlCode: string): string[] => {
    const errors: string[] = []

    // Check if there's an "on:" trigger defined
    const onTriggerRegex = /^on:\s*\n(\s+\w+:|$)/m
    if (!onTriggerRegex.test(yamlCode)) {
      errors.push("Pipeline must define at least one trigger (on:)")
    }

    // Also add this check to detect empty "on:" sections:
    const emptyOnRegex = /^on:\s*\n(?!\s+\w+:)/m
    if (emptyOnRegex.test(yamlCode)) {
      errors.push("Pipeline must define at least one trigger in the 'on:' section")
    }

    // Check if there are any jobs defined
    if (!yamlCode.includes("jobs:")) {
      errors.push("Pipeline must contain at least one job")
      return errors
    }

    // Extract jobs section - improved regex to better handle the jobs section
    const jobsMatch = yamlCode.match(/jobs:\s*\n([\s\S]*?)(?:\n\w+:|$)/)
    if (!jobsMatch || !jobsMatch[1].trim()) {
      errors.push("Pipeline must contain at least one job")
      return errors
    }

    // Get the jobs content
    const jobsContent = jobsMatch[1]

    // Extract job names using regex
    const jobNameRegex = /^\s{2}([a-zA-Z0-9_-]+):/gm
    const jobMatches = [...jobsContent.matchAll(jobNameRegex)]

    if (jobMatches.length === 0) {
      errors.push("Pipeline must contain at least one job")
      return errors
    }

    // Get all job names for dependency validation
    const jobNames = jobMatches.map((match) => match[1])
    const uniqueJobNames = new Set(jobNames)

    // Check for duplicate job names
    if (jobNames.length !== uniqueJobNames.size) {
      // Find the duplicate job names
      const duplicates = jobNames.filter((name, index) => jobNames.indexOf(name) !== index)
      const uniqueDuplicates = [...new Set(duplicates)]
      errors.push(`Pipeline contains duplicate job names: ${uniqueDuplicates.join(", ")}`)
    }

    // Check each job for commands, tools, and valid dependencies
    for (const jobMatch of jobMatches) {
      const jobName = jobMatch[1]
      const jobStartIndex = jobMatch.index || 0

      // Find the end of this job (start of next job or end of jobs section)
      let jobEndIndex = jobsContent.length
      const nextJobMatch = jobsContent.slice(jobStartIndex + jobMatch[0].length).match(/^\s{2}[a-zA-Z0-9_-]+:/m)
      if (nextJobMatch && nextJobMatch.index) {
        jobEndIndex = jobStartIndex + jobMatch[0].length + nextJobMatch.index
      }

      // Extract the job content
      const jobContent = jobsContent.slice(jobStartIndex, jobEndIndex)

      // Check if job has steps (commands)
      if (!jobContent.includes("steps:")) {
        errors.push(`Job "${jobName}" must contain at least one command`)
        continue
      }

      // Check if job has a runs-on (tool)
      if (!jobContent.includes("runs-on:")) {
        errors.push(`Job "${jobName}" must specify a job tool (runs-on)`)
      }

      // Check if job has valid dependencies
      const needsMatch = jobContent.match(/needs:\s*\[(.*?)\]/s)
      if (needsMatch && needsMatch[1]) {
        // Extract job names from the needs section
        const neededJobs = needsMatch[1]
          .split(",")
          .map((job) => job.trim().replace(/"/g, "").replace(/'/g, ""))
          .filter((job) => job.length > 0)

        // Check if each needed job exists
        for (const neededJob of neededJobs) {
          if (!jobNames.includes(neededJob)) {
            errors.push(`Job "${jobName}" depends on non-existent job "${neededJob}"`)
          }
        }
      }

      // Check if steps contain commands with names
      // This is a more lenient check that looks for "- name:" patterns in the steps section
      const stepsSection = jobContent.match(/steps:\s*\n([\s\S]*?)(?:\n\s{4}\w+:|$)/)

      if (!stepsSection || !stepsSection[1].trim()) {
        errors.push(`Job "${jobName}" must contain at least one command in steps`)
      } else {
        // Look for any "- name:" pattern in the steps section
        const hasNamedCommand = /\s+-\s+name:/.test(stepsSection[1])

        if (!hasNamedCommand) {
          errors.push(`Job "${jobName}" must contain at least one command with a name`)
        } else {
          // Check each step for a tool (uses or run)
          const stepContents = stepsSection[1].split(/\s+-\s+name:/).slice(1)

          for (let i = 0; i < stepContents.length; i++) {
            const stepContent = stepContents[i]
            // Extract the step name (first line up to the newline)
            const stepNameMatch = stepContent.match(/([^\n]+)/)
            const stepName = stepNameMatch ? stepNameMatch[1].trim() : `step ${i + 1}`

            // Check if the step has either "uses:" or "run:"
            if (!stepContent.includes("uses:") && !stepContent.includes("run:")) {
              errors.push(`Command "${stepName}" in job "${jobName}" must specify a command tool (uses or run)`)
            }
          }
        }
      }
    }

    return errors
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    })
  }

  const handleCopyResults = () => {
    navigator.clipboard.writeText(result.join("\n")).then(() => {
      setCopyResultsSuccess(true)
      setTimeout(() => setCopyResultsSuccess(false), 2000)
    })
  }

  // Handle downloading the workspace as JSON
  const handleDownloadWorkspace = () => {
    if (!blocklyWorkspaceRef.current) return

    const jsonData = blocklyWorkspaceRef.current.serializeWorkspace()
    if (!jsonData) {
      alert("Error: Could not serialize workspace")
      return
    }

    // Extract pipeline name and generate random ID
    const pipelineName = extractPipelineName(generatedCode)
    const randomId = generateRandomId()
    const fileName = `${pipelineName}-${randomId}.json`

    // Create a blob and download link
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 0)
  }

  // Handle file selection for upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0])
    }
  }

  // Update the handleUploadWorkspace function to save to localStorage after loading
  const handleUploadWorkspace = () => {
    if (!uploadedFile || !blocklyWorkspaceRef.current) {
      alert("Please select a file to upload")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string
        if (!jsonData) throw new Error("Could not read file")

        // Load the workspace from JSON
        blocklyWorkspaceRef.current?.loadWorkspace(jsonData)

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY_WORKSPACE, jsonData)

        // Close the modal and reset state
        setShowUploadModal(false)
        setUploadedFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ""

        // Show success message
        setMessageType("success")
      } catch (error) {
        console.error("Error loading workspace:", error)
        alert("Error loading workspace: Invalid file format")
      }
    }
    reader.readAsText(uploadedFile)
  }

  // Find the handleClearWorkspace function and replace it with this updated version
  // that loads the default pipeline instead of clearing the workspace

  // Update the handleClearWorkspace function to load the default pipeline instead of clearing
  const handleClearWorkspace = () => {
    if (confirm("Are you sure you want to reset to the default pipeline? This action cannot be undone.")) {
      // Instead of clearing the workspace, we'll load the default pipeline
      // We can use the DEFAULT_PIPELINE_JSON that's already defined in blockly-workspace.tsx
      const defaultPipelineJson = JSON.stringify({
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
      })

      // Load the default pipeline using the existing loadWorkspace method
      blocklyWorkspaceRef.current?.loadWorkspace(defaultPipelineJson)

      // Update the message type to success since we're starting with a clean slate
      setMessageType("success")
      setValidationErrors([])

      // Save the default workspace to localStorage
      localStorage.setItem(STORAGE_KEY_WORKSPACE, defaultPipelineJson)

      // The generated code will be updated via the onChange callback when the workspace is loaded
    }
  }

  const handleConnect = async () => {
    // Reset validation state
    setValidationError(null)
    setIsValidating(true)

    // Validate credentials format
    const [isValid, errorMessage] = validateGitHubCredentials(apiKey, repository)

    if (!isValid) {
      setValidationError(errorMessage)
      setIsValidating(false)
      return
    }

    try {
      // Test the connection by making a simple API call
      const response = await fetch(`https://api.github.com/repos/${repository}`, {
        headers: {
          Authorization: `token ${apiKey}`,
          Accept: "application/vnd.github.v3+json",
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || `Error ${response.status}: Could not access repository`)
      }

      // If we get here, the connection was successful
      setIsConnected(true)
      setShowConnectModal(false)
      setValidationError(null)
      console.log("Successfully connected to repository:", repository)
    } catch (error: any) {
      setValidationError(`Connection failed: ${error.message}`)
    } finally {
      setIsValidating(false)
    }
  }

  const handleRun = async () => {
    // Don't allow running if there are validation errors
    if (validationErrors.length > 0) {
      setActiveTab("results") // Switch to results tab
      setResult(["❌ Cannot Run Code with validation errors:", ...validationErrors])
      return
    }

    setIsRunning(true)
    setStatus("running")
    setMessageType("success") // Reset message type
    setActiveTab("results") // Switch to results tab
    setRunUrl(null) // Reset run URL

    // Clear previous results
    setResult(["Initializing pipeline..."])

    // Check if the user is trying to run a real pipeline without connecting a repository
    const isAttemptingRealPipeline =
      generatedCode.includes("github") ||
      generatedCode.includes("actions/") ||
      generatedCode.toLowerCase().includes("workflow")

    if (isAttemptingRealPipeline && !isConnected) {
      setResult([
        "❌ Repository connection required",
        "This pipeline appears to use GitHub Actions or workflows that require a connected repository.",
        "Please connect to a GitHub repository using the 'Connect to Repo' button before running this pipeline.",
      ])
      setIsRunning(false)
      setStatus("error")
      setMessageType("error")
      return
    }

    if (isConnected && repository && apiKey) {
      // Use the GitHub Actions integration
      try {
        // Update the UI with progress messages
        const updateResult = (message: string) => {
          setResult((prev) => [...prev, message])
        }

        // Get the Blockly workspace JSON if available
        let workspaceJson = null
        if (blocklyWorkspaceRef.current) {
          workspaceJson = blocklyWorkspaceRef.current.serializeWorkspace()
        }

        // Run the GitHub Actions workflow
        const results = await deployAndRunGitHubActions(
          apiKey,
          repository,
          generatedCode,
          updateResult,
          workspaceJson, // Pass the workspace JSON
        )

        // Extract GitHub run URL if present
        const runUrlLine = results.find((line) => line.includes("View complete run at:"))
        if (runUrlLine) {
          const url = runUrlLine.split("View complete run at: ")[1]
          setRunUrl(url)
        }

        // Set final status based on results
        if (results.some((line) => line.includes("❌"))) {
          setStatus("error")
          setMessageType("error")
        } else {
          setStatus("success")
        }
      } catch (error: any) {
        console.error("Error running GitHub Actions:", error)
        setResult((prev) => [...prev, `❌ Error: ${error.message}`])
        setStatus("error")
        setMessageType("error")
      } finally {
        setIsRunning(false)
      }
    } else {
      // Use the simulated pipeline execution
      const result: string[] = ["Initializing pipeline..."]

      // Parse the generated code to extract job names
      const jobMatches = [...generatedCode.matchAll(/jobs:\s*\n\s*([a-zA-Z0-9_-]+):/g)]
      const jobNames = jobMatches.map((match) => match[1])

      // If no jobs found, use default job names
      const jobs = jobNames.length > 0 ? jobNames : ["build", "test", "deploy"]

      // Function to update the result with a delay
      const updateResult = (message: string, delay: number) => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            result.push(message)
            setResult([...result])
            resolve()
          }, delay)
        })
      }

      // Process each job sequentially
      const processJobs = async () => {
        try {
          await updateResult("Running in simulation mode (no repository connected)", 300)

          for (const job of jobs) {
            await updateResult(`[${job}] Started`, 300)

            // For test job, randomly decide if we should simulate an error
            if (job.toLowerCase().includes("test") && Math.random() > 0.7) {
              await updateResult(`[${job}] Running tests...`, 500)
              await updateResult(`[${job}] ❌ Test failed: Assertion error in integration tests`, 700)
              await updateResult(`❌ Pipeline execution failed.`, 300)
              setIsRunning(false)
              setStatus("error")
              setMessageType("error")
              return
            }

            // Process job steps
            await updateResult(`[${job}] Processing...`, 400)
            await updateResult(`[${job}] Running commands...`, 500)
            await updateResult(`[${job}] Completed successfully`, 600)
          }

          // All jobs completed successfully
          await updateResult(`✅ Pipeline execution completed successfully.`, 300)
          setIsRunning(false)
          setStatus("success")
        } catch (error) {
          console.error("Error in pipeline execution:", error)
          await updateResult(`❌ Pipeline execution failed with error: ${error}`, 300)
          setIsRunning(false)
          setStatus("error")
          setMessageType("error")
        }
      }

      processJobs()
    }
  }

  const [result, setResult] = useState<string[]>(["// Results will appear here after running"])

  const getStatusBadge = () => {
    switch (status) {
      case "idle":
        return (
          <Badge variant="outline" className="ml-2 bg-slate-100">
            <Clock className="h-3 w-3 mr-1" /> Ready
          </Badge>
        )
      case "running":
        return (
          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Running
          </Badge>
        )
      case "success":
        return (
          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Success
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="ml-2 bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" /> Failed
          </Badge>
        )
    }
  }

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-slate-50 m-0 p-0 overflow-hidden">
      {/* Rest of the component remains the same */}
      <header className="bg-white border-b border-slate-200 px-3 py-2 sm:px-4 sm:py-3 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">Visual Environment</h1>
            {getStatusBadge()}
          </div>

          <div className="flex items-center gap-2">
            {messageType === "success" ? (
              <div className="hidden sm:flex items-center bg-blue-50 border border-blue-200 text-blue-800 px-2 py-1 rounded-md text-xs">
                <CheckCircle className="h-3 w-3 mr-1 flex-shrink-0 text-blue-500" />
                <span>All systems operational</span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center bg-red-50 border border-red-200 text-red-800 px-2 py-1 rounded-md text-xs">
                <AlertCircle className="h-3 w-3 mr-1 flex-shrink-0 text-red-500" />
                <span>Configuration has errors</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 px-1 ml-1 text-red-800 hover:text-red-900 hover:bg-red-100"
                  onClick={() => setShowErrorDetailsModal(true)}
                >
                  Details
                </Button>
              </div>
            )}

            <Button
              onClick={handleRun}
              disabled={isRunning}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all text-xs sm:text-sm"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" /> Running
                </>
              ) : (
                <>
                  <Play className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Run Code
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-hidden container mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-1 sm:gap-2 h-full max-h-full">
          {/* Visual Language Editor - 2/3 width */}
          <Card className="xl:col-span-2 flex flex-col shadow-md border-slate-200 overflow-hidden h-[450px] sm:h-[550px] xl:h-full">
            <CardHeader className="bg-white py-2 px-3 sm:py-3 sm:px-4 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-800 flex items-center text-sm sm:text-base font-medium">
                  <Layers className="h-4 w-4 mr-2 text-slate-500" />
                  Visual Environment Definition
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs" onClick={handleDownloadWorkspace}>
                    <Download className="h-3 w-3 mr-1" /> Save
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setShowUploadModal(true)}>
                    <Upload className="h-3 w-3 mr-1" /> Load
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleClearWorkspace}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" /> Reset to Default
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-0 overflow-hidden bg-slate-50">
              <BlocklyWorkspace
                ref={blocklyWorkspaceRef}
                onChange={handleBlocklyChange}
                onWorkspaceLoaded={handleWorkspaceLoaded}
              />
            </CardContent>
          </Card>

          {/* Results Panel - 1/3 width */}
          <Card className="flex flex-col shadow-md border-slate-200 overflow-hidden h-[350px] sm:h-[450px] xl:h-full">
            <CardContent className="flex-grow p-0 m-0 overflow-hidden flex flex-col">
              <Tabs defaultValue="results" className="h-full flex flex-col">
                <TabsList className="flex w-full border-b border-slate-200">
                  <TabsTrigger value="results" className="text-sm w-full">
                    <Terminal className="h-4 w-4 mr-2" />
                    Results
                  </TabsTrigger>
                  <TabsTrigger value="viewCode" className="text-sm w-full">
                    <FileJson className="h-4 w-4 mr-2" />
                    View Code
                  </TabsTrigger>
                </TabsList>
                <div className="flex-grow overflow-auto">
                  <TabsContent value="results" className="h-full p-0 m-0">
                    <div className="h-full overflow-auto bg-slate-900 text-slate-100 p-2 sm:p-4 relative">
                      <Button
                        onClick={handleCopyResults}
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
                      >
                        {copyResultsSuccess ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" /> Copy
                          </>
                        )}
                      </Button>
                      <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap">{result.join("\n")}</pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="viewCode" className="h-full p-0 m-0">
                    <div className="h-full overflow-auto bg-slate-900 text-slate-100 p-2 sm:p-4 relative">
                      <Button
                        onClick={handleCopyCode}
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
                      >
                        {copySuccess ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" /> Copy
                          </>
                        )}
                      </Button>
                      <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap">{generatedCode}</pre>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Connect to Repository Dialog */}
      <Dialog open={showConnectModal} onOpenChange={setShowConnectModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to Repository</DialogTitle>
            <DialogDescription className="pb-2">
              Enter your repository details and API key to connect your pipeline.
            </DialogDescription>
            {validationError && (
              <div className="mt-2 text-sm bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-md">
                <AlertCircle className="h-4 w-4 inline-block mr-1.5 text-red-500" />
                {validationError}
              </div>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="repository" className="text-right">
                Repository
              </Label>
              <Input
                id="repository"
                value={repository}
                onChange={(e) => {
                  setRepository(e.target.value)
                  // Validate on change
                  const [isValid, errorMessage] = validateGitHubCredentials(apiKey, e.target.value)
                  if (!isValid && e.target.value) {
                    setValidationError(errorMessage)
                  } else {
                    setValidationError(null)
                  }
                }}
                placeholder="username/repo"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                API Key
              </Label>
              <div className="col-span-3 flex relative">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value)
                    // Validate on change
                    const [isValid, errorMessage] = validateGitHubCredentials(e.target.value, repository)
                    if (!isValid && e.target.value) {
                      setValidationError(errorMessage)
                    } else {
                      setValidationError(null)
                    }
                  }}
                  placeholder="ghp_xxxxxxxxxxxx"
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye-off"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-eye"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleConnect}
              disabled={!repository || !apiKey || isValidating || validationError}
            >
              {isValidating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Validating...
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Workspace Dialog */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Load Pipeline Configuration</DialogTitle>
            <DialogDescription>Upload a previously saved pipeline configuration file (.json)</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="workspaceFile">Configuration File</Label>
              <Input
                id="workspaceFile"
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
              {uploadedFile && (
                <div className="text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 inline-block mr-1.5" />
                  {uploadedFile.name} selected
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleUploadWorkspace} disabled={!uploadedFile}>
              Load Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Details Dialog */}
      <Dialog open={showErrorDetailsModal} onOpenChange={(open) => setShowErrorDetailsModal(open)}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              Pipeline Configuration Errors
            </DialogTitle>
            <DialogDescription className="pb-2">
              The following issues need to be resolved before running the pipeline:
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-50 border border-red-200 rounded-md p-4 max-h-[60vh] overflow-y-auto">
            <ul className="list-disc pl-5 space-y-2">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-red-800">
                  {error}
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowErrorDetailsModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
