"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Layers,
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
import { validateGitHubCredentials } from "./github-actions-service"
import type { BlocklyWorkspaceRef } from "./blockly-workspace"

// Constants for localStorage keys
const STORAGE_KEY_WORKSPACE = "visualci_workspace"
const STORAGE_KEY_GENERATED_CODE = "visualci_generated_code"

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

  const [showConnectModal, setShowConnectModal] = useState(false)
  const [repository, setRepository] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const [validationError, setValidationError] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  // File upload related state
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Reference to the BlocklyWorkspace component
  const blocklyWorkspaceRef = useRef<BlocklyWorkspaceRef>(null)

  // Load saved code from localStorage when the component mounts
  useEffect(() => {
    const loadSavedState = () => {
      try {
        const savedCode = localStorage.getItem(STORAGE_KEY_GENERATED_CODE)
        if (savedCode) {
          console.log("Loading saved code from localStorage")
          setGeneratedCode(savedCode)
        }
      } catch (error) {
        console.error("Error loading saved state:", error)
      }
    }

    loadSavedState()
  }, [])

  const handleBlocklyChange = (xml: string, code: string) => {
    console.log("Blockly change detected, updating code")
    setGeneratedCode(code)

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

  const handleWorkspaceLoaded = (workspace: any) => {
    console.log("Workspace loaded callback triggered")
    // additional setup if needed
  }

  // Handle downloading the workspace as JSON
  const handleDownloadWorkspace = () => {
    if (!blocklyWorkspaceRef.current) return

    const jsonData = blocklyWorkspaceRef.current.serializeWorkspace()
    if (!jsonData) {
      alert("Error: Could not serialize workspace")
      return
    }

    const pipelineName = extractPipelineName(generatedCode)
    const randomId = generateRandomId()
    const fileName = `${pipelineName}-${randomId}.json`

    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()

    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 0)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0])
    }
  }

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

        blocklyWorkspaceRef.current?.loadWorkspace(jsonData)

        localStorage.setItem(STORAGE_KEY_WORKSPACE, jsonData)

        setShowUploadModal(false)
        setUploadedFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
      } catch (error) {
        console.error("Error loading workspace:", error)
        alert("Error loading workspace: Invalid file format")
      }
    }
    reader.readAsText(uploadedFile)
  }

  const handleClearWorkspace = () => {
    if (confirm("Are you sure you want to reset to the default pipeline? This action cannot be undone.")) {
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

      blocklyWorkspaceRef.current?.loadWorkspace(defaultPipelineJson)

      localStorage.setItem(STORAGE_KEY_WORKSPACE, defaultPipelineJson)
    }
  }

  const handleConnect = async () => {
    setValidationError(null)
    setIsValidating(true)

    const [isValid, errorMessage] = validateGitHubCredentials(apiKey, repository)

    if (!isValid) {
      setValidationError(errorMessage)
      setIsValidating(false)
      return
    }

    try {
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

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-slate-50 m-0 p-0 overflow-hidden">
      <header className="bg-white border-b border-slate-200 px-3 py-2 sm:px-4 sm:py-3 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
              Visual Environment
            </h1>
          </div>

          {/* (Optional) you can add a "Connect" or other buttons here later if needed */}
        </div>
      </header>

      <div className="flex-grow overflow-hidden container mx-auto">
        {/* Full-width program construction / Blockly space */}
        <div className="h-full max-h-full py-1 sm:py-2">
          <Card className="flex flex-col shadow-md border-slate-200 overflow-hidden h-[450px] sm:h-[550px] xl:h-full">
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => setShowUploadModal(true)}
                  >
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
    </div>
  )
}
