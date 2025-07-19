import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'tags.json')

async function readTags() {
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

async function writeTags(tags: string[]) {
  await fs.writeFile(dataFile, JSON.stringify(tags, null, 2))
}

export async function GET() {
  const tags = await readTags()
  return NextResponse.json(tags)
}

export async function POST(request: Request) {
  const { name } = await request.json()
  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  }
  const tags = await readTags()
  if (!tags.includes(name)) {
    tags.push(name)
    await writeTags(tags)
  }
  return NextResponse.json({ ok: true })
}
