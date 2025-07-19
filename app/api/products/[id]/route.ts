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

async function readProducts() {
  const data = await fs.readFile(dataFile, 'utf8')
  return JSON.parse(data)
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const products = await readProducts()
  const product = products.find((p: any) => p.id === params.id)
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(product)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json()
    const result = productSchema.partial().safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', issues: result.error.issues },
        { status: 400 },
      )
    }
    const products = await readProducts()
    const index = products.findIndex((p: any) => p.id === params.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    products[index] = { ...products[index], ...result.data }
    await fs.writeFile(dataFile, JSON.stringify(products, null, 2))
    return NextResponse.json(products[index])
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const products = await readProducts()
    const index = products.findIndex((p: any) => p.id === params.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    products.splice(index, 1)
    await fs.writeFile(dataFile, JSON.stringify(products, null, 2))
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
