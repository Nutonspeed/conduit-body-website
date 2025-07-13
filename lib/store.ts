import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, Lead } from "./mockData"
import { products as initialProducts, mockLeads } from "./mockData"

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

// Lead Store
interface LeadState {
  leads: Lead[]
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void
  updateLead: (id: string, lead: Partial<Lead>) => void
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
