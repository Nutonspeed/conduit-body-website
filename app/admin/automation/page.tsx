"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/store"

export default function AutomationHome() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">Workflow Automation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 font-sarabun">
            <p><Link href="/admin/automation/rules" className="text-blue-600 underline">Workflow Rule Builder</Link></p>
            <p><Link href="/admin/automation/actions" className="text-blue-600 underline">Trigger Actions</Link></p>
            <p><Link href="/admin/automation/log" className="text-blue-600 underline">Monitor & Log</Link></p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
