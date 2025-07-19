import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'users.json')

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

async function writeData(users: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(users, null, 2))
}

const updateSchema = z.object({ role: z.string() })

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const users = await readData()
  const idx = users.findIndex((u: any) => u.id === params.id)
  if (idx === -1)
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  const body = await request.json()
  const data = updateSchema.parse(body)
  users[idx] = { ...users[idx], role: data.role }
  await writeData(users)
  return NextResponse.json(users[idx])
}
