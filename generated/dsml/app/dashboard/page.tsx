"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  BarChart3,
  Clock,
  GitBranch,
  GitCommit,
  History,
  Play,
  Plus,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

// Mock data for pipeline executions
const mockPipelines = [
  {
    id: "pipe-1",
    name: "Main Build Pipeline",
    status: "success",
    lastRun: "2 hours ago",
    duration: "4m 32s",
    branch: "main",
    commit: "a1b2c3d",
    author: "Jane Doe",
    stages: [
      { name: "Build", status: "success", duration: "1m 45s" },
      { name: "Test", status: "success", duration: "2m 10s" },
      { name: "Deploy", status: "success", duration: "37s" },
    ],
  },
  {
    id: "pipe-2",
    name: "Feature Integration",
    status: "running",
    lastRun: "Just now",
    duration: "2m 15s (running)",
    branch: "feature/user-auth",
    commit: "e4f5g6h",
    author: "John Smith",
    stages: [
      { name: "Build", status: "success", duration: "1m 30s" },
      { name: "Test", status: "running", duration: "45s (running)" },
      { name: "Deploy", status: "pending", duration: "0s" },
    ],
  },
  {
    id: "pipe-3",
    name: "Nightly Tests",
    status: "failed",
    lastRun: "Yesterday",
    duration: "6m 12s",
    branch: "develop",
    commit: "i7j8k9l",
    author: "Alex Johnson",
    stages: [
      { name: "Build", status: "success", duration: "1m 50s" },
      { name: "Test", status: "failed", duration: "4m 22s" },
      { name: "Deploy", status: "skipped", duration: "0s" },
    ],
  },
  {
    id: "pipe-4",
    name: "Release Candidate",
    status: "success",
    lastRun: "3 days ago",
    duration: "7m 45s",
    branch: "release/v1.2",
    commit: "m1n2o3p",
    author: "Sarah Williams",
    stages: [
      { name: "Build", status: "success", duration: "2m 15s" },
      { name: "Test", status: "success", duration: "3m 30s" },
      { name: "Deploy", status: "success", duration: "2m 00s" },
    ],
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [pipelines, setPipelines] = useState(mockPipelines)
  const [isLoading, setIsLoading] = useState(false)

  // Simulate refreshing data
  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" /> Success
          </Badge>
        )
      case "running":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Running
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" /> Failed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "skipped":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <AlertCircle className="h-3 w-3 mr-1" /> Skipped
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        )
    }
  }

  return (
    <div className="h-full w-full m-0 p-0 overflow-auto bg-slate-50">
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Pipeline Dashboard</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              <span className="ml-2 hidden md:inline">Refresh</span>
            </Button>
            <Button size="sm" asChild>
              <Link href="/editor">
                <Plus className="h-4 w-4 mr-2" />
                New Pipeline
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Pipelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground mt-1">2 active, 2 completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">75%</div>
                  <Progress value={75} className="h-2 mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5m 11s</div>
                  <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <div className="flex items-center mt-1">
                    <GitBranch className="h-3 w-3 mr-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">main, develop, feature/*</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-semibold mt-6">Recent Pipelines</h2>
            <div className="space-y-4">
              {pipelines.map((pipeline) => (
                <Card
                  key={pipeline.id}
                  className={pipeline.status === "running" ? "border-blue-300 shadow-blue-100" : ""}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{pipeline.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <GitBranch className="h-3 w-3 mr-1" />
                          {pipeline.branch}
                          <span className="mx-2">•</span>
                          <GitCommit className="h-3 w-3 mr-1" />
                          {pipeline.commit}
                        </CardDescription>
                      </div>
                      <StatusBadge status={pipeline.status} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {pipeline.stages.map((stage, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <StatusBadge status={stage.status} />
                            <span className="ml-2">{stage.name}</span>
                          </div>
                          <span className="text-muted-foreground">{stage.duration}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {pipeline.lastRun}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <History className="h-3 w-3 mr-1" />
                        Logs
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Play className="h-3 w-3 mr-1" />
                        Run
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline History</CardTitle>
                <CardDescription>View all pipeline executions and their results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">History View</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Detailed pipeline history will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Analytics</CardTitle>
                <CardDescription>Performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Detailed analytics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
