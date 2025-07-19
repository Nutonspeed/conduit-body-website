import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const paymentsFile = path.join(process.cwd(), 'data', 'payments.json')

async function readPayments() {
  try {
    const data = await fs.readFile(paymentsFile, 'utf-8')
    return JSON.parse(data)
  } catch (err: any) {
    if (err.code === 'ENOENT') return []
    throw err
  }
}

export async function GET() {
  const payments = await readPayments()
  const summary: Record<string, number> = {}
  for (const p of payments) {
    const month = (p.uploadedAt || '').slice(0, 7)
    summary[month] = (summary[month] || 0) + (p.amount || 0)
  }
  const rows = Object.entries(summary).map(([m, total]) => [m, total, total * 0.07])
  const csv = [ ['เดือน', 'ยอดขาย', 'ภาษี7%'], ...rows ].map(r => r.join(',')).join('\n')
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="tax_${Date.now()}.csv"`,
    },
  })
}
