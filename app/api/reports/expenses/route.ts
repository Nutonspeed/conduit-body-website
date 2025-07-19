import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'expenses.json')

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

async function writeData(expenses: any[]) {
  await fs.writeFile(dataFile, JSON.stringify(expenses, null, 2))
}

const expenseSchema = z.object({
  description: z.string(),
  category: z.string(),
  amount: z.number(),
  date: z.string().optional(),
})

export async function GET() {
  const expenses = await readData()
  return NextResponse.json(expenses)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = expenseSchema.parse(body)
  const expenses = await readData()
  const newExpense = {
    ...data,
    id: Date.now().toString(),
    date: data.date || new Date().toISOString().split('T')[0],
  }
  expenses.unshift(newExpense)
  await writeData(expenses)
  return NextResponse.json(newExpense, { status: 201 })
}
