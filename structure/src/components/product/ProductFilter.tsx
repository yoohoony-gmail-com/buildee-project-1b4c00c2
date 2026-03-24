import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SlidersHorizontal, X } from 'lucide-react'
import { ProductFilterParams, Category } from '../../types/index'
import { getCategories } from '../../api/productApi'
import Button from '../ui/Button'

interface ProductFilterProps {
  filters: ProductFilterParams
  onFilterChange: (filters: ProductFilterParams) => void
}

const ProductFilter: React.FC<ProductFilterProps> = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState<ProductFilterParams>(filters)
  const [isOpen, setIsOpen] = useState(false)

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleApply = () => {
    onFilterChange({ ...localFilters, page: 1 })
    setIsOpen(false)
  }

  const handleReset = () => {
    const reset: ProductFilterParams = { page: 1, pageSize: filters.pageSize }
    setLocalFilters(reset)
    onFilterChange(reset)
    setIsOpen(false)
  }

  const sortOptions: { value: ProductFilterParams['sortBy']; label: string }[] = [
    { value: 'newest', label: '최신순' },
    { value: 'price_asc', label: '가격 낮은순' },
    { value: 'price_desc', label: '가격 높은순' },
    { value: 'rating', label: '평점순' },
  ]

  const filterContent = (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">정렬</h4>
        <div className="space-y-2">
          {sortOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="sortBy"
                value={opt.value}
                checked={localFilters.sortBy === opt.value}
                onChange={() => setLocalFilters({ ...localFilters, sortBy: opt.value })}
                className="accent-blue-500"
              />
              <span className="text-gray-400 group-hover:text-white text-sm transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      {categories.length > 0 && (
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">카테고리</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value=""
                checked={!localFilters.category}
                onChange={() => setLocalFilters({ ...localFilters, category: undefined })}
                className="accent-blue-500"
              />
              <span className="text-gray-400 group-hover:text-white text-sm transition-colors">
                전체
              </span>
            </label>
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  value={cat.slug}
                  checked={localFilters.category === cat.slug}
                  onChange={() => setLocalFilters({ ...localFilters, category: cat.slug })}
                  className="accent-blue-500"
                />
                <span className="text-gray-400 group-hover:text-white text-sm transition-colors">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">가격 범위</h4>
        <div className="space-y-3">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">최소 가격</label>
            <input
              type="number"
              placeholder="0"
              value={localFilters.minPrice ?? ''}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-600"
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">최대 가격</label>
            <input
              type="number"
              placeholder="제한 없음"
              value={localFilters.maxPrice ?? ''}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 placeholder-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button variant="primary" size="sm" fullWidth onClick={handleApply}>
          적용
        </Button>
        <Button variant="outline" size="sm" fullWidth onClick={handleReset}>
          초기화
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal size={18} className="text-blue-400" />
            <h3 className="text-white font-bold">필터</h3>
          </div>
          {filterContent}
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <SlidersHorizontal size={16} />
          필터
        </Button>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)} />
            <div className="relative ml-auto w-80 max-w-full bg-[#1a1a1a] border-l border-white/10 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-blue-400" />
                  <h3 className="text-white font-bold">필터</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              {filterContent}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductFilter