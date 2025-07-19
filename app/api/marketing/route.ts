import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'marketing.json')

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

async function writeData(data: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2))
}

export async function GET() {
  const items = await readData()
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const body = await request.json()
  const items = await readData()
  const newItem = { id: Date.now().toString(), ...body }
  items.push(newItem)
  await writeData(items)
  return NextResponse.json(newItem, { status: 201 })
}
