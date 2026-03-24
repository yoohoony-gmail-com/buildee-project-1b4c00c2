import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'
import { Product } from '../types/index'

export const useCart = () => {
  const { cart, addItem, removeItem, updateQuantity, clearCart } = useCartStore()

  const handleAddItem = useCallback(
    (product: Product, quantity = 1) => {
      addItem(product, quantity)
      toast.success(`${product.name}이(가) 장바구니에 추가되었습니다.`)
    },
    [addItem]
  )

  const handleRemoveItem = useCallback(
    (itemId: string, productName?: string) => {
      removeItem(itemId)
      toast.success(`${productName ?? '상품'}이(가) 장바구니에서 제거되었습니다.`)
    },
    [removeItem]
  )

  const handleUpdateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      updateQuantity(itemId, quantity)
    },
    [updateQuantity]
  )

  const handleClearCart = useCallback(() => {
    clearCart()
    toast.success('장바구니가 비워졌습니다.')
  }, [clearCart])

  return {
    cart,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
  }
}