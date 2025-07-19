import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

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

export async function GET() {
  const users = await readData()
  return NextResponse.json(users)
}
