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

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const orders = await readOrders()
  const order = orders.find((o: any) => o.id === params.id)
  if (!order) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(order)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const orders = await readOrders()
  const idx = orders.findIndex((o: any) => o.id === params.id)
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
  orders[idx] = { ...orders[idx], ...body }
  await writeOrders(orders)
  return NextResponse.json(orders[idx])
}
