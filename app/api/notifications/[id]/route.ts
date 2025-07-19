import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'notifications.json')

async function readData() {
  try {
    const data = await fs.readFile(dataFile, 'utf-8')
    return JSON.parse(data)
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(dataFile), { recursive: true })
      await fs.writeFile(dataFile, '[]', 'utf-8')
      return []
    }
    throw err
  }
}

async function writeData(notifications: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(notifications, null, 2))
}

const updateSchema = z.object({
  read: z.boolean().optional(),
})

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const notifications = await readData()
  const notification = notifications.find((n: any) => n.id === params.id)
  if (!notification) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(notification)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const notifications = await readData()
  const idx = notifications.findIndex((n: any) => n.id === params.id)
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const body = await request.json()
  const data = updateSchema.parse(body)
  notifications[idx] = { ...notifications[idx], ...data }
  await writeData(notifications)
  return NextResponse.json(notifications[idx])
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const notifications = await readData()
  const newNotifications = notifications.filter((n: any) => n.id !== params.id)
  if (newNotifications.length === notifications.length)
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  await writeData(newNotifications)
  return NextResponse.json({ ok: true })
}
