import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartProduct {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface CartState {
  items: CartProduct[]
  addItem: (product: CartProduct) => void
  removeItem: (id: number) => void
  clearCart: () => void
  isInCart: (id: number) => boolean
  totalPrice: number
  totalItems: number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get()
        if (!items.find((item) => item.id === product.id)) {
          set({ items: [...items, product] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      clearCart: () => set({ items: [] }),
      isInCart: (id) => !!get().items.find((item) => item.id === id),
      get totalPrice() {
        return get().items.reduce((sum, item) => sum + item.price, 0)
      },
      get totalItems() {
        return get().items.length
      },
    }),
    { name: 'cart-storage' }
  )
)