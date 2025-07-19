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

const customerSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  address: z.string().optional(),
  from: z.enum(['lead', 'quote']),
  contactCount: z.number().optional(),
  tags: z.array(z.string()).optional(),
})

export async function GET() {
  const customers = await readData()
  return NextResponse.json(customers)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = customerSchema.parse(body)
  const customers = await readData()
  const exists = customers.some(
    (c: any) => c.phone === data.phone && c.from === data.from
  )
  if (exists) {
    return NextResponse.json({ error: 'exists' }, { status: 400 })
  }
  const newCustomer = {
    ...data,
    id: Date.now().toString(),
    joinedAt: new Date().toISOString(),
    contactCount: data.contactCount ?? 1,
    tags: data.tags ?? [],
  }
  customers.unshift(newCustomer)
  await writeData(customers)
  return NextResponse.json(newCustomer, { status: 201 })
}
