import { useState, useEffect } from 'react'
import type { Product } from '../types/index'
import { fetchProductById } from '../data/mockProducts'

interface UseProductDetailReturn {
  product: Product | null
  loading: boolean
  error: string | null
}

export function useProductDetail(id: string | undefined): UseProductDetailReturn {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchProductById(id)
      .then((p) => {
        if (!cancelled) {
          setProduct(p)
          if (!p) setError('상품을 찾을 수 없습니다.')
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '상품을 불러오지 못했습니다.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return { product, loading, error }
}