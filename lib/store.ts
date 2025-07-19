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
  fetchLeads: () => Promise<void>
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => Promise<void>
  updateLead: (id: string, lead: Partial<Lead>) => Promise<void>
  updateLeadStatus: (id: string, status: Lead["status"]) => Promise<void>
  addNote: (id: string, note: string) => Promise<void>
  deleteLead: (id: string) => Promise<void>
}

export const useLeadStore = create<LeadState>((set, get) => ({
  leads: [],
  fetchLeads: async () => {
    const res = await fetch("/api/leads")
    const data = await res.json()
    set({ leads: data })
  },
  addLead: async (lead) => {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    })
    if (res.ok) {
      const newLead = await res.json()
      set((state) => ({ leads: [newLead, ...state.leads] }))
    }
  },
  updateLead: async (id, updatedLead) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLead),
    })
    if (res.ok) {
      const updated = await res.json()
      set((state) => ({
        leads: state.leads.map((lead) => (lead.id === id ? updated : lead)),
      }))
    }
  },
  updateLeadStatus: async (id, status) => {
    const lead = get().leads.find((l) => l.id === id)
    if (!lead) return
    await get().updateLead(id, { status })
    if (status === "ปิดการขาย") {
      const { addCustomer } = useCustomerStore.getState()
      addCustomer({
        name: lead.customerName,
        phone: lead.phone,
        from: "lead",
        contactCount: lead.notes ? lead.notes.length : 1,
      })
    }
  },
  addNote: async (id, note) => {
    const lead = get().leads.find((l) => l.id === id)
    if (!lead) return
    const notes = [...(lead.notes ?? []), note]
    await get().updateLead(id, { notes })
  },
  deleteLead: async (id) => {
    const res = await fetch(`/api/leads/${id}`, { method: "DELETE" })
    if (res.ok) {
      set((state) => ({ leads: state.leads.filter((lead) => lead.id !== id) }))
    }
  },
}))

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
  fetchQuotes: () => Promise<void>
  addQuote: (
    quote: Omit<QuoteRequest, "id" | "createdAt" | "status">
  ) => Promise<void>
  updateStatus: (id: string, status: QuoteRequest["status"]) => Promise<void>
}

export const useQuoteStore = create<QuoteState>((set, get) => ({
  quotes: [],
  fetchQuotes: async () => {
    const res = await fetch("/api/quotes")
    const data = await res.json()
    set({ quotes: data })
  },
  addQuote: async (quote) => {
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote),
    })
    if (res.ok) {
      const newQuote = await res.json()
      set((state) => ({ quotes: [newQuote, ...state.quotes] }))
    }
  },
  updateStatus: async (id, status) => {
    const res = await fetch(`/api/quotes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      const updated = await res.json()
      set((state) => ({
        quotes: state.quotes.map((q) => (q.id === id ? updated : q)),
      }))
      if (status === "ปิดการขาย") {
        const { addCustomer } = useCustomerStore.getState()
        const quote = get().quotes.find((q) => q.id === id) || updated
        addCustomer({
          name: quote.name,
          phone: quote.phone,
          from: "quote",
          contactCount: 1,
        })
      }
    }
  },
}))

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

import type { ChatMessage, SupportTicket } from './mockData'

interface LiveChatState {
  messages: ChatMessage[]
  fetchMessages: () => Promise<void>
  sendMessage: (sender: 'customer' | 'agent', message: string) => Promise<void>
}

export const useLiveChatStore = create<LiveChatState>((set) => ({
  messages: [],
  fetchMessages: async () => {
    const res = await fetch('/api/livechat')
    const data = await res.json()
    set({ messages: data })
  },
  sendMessage: async (sender, message) => {
    const res = await fetch('/api/livechat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender, message }),
    })
    if (res.ok) {
      const msg = await res.json()
      set((state) => ({ messages: [...state.messages, msg] }))
    }
  },
}))

interface TicketState {
  tickets: SupportTicket[]
  fetchTickets: () => Promise<void>
  createTicket: (data: { customer: string; message: string }) => Promise<void>
  closeTicket: (id: string) => void
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  fetchTickets: async () => {
    const res = await fetch('/api/tickets')
    const data = await res.json()
    set({ tickets: data })
  },
  createTicket: async (data) => {
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const ticket = await res.json()
      set((state) => ({ tickets: [ticket, ...state.tickets] }))
    }
  },
  closeTicket: (id) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, status: 'closed' } : t,
      ),
    })),
}))
