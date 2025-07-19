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
  name: z.string().optional(),
  price: z.number().nonnegative().optional(),
})

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const methods = await readData()
  const method = methods.find((m: any) => m.id === params.id)
  if (!method) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(method)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const methods = await readData()
  const idx = methods.findIndex((m: any) => m.id === params.id)
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const body = await request.json()
  const data = methodSchema.parse(body)
  methods[idx] = { ...methods[idx], ...data }
  await writeData(methods)
  return NextResponse.json(methods[idx])
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const methods = await readData()
  const newMethods = methods.filter((m: any) => m.id !== params.id)
  if (newMethods.length === methods.length)
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  await writeData(newMethods)
  return NextResponse.json({ ok: true })
}
