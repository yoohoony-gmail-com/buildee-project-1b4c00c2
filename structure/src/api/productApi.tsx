import apiClient from '../config/api'
import { Product, PaginatedResponse, ProductFilterParams, Category } from '../types/index'

export const getProducts = async (params?: ProductFilterParams): Promise<PaginatedResponse<Product>> => {
  const { data } = await apiClient.get<PaginatedResponse<Product>>('/products', { params })
  return data
}

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`)
  return data
}

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>('/products/featured')
  return data
}

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await apiClient.get<Category[]>('/categories')
  return data
}