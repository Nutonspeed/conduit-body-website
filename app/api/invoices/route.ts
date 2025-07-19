import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'invoices.json')

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

async function writeData(invoices: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(invoices, null, 2))
}

const itemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  size: z.string(),
  quantity: z.number(),
  price: z.number(),
})

const invoiceSchema = z.object({
  quoteId: z.string().optional(),
  customer: z.string(),
  items: z.array(itemSchema),
  amount: z.number(),
})

export async function GET() {
  const invoices = await readData()
  return NextResponse.json(invoices)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = invoiceSchema.parse(body)
  const invoices = await readData()
  const newInvoice = {
    ...data,
    invoiceId: `INV-${Date.now().toString().slice(-5)}`,
    createdAt: new Date().toISOString(),
  }
  invoices.unshift(newInvoice)
  await writeData(invoices)
  return NextResponse.json(newInvoice, { status: 201 })
}
