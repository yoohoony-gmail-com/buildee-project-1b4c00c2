import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, ShoppingCart, Package, ArrowLeft, Minus, Plus } from 'lucide-react'
import { useProduct } from '../hooks/useProduct'
import { useCart } from '../hooks/useCart'
import ProductImageGallery from '../components/product/ProductImageGallery'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import { formatPrice, calculateDiscount } from '../utils/formatPrice'
import { Product } from '../types/index'

// Mock product for fallback
const createMockProduct = (id: string): Product => ({
  id,
  name: `상품 ${id}`,
  description: `이 상품은 최고의 품질을 자랑합니다. 다양한 용도로 활용 가능하며, 고객 만족을 위해 최선을 다해 제작되었습니다. 내구성이 뛰어나고 디자인이 세련되어 있어 선물로도 적합합니다.`,
  price: 59000,
  discountPrice: 45000,
  images: [
    `https://placehold.co/600x400/1a1a2e/e0e0e0?text=Product+${id}`,
    `https://placehold.co/600x400/1a1a3e/e0e0e0?text=Product+${id}+2`,
  ],
  category: { id: 'cat-1', name: '전자기기', slug: 'electronics' },
  stock: 15,
  rating: 4.5,
  reviewCount: 128,
  isFeatured: true,
  createdAt: new Date().toISOString(),
})

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading, isError } = useProduct(id ?? '')
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const displayProduct = product ?? (isError && id ? createMockProduct(id) : null)

  if (isLoading) {
    return <Spinner fullScreen size="xl" />
  }

  if (!displayProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 text-xl mb-4">상품을 찾을 수 없습니다.</p>
        <Link to="/products">
          <Button variant="primary">상품 목록으로</Button>
        </Link>
      </div>
    )
  }

  const discount =
    displayProduct.discountPrice !== null
      ? calculateDiscount(displayProduct.price, displayProduct.discountPrice)
      : 0

  const effectivePrice = displayProduct.discountPrice ?? displayProduct.price

  const handleAddToCart = () => {
    addItem(displayProduct, quantity)
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(displayProduct.stock, prev + delta))
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-white transition-colors">
          홈
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-white transition-colors">
          상품
        </Link>
        <span>/</span>
        <Link
          to={`/products?category=${displayProduct.category.slug}`}
          className="hover:text-white transition-colors"
        >
          {displayProduct.category.name}
        </Link>
        <span>/</span>
        <span className="text-white truncate max-w-[200px]">{displayProduct.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <ProductImageGallery
            images={displayProduct.images}
            productName={displayProduct.name}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="text-blue-400 text-sm font-medium">
              {displayProduct.category.name}
            </span>
            <h1 className="text-3xl font-bold text-white mt-1">{displayProduct.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.floor(displayProduct.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-600'
                  }
                />
              ))}
            </div>
            <span className="text-yellow-400 font-semibold">{displayProduct.rating}</span>
            <span className="text-gray-400 text-sm">
              ({displayProduct.reviewCount}개 리뷰)
            </span>
          </div>

          {/* Price */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-blue-400">
                {formatPrice(effectivePrice)}
              </span>
              {displayProduct.discountPrice !== null && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(displayProduct.price)}
                  </span>
                  <span className="bg-red-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
            {displayProduct.discountPrice !== null && (
              <p className="text-green-400 text-sm mt-1">
                {formatPrice(displayProduct.price - displayProduct.discountPrice)} 절약
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-white font-semibold mb-2">상품 설명</h3>
            <p className="text-gray-400 leading-relaxed">{displayProduct.description}</p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <Package size={18} className={displayProduct.stock > 0 ? 'text-green-400' : 'text-red-400'} />
            <span className={`text-sm font-medium ${displayProduct.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {displayProduct.stock > 0
                ? `재고 ${displayProduct.stock}개 남음`
                : '품절'}
            </span>
          </div>

          {/* Quantity */}
          {displayProduct.stock > 0 && (
            <div>
              <label className="text-white font-semibold block mb-2">수량</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-white font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= displayProduct.stock}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={16} />
                </button>
                <span className="text-gray-400 text-sm">
                  소계: {formatPrice(effectivePrice * quantity)}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              disabled={displayProduct.stock === 0}
            >
              <ShoppingCart size={20} />
              {displayProduct.stock === 0 ? '품절' : '장바구니 담기'}
            </Button>
            <Link to="/cart" className="flex-1">
              <Button variant="outline" size="lg" fullWidth>
                장바구니 보기
              </Button>
            </Link>
          </div>

          {/* Shipping info */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-sm text-green-400">
            🚚 50,000원 이상 구매 시 무료배송 | 일반 배송비 3,000원
          </div>

          {/* Back link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage