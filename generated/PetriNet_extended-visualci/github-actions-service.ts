import axios from "axios"

// Add this validation function at the top of the file, before the deployAndRunGitHubActions function

/**
 * Validates a GitHub API key and repository format
 * @param apiKey GitHub personal access token
 * @param repo Repository in format 'owner/repo'
 * @returns Tuple containing [isValid: boolean, errorMessage: string]
 */
export function validateGitHubCredentials(apiKey: string, repo: string): [boolean, string] {
  // Validate API key
  if (!apiKey || typeof apiKey !== "string") {
    return [false, "API key is required and must be a string"]
  }

  // GitHub Personal Access Tokens are typically 40 characters long
  // Modern fine-grained tokens may be longer
  if (!/^(gh[ps]_|github_pat_)[A-Za-z0-9_-]{10,255}$/.test(apiKey) && !/^[a-zA-Z0-9_-]{36,255}$/.test(apiKey)) {
    return [false, "API key appears to be in an invalid format. Expected a GitHub Personal Access Token"]
  }

  // Validate repository
  if (!repo || typeof repo !== "string") {
    return [false, "Repository is required and must be a string"]
  }

  // Check repository format (owner/repo)
  if (!repo.includes("/")) {
    return [false, "Repository must be in format 'owner/repo'"]
  }

  const [owner, repoName] = repo.split("/")

  // Check owner name
  if (!owner || owner.trim() === "") {
    return [false, "Repository owner name cannot be empty"]
  }

  // GitHub usernames can only contain alphanumeric characters and hyphens, and cannot start with a hyphen
  if (!/^[a-zA-Z0-9][-a-zA-Z0-9._]*$/.test(owner)) {
    return [false, "Repository owner name contains invalid characters"]
  }

  // Check repository name
  if (!repoName || repoName.trim() === "") {
    return [false, "Repository name cannot be empty"]
  }

  // GitHub repository names can contain alphanumeric characters, hyphens, underscores, and periods
  if (!/^[a-zA-Z0-9._-]+$/.test(repoName)) {
    return [false, "Repository name contains invalid characters"]
  }

  // If all checks pass
  return [true, ""]
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

/**
 * Commits a GitHub Actions workflow file and monitors its execution
 * @param apiKey GitHub personal access token
 * @param repo Repository in format 'owner/repo'
 * @param workflowContent Content of the GitHub Actions workflow file as a string
 * @param updateCallback Optional callback function to receive status updates
 * @param blocklyWorkspaceJson Optional content of the Blockly workspace JSON file as a string
 * @returns Promise that resolves to the workflow run results or rejects with an error
 */
export async function deployAndRunGitHubActions(
  apiKey: string,
  repo: string,
  workflowContent: string,
  updateCallback?: (message: string) => void,
  blocklyWorkspaceJson?: string,
): Promise<string[]> {
  // Create an array to store progress messages
  const progressMessages: string[] = ["Initializing GitHub Actions deployment..."]

  // Helper function to add a message and optionally call the callback
  const addMessage = (message: string) => {
    progressMessages.push(message)
    if (updateCallback) {
      updateCallback(message)
    }
    return message
  }

  // Validate inputs
  if (!apiKey || !repo || !workflowContent) {
    throw new Error(addMessage("Missing required parameters: apiKey, repo, or workflowContent"))
  }

  if (!repo.includes("/")) {
    throw new Error(addMessage('Repository must be in format "owner/repo"'))
  }

  // Extract pipeline name and generate random ID
  const pipelineName = extractPipelineName(workflowContent)
  const randomId = generateRandomId()
  const fileBaseName = `${pipelineName}-${randomId}`

  const [owner, repoName] = repo.split("/")
  const baseUrl = `https://api.github.com/repos/${owner}/${repoName}`
  const headers = {
    Authorization: `token ${apiKey}`,
    Accept: "application/vnd.github.v3+json",
  }

  try {
    // Step 1: Get the default branch
    addMessage("Fetching repository information...")
    const repoResponse = await axios.get(baseUrl, { headers })
    const defaultBranch = repoResponse.data.default_branch
    addMessage(`Using default branch: ${defaultBranch}`)

    // Step 2: Get the latest commit SHA on the default branch
    addMessage("Getting latest commit information...")
    const branchResponse = await axios.get(`${baseUrl}/branches/${defaultBranch}`, { headers })
    const latestCommitSha = branchResponse.data.commit.sha
    addMessage(`Latest commit SHA: ${latestCommitSha.substring(0, 7)}`)

    // Step 3: Get the current tree
    const treeResponse = await axios.get(`${baseUrl}/git/trees/${latestCommitSha}`, { headers })
    const baseTreeSha = treeResponse.data.sha

    // Step 4: Create a blob for the workflow file
    addMessage("Creating workflow file...")
    const workflowFileName = `.github/workflows/${fileBaseName}.yml`
    const blobResponse = await axios.post(
      `${baseUrl}/git/blobs`,
      {
        content: Buffer.from(workflowContent).toString("base64"),
        encoding: "base64",
      },
      { headers },
    )
    const blobSha = blobResponse.data.sha

    // Create a blob for the Blockly workspace JSON if provided
    let blocklyBlobSha = null
    if (blocklyWorkspaceJson) {
      addMessage("Creating Blockly workspace file...")
      const blocklyFileName = `.github/workflows/${fileBaseName}.json`
      const blocklyBlobResponse = await axios.post(
        `${baseUrl}/git/blobs`,
        {
          content: Buffer.from(blocklyWorkspaceJson).toString("base64"),
          encoding: "base64",
        },
        { headers },
      )
      blocklyBlobSha = blocklyBlobResponse.data.sha
    }

    // Step 5: Create a new tree with the workflow file and Blockly workspace
    addMessage("Setting up directory structure...")
    const treeItems = [
      {
        path: workflowFileName,
        mode: "100644",
        type: "blob",
        sha: blobSha,
      },
    ]

    // Add Blockly workspace file to the tree if available
    if (blocklyBlobSha) {
      treeItems.push({
        path: `.github/workflows/${fileBaseName}.json`,
        mode: "100644",
        type: "blob",
        sha: blocklyBlobSha,
      })
    }

    const newTreeResponse = await axios.post(
      `${baseUrl}/git/trees`,
      {
        base_tree: baseTreeSha,
        tree: treeItems,
      },
      { headers },
    )
    const newTreeSha = newTreeResponse.data.sha

    // Step 6: Create a new commit
    addMessage("Committing files to repository...")
    const commitMessage = blocklyBlobSha
      ? `Add GitHub Actions workflow '${pipelineName}' and Blockly workspace via Visual CI/CD`
      : `Add GitHub Actions workflow '${pipelineName}' via Visual CI/CD`
    const newCommitResponse = await axios.post(
      `${baseUrl}/git/commits`,
      {
        message: commitMessage,
        tree: newTreeSha,
        parents: [latestCommitSha],
      },
      { headers },
    )
    const newCommitSha = newCommitResponse.data.sha

    // Step 7: Update the reference to point to the new commit
    addMessage(`Updating ${defaultBranch} branch reference...`)
    await axios.patch(
      `${baseUrl}/git/refs/heads/${defaultBranch}`,
      {
        sha: newCommitSha,
        force: false,
      },
      { headers },
    )
    addMessage(`✅ Workflow file '${fileBaseName}.yml' committed successfully to ${defaultBranch}`)

    // Step 8: Wait for workflow to be registered
    addMessage("Waiting for GitHub to register the workflow...")
    await new Promise((resolve) => setTimeout(resolve, 5000))

    // Step 9: Get workflow ID
    addMessage("Fetching workflow information...")
    const workflowsResponse = await axios.get(`${baseUrl}/actions/workflows`, { headers })
    const workflow = workflowsResponse.data.workflows.find((wf: any) => wf.path === workflowFileName)

    if (!workflow) {
      throw new Error(
        addMessage(
          "Workflow file was created but workflow was not found. It may take a moment for GitHub to register the workflow.",
        ),
      )
    }

    // Step 10: Trigger the workflow run
    addMessage(`Triggering workflow run for "${workflow.name}"...`)
    await axios.post(
      `${baseUrl}/actions/workflows/${workflow.id}/dispatches`,
      {
        ref: defaultBranch,
      },
      { headers },
    )
    addMessage(`✅ Workflow triggered successfully`)

    // Step 11: Poll for workflow runs until completion
    let workflowRunId: number | null = null
    let status = "unknown"
    let conclusion = null

    addMessage("Waiting for workflow run to start...")

    // Poll for the workflow run to appear and complete
    for (let i = 0; i < 30; i++) {
      const runsResponse = await axios.get(`${baseUrl}/actions/workflows/${workflow.id}/runs?branch=${defaultBranch}`, {
        headers,
      })

      const runs = runsResponse.data.workflow_runs
      if (runs.length > 0) {
        // Get the most recent run
        const run = runs[0]
        workflowRunId = run.id

        // Only update status message if status changed
        if (status !== run.status) {
          status = run.status
          conclusion = run.conclusion

          if (status === "queued") {
            addMessage("Workflow run is queued and waiting to start...")
          } else if (status === "in_progress") {
            addMessage("Workflow run is in progress...")
          } else if (status === "completed") {
            addMessage(`Workflow run completed with conclusion: ${conclusion}`)
            break
          }
        }
      }

      // Wait 5 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }

    if (!workflowRunId) {
      return [
        ...progressMessages,
        "Workflow was triggered but no run was detected after waiting. Check your GitHub Actions tab for status.",
      ]
    }

    // Step 12: Get the workflow run logs and results
    if (status === "completed") {
      // Get job details
      addMessage("Fetching job results...")
      const jobsResponse = await axios.get(`${baseUrl}/actions/runs/${workflowRunId}/jobs`, { headers })

      const jobs = jobsResponse.data.jobs
      addMessage(`Workflow run completed with conclusion: ${conclusion}`)

      for (const job of jobs) {
        addMessage(`Job: ${job.name}`)
        addMessage(`Status: ${job.status}, Conclusion: ${job.conclusion}`)

        // Get logs for the job
        try {
          addMessage(`Fetching logs for job "${job.name}"...`)
          const logsUrl = `${baseUrl}/actions/jobs/${job.id}/logs`
          const logsResponse = await axios.get(logsUrl, {
            headers: { ...headers, Accept: "application/octet-stream" },
            responseType: "text",
          })

          // Split logs into lines and add them to the progress messages
          const logLines = logsResponse.data.split("\n")
          for (const line of logLines) {
            if (line.trim()) {
              addMessage(line)
            }
          }
        } catch (error) {
          addMessage("Could not retrieve logs for this job.")
        }
      }

      addMessage(`✅ View complete run at: https://github.com/${owner}/${repoName}/actions/runs/${workflowRunId}`)

      return progressMessages
    } else {
      addMessage(`Workflow run is still in progress. Status: ${status}.`)
      addMessage(`View run at: https://github.com/${owner}/${repoName}/actions`)
      return progressMessages
    }
  } catch (error: any) {
    if (error.response) {
      const errorMessage = `Error ${error.response.status}: ${JSON.stringify(error.response.data)}`
      addMessage(`❌ ${errorMessage}`)
      return progressMessages
    } else {
      addMessage(`❌ Error: ${error.message}`)
      return progressMessages
    }
  }
}
