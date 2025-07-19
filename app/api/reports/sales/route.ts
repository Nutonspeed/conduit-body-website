import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const paymentsFile = path.join(process.cwd(), 'data', 'payments.json')

async function readPayments() {
  try {
    const data = await fs.readFile(paymentsFile, 'utf-8')
    return JSON.parse(data)
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(paymentsFile), { recursive: true })
      await fs.writeFile(paymentsFile, '[]', 'utf-8')
      return []
    }
    throw err
  }
}

export async function GET() {
  const payments = await readPayments()
  const summary: Record<string, number> = {}
  for (const p of payments) {
    const date = p.uploadedAt ? p.uploadedAt.split('T')[0] : new Date().toISOString().split('T')[0]
    summary[date] = (summary[date] || 0) + (p.amount || 0)
  }
  const result = Object.entries(summary).map(([date, total]) => ({ date, total }))
  return NextResponse.json(result)
}
