import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'analytics.json')

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

export async function GET() {
  const events = await readData()
  return NextResponse.json(events)
}

export async function POST(request: Request) {
  const body = await request.json()
  const events = await readData()
  const newEvent = { id: Date.now().toString(), ...body, timestamp: new Date().toISOString() }
  events.unshift(newEvent)
  await writeData(events)
  return NextResponse.json(newEvent, { status: 201 })
}
