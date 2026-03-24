import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem, Product } from '../types/index'

interface CartStore {
  cart: Cart
  addItem: (product: Product, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const createEmptyCart = (): Cart => ({
  id: 'local-cart',
  items: [],
  totalPrice: 0,
  totalItems: 0,
})

const recalculate = (items: CartItem[]): { totalPrice: number; totalItems: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.subtotal, 0)
  return { totalItems, totalPrice }
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: createEmptyCart(),

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.items.find((item) => item.product.id === product.id)
          let newItems: CartItem[]

          const effectivePrice = product.discountPrice ?? product.price

          if (existingItem) {
            newItems = state.cart.items.map((item) =>
              item.product.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    subtotal: (item.quantity + quantity) * effectivePrice,
                  }
                : item
            )
          } else {
            const newItem: CartItem = {
              id: `${product.id}-${Date.now()}`,
              product,
              quantity,
              subtotal: quantity * effectivePrice,
            }
            newItems = [...state.cart.items, newItem]
          }

          const { totalItems, totalPrice } = recalculate(newItems)
          return {
            cart: {
              ...state.cart,
              items: newItems,
              totalItems,
              totalPrice,
            },
          }
        })
      },

      removeItem: (itemId: string) => {
        set((state) => {
          const newItems = state.cart.items.filter((item) => item.id !== itemId)
          const { totalItems, totalPrice } = recalculate(newItems)
          return {
            cart: {
              ...state.cart,
              items: newItems,
              totalItems,
              totalPrice,
            },
          }
        })
      },

      updateQuantity: (itemId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.cart.items.filter((item) => item.id !== itemId)
            const { totalItems, totalPrice } = recalculate(newItems)
            return {
              cart: { ...state.cart, items: newItems, totalItems, totalPrice },
            }
          }

          const newItems = state.cart.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  quantity,
                  subtotal: quantity * (item.product.discountPrice ?? item.product.price),
                }
              : item
          )
          const { totalItems, totalPrice } = recalculate(newItems)
          return {
            cart: { ...state.cart, items: newItems, totalItems, totalPrice },
          }
        })
      },

      clearCart: () => {
        set({ cart: createEmptyCart() })
      },

      getTotalItems: () => get().cart.totalItems,
      getTotalPrice: () => get().cart.totalPrice,
    }),
    {
      name: 'shopping-cart',
    }
  )
)