import { create } from "zustand"
import { persist } from "zustand/middleware"
import type {
  Product,
  Lead,
  QuoteRequest,
  QuoteItem,
  Customer,
  Invoice,
} from "./mockData"
import {
  products as initialProducts,
  mockLeads,
  mockQuotes,
  mockInvoiceHistory,
} from "./mockData"

// Auth Store
interface AuthState {
  isAuthenticated: boolean
  user: { email: string; name: string } | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email: string, password: string) => {
        // Simple auth check
        if (email === "admin@ozgedney.co.th" && password === "admin123") {
          set({
            isAuthenticated: true,
            user: { email, name: "Admin" },
          })
          return true
        }
        return false
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
)

// Product Store
interface ProductState {
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: initialProducts,
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { ...product, id: Date.now().toString() }],
        })),
      updateProduct: (id, updatedProduct) =>
        set((state) => ({
          products: state.products.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
    }),
    {
      name: "product-storage",
    },
  ),
)

// Customer Store
interface CustomerState {
  customers: Customer[]
  fetchCustomers: () => Promise<void>
  addCustomer: (
    customer: Omit<Customer, "id" | "joinedAt" | "contactCount"> & {
      contactCount?: number
    }
  ) => Promise<void>
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  fetchCustomers: async () => {
    const res = await fetch("/api/customers")
    const data = await res.json()
    set({ customers: data })
  },
  addCustomer: async (customer) => {
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
    if (res.ok) {
      const newCustomer = await res.json()
      set((state) => ({ customers: [newCustomer, ...state.customers] }))
    }
  },
}))

// Lead Store
interface LeadState {
  leads: Lead[]
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void
  updateLead: (id: string, lead: Partial<Lead>) => void
  updateLeadStatus: (id: string, status: Lead["status"]) => void
  addNote: (id: string, note: string) => void
  deleteLead: (id: string) => void
}

export const useLeadStore = create<LeadState>()(
  persist(
    (set) => ({
      leads: mockLeads,
      addLead: (lead) =>
        set((state) => ({
          leads: [
            {
              ...lead,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
            ...state.leads,
          ],
        })),
      updateLead: (id, updatedLead) =>
        set((state) => ({
          leads: state.leads.map((lead) => (lead.id === id ? { ...lead, ...updatedLead } : lead)),
        })),
      updateLeadStatus: (id, status) =>
        set((state) => {
          const updated = state.leads.map((lead) =>
            lead.id === id ? { ...lead, status } : lead,
          )
          const lead = state.leads.find((l) => l.id === id)
          if (status === "ปิดการขาย" && lead) {
            const { addCustomer } = useCustomerStore.getState()
            addCustomer({
              name: lead.customerName,
              phone: lead.phone,
              from: "lead",
              contactCount: lead.notes ? lead.notes.length : 1,
            })
          }
          return { leads: updated }
        }),
      addNote: (id, note) =>
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === id
              ? { ...lead, notes: [...(lead.notes ?? []), note] }
              : lead,
          ),
        })),
      deleteLead: (id) =>
        set((state) => ({
          leads: state.leads.filter((lead) => lead.id !== id),
        })),
    }),
    {
      name: "lead-storage",
    },
  ),
)

// Marketing Store
interface MarketingState {
  campaigns: any[]
  analytics: any
  addCampaign: (campaign: any) => void
  updateCampaign: (id: string, campaign: any) => void
  deleteCampaign: (id: string) => void
}

export const useMarketingStore = create<MarketingState>()(
  persist(
    (set) => ({
      campaigns: [],
      analytics: {},
      addCampaign: (campaign) =>
        set((state) => ({
          campaigns: [...state.campaigns, { ...campaign, id: Date.now().toString() }],
        })),
      updateCampaign: (id, updatedCampaign) =>
        set((state) => ({
          campaigns: state.campaigns.map((campaign) =>
            campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign,
          ),
        })),
      deleteCampaign: (id) =>
        set((state) => ({
          campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
        })),
    }),
    {
      name: "marketing-storage",
    },
  ),
)

// Quote Cart Store
interface CartItem extends QuoteItem {}

interface QuoteCartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  removeItem: (productId: string, size: string) => void
  clearCart: () => void
}

export const useQuoteCartStore = create<QuoteCartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.size === item.size,
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      updateQuantity: (productId, size, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.size === size
              ? { ...i, quantity }
              : i,
          ),
        })),
      removeItem: (productId, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.size === size),
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: "quote-cart-storage" },
  ),
)

// Quote Store
interface QuoteState {
  quotes: QuoteRequest[]
  addQuote: (
    quote: Omit<QuoteRequest, "id" | "createdAt" | "status">
  ) => void
  updateStatus: (id: string, status: QuoteRequest["status"]) => void
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      quotes: mockQuotes,
      addQuote: (quote) =>
        set((state) => ({
          quotes: [
            {
              ...quote,
              id: Date.now().toString(),
              status: "ใหม่",
              createdAt: new Date().toISOString(),
            },
            ...state.quotes,
          ],
        })),
      updateStatus: (id, status) =>
        set((state) => {
          const updated = state.quotes.map((q) =>
            q.id === id ? { ...q, status } : q,
          )
          const quote = state.quotes.find((q) => q.id === id)
          if (status === "ปิดการขาย" && quote) {
            const { addCustomer } = useCustomerStore.getState()
            addCustomer({
              name: quote.name,
              phone: quote.phone,
              from: "quote",
              contactCount: 1,
            })
          }
          return { quotes: updated }
        }),
    }),
    { name: "quote-storage" },
  ),
)

interface InvoiceState {
  invoices: Invoice[]
  createInvoiceFromQuote: (quote: QuoteRequest) => Invoice
  getInvoiceForQuote: (quoteId: string) => Invoice | undefined
}

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      invoices: mockInvoiceHistory,
      createInvoiceFromQuote: (quote) => {
        const invoice: Invoice = {
          invoiceId: `INV-${Date.now().toString().slice(-5)}`,
          quoteId: quote.id,
          customer: quote.name,
          items: quote.items,
          amount: quote.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          ),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ invoices: [invoice, ...state.invoices] }))
        return invoice
      },
      getInvoiceForQuote: (id) => get().invoices.find((inv) => inv.quoteId === id),
    }),
    { name: "invoice-storage" },
  ),
)
