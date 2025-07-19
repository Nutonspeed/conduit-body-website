import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

const dataFile = path.join(process.cwd(), 'data', 'analytics.json')
// 1x1 transparent GIF in base64 to avoid bundling a binary file
const pixelGifBase64 = 'R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

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

async function writeData(events: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(events, null, 2))
}

async function logEvent(emailId: string) {
  const events = await readData()
  const newEvent = { id: Date.now().toString(), event: 'email_open', emailId, timestamp: new Date().toISOString() }
  events.unshift(newEvent)
  await writeData(events)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id') || 'unknown'
  await logEvent(id)
  const gif = Buffer.from(pixelGifBase64, 'base64')
  return new NextResponse(gif, { headers: { 'Content-Type': 'image/gif' } })
}
