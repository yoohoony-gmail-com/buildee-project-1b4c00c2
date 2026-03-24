import { useState } from 'react'
import { useCartStore } from '../store/cartStore'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

const products: Product[] = [
  {
    id: 1,
    name: '프리미엄 블루투스 이어폰',
    description: '고음질 무선 이어폰으로 최고의 음악 경험을 즐기세요.',
    price: 89000,
    image: 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=Earphone',
    category: '전자기기',
  },
  {
    id: 2,
    name: '스마트 워치',
    description: '건강 관리와 스타일을 동시에 챙기는 스마트 워치.',
    price: 199000,
    image: 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=SmartWatch',
    category: '전자기기',
  },
  {
    id: 3,
    name: '캐주얼 백팩',
    description: '일상과 여행 모두에 어울리는 다용도 백팩.',
    price: 55000,
    image: 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=Backpack',
    category: '패션',
  },
  {
    id: 4,
    name: '무선 충전 패드',
    description: '빠르고 편리한 무선 충전을 경험하세요.',
    price: 35000,
    image: 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=Charger',
    category: '전자기기',
  },
  {
    id: 5,
    name: '아로마 캔들 세트',
    description: '집안을 향기롭게 꾸며주는 프리미엄 아로마 캔들.',
    price: 28000,
    image: 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=Candle',
    category: '홈리빙',
  },
  {
    id: 6,
    name: '요가 매트',
    description: '미끄럼 방지 소재로 안전하게 운동하세요.',
    price: 42000,
    image: 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=YogaMat',
    category: '스포츠',
  },
  {
    id: 7,
    name: '레더 지갑',
    description: '고급 천연 가죽으로 제작된 슬림 지갑.',
    price: 68000,
    image: 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=Wallet',
    category: '패션',
  },
  {
    id: 8,
    name: '미니 블루투스 스피커',
    description: '작지만 강력한 사운드의 포터블 스피커.',
    price: 75000,
    image: 'https://placehold.co/300x200/1a1a2e/e0e0e0?text=Speaker',
    category: '전자기기',
  },
]

const categories = ['전체', '전자기기', '패션', '홈리빙', '스포츠']

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [cartOpen, setCartOpen] = useState(false)
  const [addedId, setAddedId] = useState<number | null>(null)

  const { items: cartItems, addItem, removeItem, isInCart, totalPrice } = useCartStore()

  const filteredProducts =
    selectedCategory === '전체'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  const handleAddToCart = (product: Product) => {
    addItem(product)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#e0e0e0]">
      {/* Header */}
      <header
        className="px-6 py-5 shadow-lg flex items-center justify-between"
        style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">
          🛍️ 쇼핑몰 사이트
        </h1>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all font-medium"
        >
          <span className="text-xl">🛒</span>
          <span>장바구니</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cartItems.length}
            </span>
          )}
        </button>
      </header>

      {/* Hero Section */}
      <div className="relative flex items-center justify-center" style={{ height: '60vh' }}>
        <img
          src="https://picsum.photos/1600/900?grayscale"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            최고의 상품을 만나보세요!
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            편리하고 다양한 상품을 합리적인 가격에 제공합니다.
          </p>
          <button
            onClick={() => {
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-3 rounded-full text-white font-semibold text-lg shadow-lg transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
          >
            쇼핑 시작하기
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <section id="products" className="px-8 pt-10 pb-4">
        <h2 className="text-2xl font-bold mb-6 text-white">상품 목록</h2>
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all border ${
                selectedCategory === cat
                  ? 'text-white border-transparent'
                  : 'bg-transparent border-white/20 text-gray-300 hover:bg-white/10'
              }`}
              style={
                selectedCategory === cat
                  ? { background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none' }
                  : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-8 pb-16">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-1">
                {product.category}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
              <p className="text-sm text-gray-400 flex-1">{product.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-bold text-blue-400">
                  {product.price.toLocaleString()}원
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    addedId === product.id
                      ? 'bg-green-500 text-white scale-95'
                      : isInCart(product.id)
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'text-white hover:scale-105'
                  }`}
                  style={
                    addedId === product.id || isInCart(product.id)
                      ? {}
                      : { background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }
                  }
                >
                  {addedId === product.id
                    ? '✓ 추가됨'
                    : isInCart(product.id)
                    ? '담김'
                    : '장바구니 담기'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-auto text-center py-6 bg-[#1a1a1a] text-gray-500 text-sm">
        <p>© 2024 쇼핑몰 사이트. 모든 권리 보유.</p>
      </footer>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/60"
            onClick={() => setCartOpen(false)}
          />
          <div className="w-full max-w-sm bg-[#1a1a1a] h-full flex flex-col shadow-2xl">
            <div
              className="px-6 py-5 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              <h2 className="text-xl font-bold text-white">🛒 장바구니</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-white hover:text-gray-200 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-16">
                  <p className="text-4xl mb-4">🛒</p>
                  <p>장바구니가 비어있습니다.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-center gap-4 rounded-xl p-3"
                      style={{ background: 'rgba(255,255,255,0.07)' }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm truncate">
                          {product.name}
                        </p>
                        <p className="text-blue-400 font-bold text-sm">
                          {product.price.toLocaleString()}원
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-red-400 hover:text-red-300 text-lg"
                        title="삭제"
                      >
                        🗑️
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300 font-medium">총 합계</span>
                  <span className="text-2xl font-bold text-white">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
                <button
                  className="w-full py-3 rounded-full text-white font-bold text-lg transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
                  onClick={() => alert('결제 기능은 준비 중입니다!')}
                >
                  결제하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}