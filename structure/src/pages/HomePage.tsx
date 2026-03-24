import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useFeaturedProducts, useProducts } from '../hooks/useProducts'
import HeroBanner from '../components/ui/HeroBanner'
import ProductGrid from '../components/product/ProductGrid'
import Spinner from '../components/ui/Spinner'

const MOCK_FEATURED_PRODUCTS = Array.from({ length: 8 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `상품 ${i + 1}`,
  description: `상품 ${i + 1}의 상세 설명입니다. 고품질 제품을 합리적인 가격에 제공합니다.`,
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

const HomePage: React.FC = () => {
  const { data: featuredData, isLoading: featuredLoading, isError: featuredError } = useFeaturedProducts()
  const { data: allData, isLoading: allLoading } = useProducts({ pageSize: 8 })

  // Use mock data as fallback when API is not available
  const featuredProducts = featuredData ?? (featuredError ? MOCK_FEATURED_PRODUCTS.slice(0, 4) : [])
  const recentProducts = allData?.data ?? MOCK_FEATURED_PRODUCTS

  const isLoading = featuredLoading && allLoading

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">추천 상품</h2>
            <p className="text-gray-400 mt-1">엄선된 인기 상품을 만나보세요</p>
          </div>
          <Link
            to="/products?featured=true"
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            전체 보기
            <ArrowRight size={16} />
          </Link>
        </div>

        {featuredLoading ? (
          <Spinner fullScreen size="lg" />
        ) : (
          <ProductGrid products={featuredProducts.slice(0, 4)} />
        )}
      </section>

      {/* Category Banner */}
      <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-y border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            카테고리별 쇼핑
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: '전자기기', emoji: '📱', slug: 'electronics' },
              { name: '패션', emoji: '👗', slug: 'fashion' },
              { name: '식품', emoji: '🍎', slug: 'food' },
              { name: '스포츠', emoji: '⚽', slug: 'sports' },
            ].map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="flex flex-col items-center justify-center p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 hover:-translate-y-1 group"
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </span>
                <span className="text-white font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">최신 상품</h2>
            <p className="text-gray-400 mt-1">새롭게 등록된 상품을 확인하세요</p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            전체 보기
            <ArrowRight size={16} />
          </Link>
        </div>

        {allLoading ? (
          <Spinner fullScreen size="lg" />
        ) : (
          <ProductGrid products={recentProducts.slice(0, 8)} />
        )}
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            특별 할인 혜택을 받아보세요!
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            지금 가입하면 첫 구매 10% 할인 쿠폰을 드립니다.
          </p>
          <Link to="/products">
            <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg">
              쇼핑 시작하기
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage