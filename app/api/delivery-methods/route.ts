import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'delivery-methods.json')

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

async function writeData(methods: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(methods, null, 2))
}

const methodSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
})

export async function GET() {
  const methods = await readData()
  return NextResponse.json(methods)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = methodSchema.parse(body)
  const methods = await readData()
  const newMethod = {
    ...data,
    id: Date.now().toString(),
  }
  methods.push(newMethod)
  await writeData(methods)
  return NextResponse.json(newMethod, { status: 201 })
}
