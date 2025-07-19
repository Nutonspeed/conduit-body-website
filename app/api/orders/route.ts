import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'orders.json')

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

async function writeData(orders: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(orders, null, 2))
}

const orderSchema = z.object({
  customer: z.object({
    name: z.string(),
    company: z.string().optional(),
    phone: z.string(),
    email: z.string(),
    address: z.string().optional(),
    notes: z.string().optional(),
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      productName: z.string(),
      size: z.string(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
  total: z.number(),
})

export async function GET() {
  const orders = await readData()
  return NextResponse.json(orders)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = orderSchema.parse(body)
  const orders = await readData()
  const newOrder = {
    ...data,
    id: Date.now().toString(),
    orderDate: new Date().toISOString(),
  }
  orders.unshift(newOrder)
  await writeData(orders)
  return NextResponse.json(newOrder, { status: 201 })
}
