import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '../../types/index'

interface ProductGridProps {
  products: Product[]
  emptyMessage?: string
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = '상품이 없습니다.',
}) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🛍️</div>
        <p className="text-gray-400 text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid