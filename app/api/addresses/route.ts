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
  label: z.string().min(1),
  address: z.string().min(1),
})

export async function GET() {
  const addresses = await readData()
  return NextResponse.json(addresses)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = addressSchema.parse(body)
  const addresses = await readData()
  const newAddress = { ...data, id: Date.now().toString() }
  addresses.push(newAddress)
  await writeData(addresses)
  return NextResponse.json(newAddress, { status: 201 })
}
