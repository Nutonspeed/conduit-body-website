import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'livechat.json')

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

async function writeData(messages: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(messages, null, 2))
}

export async function GET() {
  const messages = await readData()
  return NextResponse.json(messages)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.sender || !body.message) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
  const messages = await readData()
  const newMsg = {
    id: Date.now().toString(),
    sender: body.sender,
    message: body.message,
    timestamp: new Date().toISOString(),
  }
  messages.push(newMsg)
  await writeData(messages)
  return NextResponse.json(newMsg, { status: 201 })
}
