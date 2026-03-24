import { useState, useEffect, useCallback } from 'react'
import { Product } from '../types/product'
import { productApi } from '../api/productApi'

interface UseProductsResult {
  products: Product[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useProducts(category: string = '전체'): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productApi.getProductsByCategory(category)
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '상품을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}