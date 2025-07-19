"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X } from "lucide-react"
import { useLiveChatStore } from "@/lib/store"

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const { messages, fetchMessages, sendMessage } = useLiveChatStore()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  const handleSend = () => {
    if (!text.trim()) return
    sendMessage("customer", text.trim())
    setText("")
  }

  return (
    <>
      <motion.div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700"
        >
          {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </Button>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 w-80 z-50"
          >
            <Card>
              <CardHeader>
                <CardTitle className="font-sarabun">Live Chat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-60 overflow-y-auto space-y-2">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.sender === "customer" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`px-2 py-1 rounded-md text-sm ${m.sender === "customer" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>{m.message}</div>
                    </div>
                  ))}
                  <div ref={endRef} />
                </div>
                <div className="flex gap-2">
                  <Input value={text} onChange={(e) => setText(e.target.value)} className="flex-1" placeholder="พิมพ์ข้อความ" />
                  <Button size="icon" onClick={handleSend} disabled={!text.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
