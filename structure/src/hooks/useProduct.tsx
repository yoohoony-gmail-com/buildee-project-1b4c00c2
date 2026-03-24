import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../api/productApi'
import { Product } from '../types/index'

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}