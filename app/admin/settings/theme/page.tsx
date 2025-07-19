"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, useThemeSettingsStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ThemeCustomizer() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { primaryColor, font, fetchTheme, updateTheme } = useThemeSettingsStore()

  useEffect(() => { if (!isAuthenticated) router.push("/admin/login") }, [isAuthenticated, router])
  useEffect(() => { fetchTheme() }, [fetchTheme])

  if (!isAuthenticated) return null

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Theme Customizer</h1>
      <div className="flex gap-2 items-center">
        <Input type="color" value={primaryColor} onChange={e => updateTheme({ primaryColor: e.target.value })} />
        <Select value={font} onValueChange={v => updateTheme({ font: v })}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Sarabun">Sarabun</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={() => location.reload()}>Reload Preview</Button>
    </div>
  )
}
