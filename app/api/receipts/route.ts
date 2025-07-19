import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'receipts.json')

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

async function writeData(receipts: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(receipts, null, 2))
}

const itemSchema = z.object({
  description: z.string(),
  quantity: z.number(),
  price: z.number(),
})

const receiptSchema = z.object({
  orderId: z.string(),
  items: z.array(itemSchema),
  total: z.number(),
  issuedAt: z.string().optional(),
})

export async function GET() {
  const receipts = await readData()
  return NextResponse.json(receipts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = receiptSchema.parse(body)
  const receipts = await readData()
  const newReceipt = {
    ...data,
    id: Date.now().toString(),
    issuedAt: data.issuedAt || new Date().toISOString(),
  }
  receipts.unshift(newReceipt)
  await writeData(receipts)
  return NextResponse.json(newReceipt, { status: 201 })
}
