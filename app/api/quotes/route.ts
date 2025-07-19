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

const quoteSchema = z.object({
  name: z.string(),
  phone: z.string(),
  message: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      productName: z.string(),
      size: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
})

export async function GET() {
  const quotes = await readData()
  return NextResponse.json(quotes)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = quoteSchema.parse(body)
  const quotes = await readData()
  const newQuote = {
    ...data,
    id: Date.now().toString(),
    status: 'ใหม่',
    createdAt: new Date().toISOString(),
  }
  quotes.unshift(newQuote)
  await writeData(quotes)
  return NextResponse.json(newQuote, { status: 201 })
}
