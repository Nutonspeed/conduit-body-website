"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuthStore, useTagStore } from "@/lib/store"

interface Rule { threshold: number; tag: string }

export default function AutomationTags() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { tags, fetchTags } = useTagStore()
  const [rules, setRules] = useState<Rule[]>([])
  const [threshold, setThreshold] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      fetchTags()
    }
  }, [isAuthenticated, router, fetchTags])

  if (!isAuthenticated) return null

  const addRule = () => {
    if (!threshold || !selectedTag) return
    setRules([...rules, { threshold: Number(threshold), tag: selectedTag }])
    setThreshold("")
    setSelectedTag("")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold font-sarabun">Automation Rules (Mock)</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-sarabun">Add Rule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-end">
              <Input
                placeholder="Total >"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="w-32"
              />
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Tag" />
                </SelectTrigger>
                <SelectContent>
                  {tags.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addRule}>Add</Button>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {rules.map((r, idx) => (
                <li key={idx} className="font-sarabun">
                  ยอดมากกว่า {r.threshold.toLocaleString()} → ติดแท็ก {r.tag}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
