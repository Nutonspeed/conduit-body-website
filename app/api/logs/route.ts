import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'logs.json')

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

async function writeData(logs: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(logs, null, 2))
}

const logSchema = z.object({ message: z.string() })

export async function GET() {
  const logs = await readData()
  return NextResponse.json(logs)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = logSchema.parse(body)
  const logs = await readData()
  const newLog = {
    id: Date.now().toString(),
    message: data.message,
    createdAt: new Date().toISOString(),
  }
  logs.unshift(newLog)
  await writeData(logs)
  return NextResponse.json(newLog, { status: 201 })
}
