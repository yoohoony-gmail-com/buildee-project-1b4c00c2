import { useState, useEffect, useCallback } from 'react'
import type { Product, PaginatedResponse, ProductFilterParams } from '../types/index'
import { fetchProducts } from '../data/mockProducts'

interface UseProductListReturn {
  products: Product[]
  total: number
  page: number
  totalPages: number
  loading: boolean
  error: string | null
  params: ProductFilterParams
  setParams: (params: Partial<ProductFilterParams>) => void
  refetch: () => void
}

export function useProductList(
  initialParams: ProductFilterParams = {}
): UseProductListReturn {
  const [params, setParamsState] = useState<ProductFilterParams>({
    page: 1,
    pageSize: 8,
    ...initialParams,
  })
  const [result, setResult] = useState<PaginatedResponse<Product>>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 8,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchProducts(params)
      .then((res) => {
        if (!cancelled) {
          setResult(res)
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
  }, [params, tick])

  const setParams = useCallback((next: Partial<ProductFilterParams>) => {
    setParamsState((prev) => ({ ...prev, ...next, page: next.page ?? 1 }))
  }, [])

  const refetch = useCallback(() => setTick((t) => t + 1), [])

  return {
    products: result.data,
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
    loading,
    error,
    params,
    setParams,
    refetch,
  }
}