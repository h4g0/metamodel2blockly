"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import VisualCICDEnvironment from "../../visual-cicd-interface"

export default function EditorPage() {
  return (
    <div className="flex flex-col h-full w-full m-0 p-0">
      <div className="p-4 border-b bg-white">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <div className="flex-grow">
        <VisualCICDEnvironment />
      </div>
    </div>
  )
}
