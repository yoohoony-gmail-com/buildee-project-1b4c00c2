import { useState, useCallback } from 'react'
import { Product } from '../types/product'

interface UseCartResult {
  cartItems: number[]
  cartProducts: Product[]
  totalPrice: number
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  isInCart: (id: number) => boolean
}

export function useCart(allProducts: Product[]): UseCartResult {
  const [cartItems, setCartItems] = useState<number[]>([])

  const cartProducts = allProducts.filter((p) => cartItems.includes(p.id))
  const totalPrice = cartProducts.reduce((sum, p) => sum + p.price, 0)

  const addToCart = useCallback((id: number) => {
    setCartItems((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item !== id))
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const isInCart = useCallback(
    (id: number) => cartItems.includes(id),
    [cartItems]
  )

  return {
    cartItems,
    cartProducts,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
  }
}