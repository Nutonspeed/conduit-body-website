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

const notificationSchema = z.object({
  message: z.string().min(1),
})

export async function GET() {
  const notifications = await readData()
  return NextResponse.json(notifications)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = notificationSchema.parse(body)
  const notifications = await readData()
  const newNotification = {
    id: Date.now().toString(),
    message: data.message,
    read: false,
    createdAt: new Date().toISOString(),
  }
  notifications.unshift(newNotification)
  await writeData(notifications)
  return NextResponse.json(newNotification, { status: 201 })
}
