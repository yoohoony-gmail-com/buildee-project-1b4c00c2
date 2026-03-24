import { useQuery } from '@tanstack/react-query'
import { getProducts, getFeaturedProducts } from '../api/productApi'
import { ProductFilterParams, PaginatedResponse, Product } from '../types/index'

export const useProducts = (params?: ProductFilterParams) => {
  return useQuery<PaginatedResponse<Product>>({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  })
}

export const useFeaturedProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products', 'featured'],
    queryFn: getFeaturedProducts,
  })
}