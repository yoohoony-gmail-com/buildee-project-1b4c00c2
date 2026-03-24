import apiClient from '../config/api'
import { Cart, CartItem } from '../types/index'

export const getCart = async (): Promise<Cart> => {
  const { data } = await apiClient.get<Cart>('/cart')
  return data
}

export const addCartItem = async (productId: string, quantity: number): Promise<Cart> => {
  const { data } = await apiClient.post<Cart>('/cart/items', { productId, quantity })
  return data
}

export const updateCartItem = async (itemId: string, quantity: number): Promise<CartItem> => {
  const { data } = await apiClient.put<CartItem>(`/cart/items/${itemId}`, { quantity })
  return data
}

export const removeCartItem = async (itemId: string): Promise<void> => {
  await apiClient.delete(`/cart/items/${itemId}`)
}