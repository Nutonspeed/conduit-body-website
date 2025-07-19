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

const paymentSchema = z.object({
  methodId: z.string(),
  amount: z.number(),
  slip: z.string(),
})

export async function GET() {
  const payments = await readData()
  return NextResponse.json(payments)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = paymentSchema.parse(body)
  const payments = await readData()
  const newPayment = {
    ...data,
    id: Date.now().toString(),
    status: 'pending',
    uploadedAt: new Date().toISOString(),
  }
  payments.unshift(newPayment)
  await writeData(payments)
  return NextResponse.json(newPayment, { status: 201 })
}
