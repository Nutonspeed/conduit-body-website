import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'credit-notes.json')

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

async function writeData(notes: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(notes, null, 2))
}

const noteSchema = z.object({
  receiptId: z.string(),
  reason: z.string(),
  amount: z.number(),
  createdAt: z.string().optional(),
})

export async function GET() {
  const notes = await readData()
  return NextResponse.json(notes)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = noteSchema.parse(body)
  const notes = await readData()
  const newNote = {
    ...data,
    id: Date.now().toString(),
    createdAt: data.createdAt || new Date().toISOString(),
  }
  notes.unshift(newNote)
  await writeData(notes)
  return NextResponse.json(newNote, { status: 201 })
}
