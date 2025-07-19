import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const usersFile = path.join(process.cwd(), 'data', 'users.json')

async function readUsers() {
  try {
    const data = await fs.readFile(usersFile, 'utf-8')
    return JSON.parse(data)
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return []
    }
    throw err
  }
}

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const users = await readUsers()
  const user = users.find((u: any) => u.email === email && u.password === password)
  if (!user) {
    return NextResponse.json({ error: 'invalid' }, { status: 401 })
  }
  const token = Buffer.from(`${user.email}:${user.role}`).toString('base64')
  return NextResponse.json({ token, role: user.role })
}
