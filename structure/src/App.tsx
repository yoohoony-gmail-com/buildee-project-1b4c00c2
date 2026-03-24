import { useState } from 'react'

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
    name: '프리미엄 헤드폰',
    description: '최고급 노이즈 캔슬링 무선 헤드폰',
    price: 299000,
    image: 'https://picsum.photos/seed/headphone/400/300',
    category: '전자기기',
  },
  {
    id: 2,
    name: '스마트 워치',
    description: '건강 관리 및 피트니스 트래킹 스마트워치',
    price: 189000,
    image: 'https://picsum.photos/seed/watch/400/300',
    category: '전자기기',
  },
  {
    id: 3,
    name: '캐주얼 재킷',
    description: '사계절 활용 가능한 세련된 캐주얼 재킷',
    price: 89000,
    image: 'https://picsum.photos/seed/jacket/400/300',
    category: '패션',
  },
  {
    id: 4,
    name: '운동화',
    description: '편안한 착화감의 경량 스포츠 운동화',
    price: 129000,
    image: 'https://picsum.photos/seed/shoes/400/300',
    category: '패션',
  },
  {
    id: 5,
    name: '아로마 디퓨저',
    description: '은은한 향기로 공간을 채우는 초음파 디퓨저',
    price: 45000,
    image: 'https://picsum.photos/seed/diffuser/400/300',
    category: '홈&리빙',
  },
  {
    id: 6,
    name: '요가 매트',
    description: '미끄럼 방지 친환경 소재 프리미엄 요가 매트',
    price: 59000,
    image: 'https://picsum.photos/seed/yoga/400/300',
    category: '스포츠',
  },
  {
    id: 7,
    name: '무선 충전기',
    description: '15W 고속 무선 충전 패드',
    price: 35000,
    image: 'https://picsum.photos/seed/charger/400/300',
    category: '전자기기',
  },
  {
    id: 8,
    name: '텀블러',
    description: '24시간 보온보냉 스테인리스 텀블러',
    price: 28000,
    image: 'https://picsum.photos/seed/tumbler/400/300',
    category: '홈&리빙',
  },
]

const categories = ['전체', '전자기기', '패션', '홈&리빙', '스포츠']

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [cart, setCart] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  const filteredProducts =
    selectedCategory === '전체'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product])
    setNotification(`${product.name}이(가) 장바구니에 추가되었습니다.`)
    setTimeout(() => setNotification(null), 2500)
  }

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white tracking-tight">🛍️ 쇼핑몰</h1>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 font-medium"
          >
            🛒 장바구니
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: '60vh', backgroundImage: 'url(https://picsum.photos/seed/hero/1600/900)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            최고의 상품을 만나보세요!
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            편리하고 다양한 상품을 합리적인 가격에 제공합니다.
          </p>
          <a
            href="#products"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            쇼핑 시작하기
          </a>
        </div>
      </div>

      {/* Category Filter */}
      <section id="products" className="max-w-7xl mx-auto w-full px-6 pt-10">
        <h2 className="text-2xl font-bold text-white mb-6">카테고리</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-md'
                  : 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 hover:bg-white/15 transition-all duration-300 shadow-md flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-3 flex-1">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-blue-400">
                    {product.price.toLocaleString()}원
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    담기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-center py-6 text-gray-500 text-sm mt-auto">
        <p>© 2024 쇼핑몰 사이트. 모든 권리 보유.</p>
      </footer>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-xl text-sm font-medium z-50 animate-bounce">
          ✅ {notification}
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <div className="w-full max-w-sm bg-[#1a1a1a] h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">🛒 장바구니</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
                  <span className="text-5xl">🛍️</span>
                  <p>장바구니가 비어있습니다.</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/5 rounded-xl p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-blue-400 text-sm font-bold">
                        {item.price.toLocaleString()}원
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-gray-500 hover:text-red-400 transition-colors text-lg"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 font-medium">총 합계</span>
                  <span className="text-white text-xl font-bold">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg">
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