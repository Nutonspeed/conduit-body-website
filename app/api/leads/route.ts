import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'leads.json')

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

async function writeData(leads: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(leads, null, 2))
}

const leadSchema = z.object({
  customerName: z.string().min(1),
  company: z.string().optional(),
  phone: z.string().min(5),
  email: z.string().email(),
  address: z.string().optional(),
  productInterest: z.string().min(1),
  size: z.string().optional(),
  quantity: z.number().optional(),
  notes: z.array(z.string()).optional(),
  status: z.enum(['รอติดต่อ', 'กำลังเจรจา', 'ปิดการขาย']).optional(),
})

export async function GET() {
  const leads = await readData()
  return NextResponse.json(leads)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = leadSchema.parse(body)
  const leads = await readData()
  const newLead = {
    ...data,
    status: data.status ?? 'รอติดต่อ',
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  leads.unshift(newLead)
  await writeData(leads)
  return NextResponse.json(newLead, { status: 201 })
}
