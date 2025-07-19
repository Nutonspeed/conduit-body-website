"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EmailBuilder() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [preview, setPreview] = useState("")

  useEffect(() => {
    if (!isAuthenticated) router.push("/admin/login")
  }, [isAuthenticated, router])

  const send = async () => {
    await fetch('/api/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `Email: ${subject}` }),
    })
    setPreview("ส่งอีเมลแล้ว")
  }

  if (!isAuthenticated) return null

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Email Campaign Builder</h1>
      <Input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
      <Textarea placeholder="Email body" value={body} onChange={e => setBody(e.target.value)} />
      <Button onClick={() => setPreview(body)}>Preview</Button>
      <Button onClick={send}>Send Mock</Button>
      {preview && (
        <div className="border p-4">
          <h2 className="font-bold">Preview</h2>
          <p>{subject}</p>
          <div>{preview}</div>
        </div>
      )}
    </div>
  )
}
