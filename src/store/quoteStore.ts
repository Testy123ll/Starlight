import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuoteItem {
  productId: string;
  name: string;
  sku: string;
  qty: number;
  unitPrice: number;
  specs: string;
}

interface QuoteStore {
  items: QuoteItem[];
  addItem: (item: QuoteItem) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearQuote: () => void;
  get subtotal(): number;
  get vatAmount(): number;
  get total(): number;
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((state) => {
        const existing = state.items.find((i) => i.productId === item.productId);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.productId === item.productId ? { ...i, qty: i.qty + item.qty } : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),

      updateQty: (productId, qty) =>
        set((state) => ({
          items: state.items.map((i) => (i.productId === productId ? { ...i, qty } : i)),
        })),

      clearQuote: () => set({ items: [] }),

      get subtotal() {
        return get().items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
      },

      get vatAmount() {
        return get().subtotal * 0.075;
      },

      get total() {
        return get().subtotal + get().vatAmount;
      },
    }),
    { name: 'sdp-quote-cart' }
  )
);
