import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'coupons.json')

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

async function writeData(coupons: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(coupons, null, 2))
}

const couponSchema = z.object({
  code: z.string().min(1),
  discount: z.number().min(1).max(100),
  expiresAt: z.string()
})

export async function GET() {
  const coupons = await readData()
  return NextResponse.json(coupons)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = couponSchema.parse(body)
  const coupons = await readData()
  const exists = coupons.some((c: any) => c.code === data.code)
  if (exists) {
    return NextResponse.json({ error: 'exists' }, { status: 400 })
  }
  const newCoupon = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  }
  coupons.unshift(newCoupon)
  await writeData(coupons)
  return NextResponse.json(newCoupon, { status: 201 })
}
