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

const updateSchema = z.object({
  customerName: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  productInterest: z.string().optional(),
  size: z.string().optional(),
  quantity: z.number().optional(),
  notes: z.array(z.string()).optional(),
  status: z.enum(['รอติดต่อ', 'กำลังเจรจา', 'ปิดการขาย']).optional(),
})

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const leads = await readData()
  const lead = leads.find((l: any) => l.id === params.id)
  if (!lead) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(lead)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const leads = await readData()
  const idx = leads.findIndex((l: any) => l.id === params.id)
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const body = await request.json()
  const data = updateSchema.parse(body)
  leads[idx] = { ...leads[idx], ...data }
  await writeData(leads)
  return NextResponse.json(leads[idx])
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const leads = await readData()
  const newLeads = leads.filter((l: any) => l.id !== params.id)
  if (newLeads.length === leads.length)
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  await writeData(newLeads)
  return NextResponse.json({ ok: true })
}
