"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuthStore, useAutomationStore } from "@/lib/store"

export default function AutomationRules() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { rules, addRule, deleteRule } = useAutomationStore()
  const [newRule, setNewRule] = useState({ event: "order_created", action: "send_broadcast" as const })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  const handleAdd = () => {
    addRule(newRule.event, newRule.action)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">Workflow Rule Builder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 items-end">
              <div className="w-1/2">
                <label className="font-sarabun mb-1 block">If Event</label>
                <Select value={newRule.event} onValueChange={(v) => setNewRule((r) => ({ ...r, event: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order_created">order_created</SelectItem>
                    <SelectItem value="support_request">support_request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                <label className="font-sarabun mb-1 block">Then Action</label>
                <Select value={newRule.action} onValueChange={(v) => setNewRule((r) => ({ ...r, action: v as any }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="send_broadcast">send_broadcast</SelectItem>
                    <SelectItem value="create_ticket">create_ticket</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAdd}>Add Rule</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-sarabun">{r.event}</TableCell>
                    <TableCell className="font-sarabun">{r.action}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => deleteRule(r.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
