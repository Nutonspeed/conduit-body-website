import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'settings.json')

async function readData() {
  try {
    const data = await fs.readFile(dataFile, 'utf-8')
    return JSON.parse(data)
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(dataFile), { recursive: true })
      await fs.writeFile(dataFile, '{"storeOpen": true}', 'utf-8')
      return { storeOpen: true }
    }
    throw err
  }
}

async function writeData(settings: any) {
  await fs.writeFile(dataFile, JSON.stringify(settings, null, 2))
}

const schema = z.object({ storeOpen: z.boolean() })

export async function GET() {
  const settings = await readData()
  return NextResponse.json(settings)
}

export async function PUT(request: Request) {
  const body = await request.json()
  const data = schema.parse(body)
  await writeData(data)
  return NextResponse.json(data)
}
