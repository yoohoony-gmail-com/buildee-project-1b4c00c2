import apiClient from '../config/api'
import { Order, ShippingAddress } from '../types/index'

export interface CreateOrderPayload {
  shippingAddress: ShippingAddress
  cartId?: string
}

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  const { data } = await apiClient.post<Order>('/orders', payload)
  return data
}

export const getOrderById = async (id: string): Promise<Order> => {
  const { data } = await apiClient.get<Order>(`/orders/${id}`)
  return data
}