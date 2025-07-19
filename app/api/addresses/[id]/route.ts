import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'addresses.json')

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

async function writeData(addrs: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(addrs, null, 2))
}

const addressSchema = z.object({
  label: z.string().optional(),
  address: z.string().optional(),
})

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const addresses = await readData()
  const addr = addresses.find((a: any) => a.id === params.id)
  if (!addr) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(addr)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const addresses = await readData()
  const idx = addresses.findIndex((a: any) => a.id === params.id)
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
  const body = await request.json()
  const data = addressSchema.parse(body)
  addresses[idx] = { ...addresses[idx], ...data }
  await writeData(addresses)
  return NextResponse.json(addresses[idx])
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const addresses = await readData()
  const newAddrs = addresses.filter((a: any) => a.id !== params.id)
  if (newAddrs.length === addresses.length)
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  await writeData(newAddrs)
  return NextResponse.json({ ok: true })
}
