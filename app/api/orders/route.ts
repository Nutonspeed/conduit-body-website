import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'orders.json')

async function readOrders() {
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

async function writeOrders(orders: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(orders, null, 2))
}

export async function GET() {
  const orders = await readOrders()
  return NextResponse.json(orders)
}

export async function POST(request: Request) {
  const body = await request.json()
  const orders = await readOrders()
  const newOrder = { ...body, id: Date.now().toString(), createdAt: new Date().toISOString(), tags: [] }
  orders.unshift(newOrder)
  await writeOrders(orders)
  return NextResponse.json(newOrder, { status: 201 })
}
