import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'orders.json')

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

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const orders = await readData()
  const order = orders.find((o: any) => o.id === params.id)
  if (!order) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json(order)
}
