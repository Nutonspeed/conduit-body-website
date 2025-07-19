import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'files.json')

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

async function writeData(files: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(files, null, 2))
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const files = await readData()
  const newFiles = files.filter((f: any) => f.id !== params.id)
  if (newFiles.length === files.length)
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  await writeData(newFiles)
  return NextResponse.json({ ok: true })
}
