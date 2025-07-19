import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'tickets.json')

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

async function writeData(tickets: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(tickets, null, 2))
}

export async function GET() {
  const tickets = await readData()
  return NextResponse.json(tickets)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.customer || !body.message) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
  const tickets = await readData()
  const newTicket = {
    id: Date.now().toString(),
    customer: body.customer,
    message: body.message,
    status: 'open',
    createdAt: new Date().toISOString(),
  }
  tickets.unshift(newTicket)
  await writeData(tickets)
  return NextResponse.json(newTicket, { status: 201 })
}
