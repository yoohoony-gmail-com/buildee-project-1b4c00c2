import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import { Product } from '../../types/index'
import { formatPrice, calculateDiscount } from '../../utils/formatPrice'
import { useCart } from '../../hooks/useCart'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart()

  const discount =
    product.discountPrice !== null
      ? calculateDiscount(product.price, product.discountPrice)
      : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
  }

  return (
    <div className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <img
          src={
            product.images[0] ||
            `https://placehold.co/300x200/1a1a2e/e0e0e0?text=${encodeURIComponent(product.name)}`
          }
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {discount > 0 && (
          <div className="absolute top-3 left-3">
            <Badge variant="discount">{discount}% OFF</Badge>
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-3 right-3">
            <Badge variant="info">추천</Badge>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">품절</span>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-gray-500 text-xs mb-1">{product.category.name}</p>
          <Link to={`/products/${product.id}`}>
            <h3 className="text-white font-semibold text-base hover:text-blue-400 transition-colors line-clamp-2 mb-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 mb-3">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-gray-500 text-xs">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            {product.discountPrice !== null ? (
              <>
                <span className="text-blue-400 font-bold text-lg">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-gray-500 text-sm line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-blue-400 font-bold text-lg">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart size={16} />
            {product.stock === 0 ? '품절' : '장바구니 담기'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard