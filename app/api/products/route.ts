import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { z } from 'zod'

const dataFile = path.join(process.cwd(), 'data', 'products.json')

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string(),
  material: z.string(),
  sizes: z.array(z.string()),
  basePrice: z.number(),
  slug: z.string(),
  image: z.string().optional().default(''),
  category: z.string(),
  subcategory: z.string().optional(),
  features: z.array(z.string()),
  applications: z.array(z.string()),
  certifications: z.array(z.string()),
})

export async function GET() {
  try {
    const data = await fs.readFile(dataFile, 'utf8')
    const products = JSON.parse(data)
    return NextResponse.json(products)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = productSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', issues: result.error.issues },
        { status: 400 },
      )
    }
    const newProduct = { id: Date.now().toString(), ...result.data }
    const file = await fs.readFile(dataFile, 'utf8')
    const products = JSON.parse(file)
    products.push(newProduct)
    await fs.writeFile(dataFile, JSON.stringify(products, null, 2))
    return NextResponse.json(newProduct, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
