export interface Product {
  id: string
  name: string
  description: string
  type: string
  material: string
  sizes: string[]
  basePrice: number
  slug: string
  image: string
  category: string
  subcategory?: string
  features: string[]
  applications: string[]
  certifications: string[]
}

export interface Lead {
  id: string
  customerName: string
  company?: string
  phone: string
  email: string
  address?: string
  productInterest: string
  size?: string
  quantity?: number
  notes?: string[]
  status: "รอติดต่อ" | "กำลังเจรจา" | "ปิดการขาย"
  createdAt: string
}

export interface QuoteItem {
  productId: string
  productName: string
  size: string
  quantity: number
  price: number
}

export interface QuoteRequest {
  id: string
  name: string
  phone: string
  message: string
  items: QuoteItem[]
  status: "ใหม่" | "กำลังตอบ" | "ปิดการขาย"
  createdAt: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  from: "lead" | "quote"
  joinedAt: string
  contactCount: number
}

export interface Invoice {
  invoiceId: string
  quoteId: string
  customer: string
  items: QuoteItem[]
  amount: number
  createdAt: string
}
