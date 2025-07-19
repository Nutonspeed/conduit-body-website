import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'files.json')

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

async function writeData(files: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(files, null, 2))
}

const uploadSchema = z.object({ filename: z.string() })

export async function GET() {
  const files = await readData()
  return NextResponse.json(files)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = uploadSchema.parse(body)
  const files = await readData()
  const newFile = {
    id: Date.now().toString(),
    name: data.filename,
    uploadedAt: new Date().toISOString(),
  }
  files.unshift(newFile)
  await writeData(files)
  return NextResponse.json(newFile, { status: 201 })
}
