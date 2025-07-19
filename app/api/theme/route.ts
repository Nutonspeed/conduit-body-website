import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'theme.json')

async function readData() {
  try {
    const data = await fs.readFile(dataFile, 'utf-8')
    return JSON.parse(data)
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(dataFile), { recursive: true })
      await fs.writeFile(dataFile, JSON.stringify({ primaryColor: '#3b82f6', font: 'Inter' }, null, 2))
      return { primaryColor: '#3b82f6', font: 'Inter' }
    }
    throw err
  }
}

async function writeData(data: any) {
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2))
}

export async function GET() {
  const settings = await readData()
  return NextResponse.json(settings)
}

export async function POST(request: Request) {
  const body = await request.json()
  const current = await readData()
  const updated = { ...current, ...body }
  await writeData(updated)
  return NextResponse.json(updated)
}
