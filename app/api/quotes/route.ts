import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const quotesFile = path.join(process.cwd(), 'data', 'quotes.json')
const usersFile = path.join(process.cwd(), 'data', 'users.json')

async function readUsers() {
  try {
    const data = await fs.readFile(usersFile, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function readQuotes() {
  try {
    const data = await fs.readFile(quotesFile, 'utf-8')
    return JSON.parse(data)
  } catch (err: any) {
    if (err.code === 'ENOENT') return []
    throw err
  }
}

function verifyToken(token: string | null, users: any[]) {
  if (!token) return false
  const [email, role] = Buffer.from(token, 'base64').toString().split(':')
  return users.some((u: any) => u.email === email && u.role === role)
}

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  const token = auth?.replace('Bearer ', '') || null
  const users = await readUsers()
  if (!verifyToken(token, users)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const quotes = await readQuotes()
  return NextResponse.json(quotes)
}
