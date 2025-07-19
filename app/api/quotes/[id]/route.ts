import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'quotes.json')

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

async function writeData(quotes: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(quotes, null, 2))
}

const itemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  size: z.string(),
  quantity: z.number(),
  price: z.number(),
})

const updateSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  items: z.array(itemSchema).optional(),
  status: z.enum(['ใหม่', 'กำลังตอบ', 'ปิดการขาย']).optional(),
})

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const quotes = await readData()
  const quote = quotes.find((q: any) => q.id === params.id)
  if (!quote) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(quote)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const quotes = await readData()
  const idx = quotes.findIndex((q: any) => q.id === params.id)
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const body = await request.json()
  const data = updateSchema.parse(body)
  quotes[idx] = { ...quotes[idx], ...data }
  await writeData(quotes)
  return NextResponse.json(quotes[idx])
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const quotes = await readData()
  const newQuotes = quotes.filter((q: any) => q.id !== params.id)
  if (newQuotes.length === quotes.length)
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  await writeData(newQuotes)
  return NextResponse.json({ ok: true })
}
