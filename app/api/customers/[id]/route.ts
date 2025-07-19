import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'customers.json')

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

async function writeData(customers: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(customers, null, 2))
}

const updateSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  contactCount: z.number().optional(),
})

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const customers = await readData()
  const customer = customers.find((c: any) => c.id === params.id)
  if (!customer) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(customer)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const customers = await readData()
  const idx = customers.findIndex((c: any) => c.id === params.id)
  if (idx === -1)
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  const body = await request.json()
  const data = updateSchema.parse(body)
  customers[idx] = { ...customers[idx], ...data }
  await writeData(customers)
  return NextResponse.json(customers[idx])
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const customers = await readData()
  const newCustomers = customers.filter((c: any) => c.id !== params.id)
  if (newCustomers.length === customers.length)
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  await writeData(newCustomers)
  return NextResponse.json({ ok: true })
}
