import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'payments.json')

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

async function writeData(payments: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(payments, null, 2))
}

const updateSchema = z.object({
  status: z.enum(['pending', 'verified']).optional(),
})

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const payments = await readData()
  const idx = payments.findIndex((p: any) => p.id === params.id)
  if (idx === -1)
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  const body = await request.json()
  const data = updateSchema.parse(body)
  payments[idx] = { ...payments[idx], ...data }
  await writeData(payments)
  return NextResponse.json(payments[idx])
}
