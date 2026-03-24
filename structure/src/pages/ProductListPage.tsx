import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilter from '../components/product/ProductFilter'
import Pagination from '../components/ui/Pagination'
import Spinner from '../components/ui/Spinner'
import { ProductFilterParams, Product } from '../types/index'

// Mock data fallback
const generateMockProducts = (count: number): Product[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `상품 ${i + 1}`,
    description: `상품 ${i + 1}의 상세 설명입니다.`,
    price: Math.floor(Math.random() * 90000) + 10000,
    discountPrice: i % 3 === 0 ? Math.floor((Math.random() * 90000 + 10000) * 0.8) : null,
    images: [`https://placehold.co/300x200/1a1a2e/e0e0e0?text=Product+${i + 1}`],
    category: {
      id: `cat-${(i % 4) + 1}`,
      name: ['전자기기', '패션', '식품', '스포츠'][(i % 4)],
      slug: ['electronics', 'fashion', 'food', 'sports'][(i % 4)],
    },
    stock: i % 5 === 4 ? 0 : Math.floor(Math.random() * 50) + 1,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 500),
    isFeatured: i < 4,
    createdAt: new Date().toISOString(),
  }))

const MOCK_PRODUCTS = generateMockProducts(20)

const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '')

  const [filters, setFilters] = useState<ProductFilterParams>({
    page: Number(searchParams.get('page')) || 1,
    pageSize: 12,
    category: searchParams.get('category') ?? undefined,
    search: searchParams.get('search') ?? undefined,
    sortBy: (searchParams.get('sortBy') as ProductFilterParams['sortBy']) ?? 'newest',
    featured: searchParams.get('featured') === 'true' ? true : undefined,
  })

  const { data, isLoading, isError } = useProducts(filters)

  const products = data?.data ?? (isError ? MOCK_PRODUCTS : [])
  const totalPages = data?.totalPages ?? (isError ? Math.ceil(MOCK_PRODUCTS.length / 12) : 1)

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.page && filters.page > 1) params.set('page', String(filters.page))
    if (filters.category) params.set('category', filters.category)
    if (filters.search) params.set('search', filters.search)
    if (filters.sortBy) params.set('sortBy', filters.sortBy)
    if (filters.featured) params.set('featured', 'true')
    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  const handleFilterChange = (newFilters: ProductFilterParams) => {
    setFilters({ ...newFilters, pageSize: 12 })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters((prev) => ({ ...prev, search: searchInput || undefined, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {filters.featured ? '추천 상품' : '전체 상품'}
        </h1>
        {data && (
          <p className="text-gray-400">
            총 <span className="text-blue-400 font-semibold">{data.total}</span>개의 상품
          </p>
        )}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="상품 검색..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
          >
            검색
          </button>
        </div>
      </form>

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <ProductFilter filters={filters} onFilterChange={handleFilterChange} />

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter row */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {isLoading ? (
            <Spinner fullScreen size="lg" />
          ) : (
            <>
              <ProductGrid
                products={products}
                emptyMessage="검색 결과가 없습니다. 다른 조건으로 검색해보세요."
              />
              <Pagination
                currentPage={filters.page ?? 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductListPage