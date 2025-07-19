"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Section { type: string; content: string }

export default function TemplateBuilder() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [sections, setSections] = useState<Section[]>([])
  const [current, setCurrent] = useState<Section>({ type: "hero", content: "" })

  useEffect(() => { if (!isAuthenticated) router.push("/admin/login") }, [isAuthenticated, router])

  const add = () => {
    setSections((s) => [...s, current])
    setCurrent({ type: "hero", content: "" })
  }

  if (!isAuthenticated) return null

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Template Builder</h1>
      <div className="flex gap-2">
        <Select value={current.type} onValueChange={(v) => setCurrent({ ...current, type: v })}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hero">Hero</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="grid">Grid</SelectItem>
          </SelectContent>
        </Select>
        <Textarea placeholder="content" value={current.content} onChange={e => setCurrent({ ...current, content: e.target.value })} />
        <Button onClick={add}>Add</Button>
      </div>
      <pre className="bg-gray-100 p-4">{JSON.stringify(sections, null, 2)}</pre>
    </div>
  )
}
