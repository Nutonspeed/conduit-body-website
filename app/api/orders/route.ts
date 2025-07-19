import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'orders.json')

export async function GET() {
  try {
    const data = await fs.readFile(dataFile, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return NextResponse.json([])
    }
    throw err
  }
}
