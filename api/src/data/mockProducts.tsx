import type {
  Product,
  Category,
  Cart,
  Order,
  PaginatedResponse,
  ProductFilterParams,
} from '../types/index'

export const mockCategories: Category[] = [
  { id: '1', name: '전체', slug: 'all' },
  { id: '2', name: '전자기기', slug: 'electronics' },
  { id: '3', name: '패션', slug: 'fashion' },
  { id: '4', name: '홈리빙', slug: 'homeliving' },
  { id: '5', name: '스포츠', slug: 'sports' },
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: '프리미엄 블루투스 이어폰',
    description: '고음질 무선 이어폰으로 최고의 음악 경험을 즐기세요. 노이즈 캔슬링 기능과 30시간 배터리 수명을 자랑합니다.',
    price: 99000,
    discountPrice: 89000,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=Earphone',
      'https://placehold.co/600x400/2a2a3e/e0e0e0?text=Earphone+Side',
    ],
    category: mockCategories[1],
    stock: 50,
    rating: 4.5,
    reviewCount: 128,
    isFeatured: true,
    createdAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '2',
    name: '스마트 워치 프로',
    description: '건강 관리와 스타일을 동시에 챙기는 스마트 워치. 심박수, 혈중 산소, GPS 기능 내장.',
    price: 220000,
    discountPrice: 199000,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=SmartWatch',
      'https://placehold.co/600x400/2a2a3e/e0e0e0?text=SmartWatch+Side',
    ],
    category: mockCategories[1],
    stock: 30,
    rating: 4.7,
    reviewCount: 95,
    isFeatured: true,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: '캐주얼 백팩',
    description: '일상과 여행 모두에 어울리는 다용도 백팩. 방수 소재와 넉넉한 수납공간.',
    price: 65000,
    discountPrice: 55000,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=Backpack',
    ],
    category: mockCategories[2],
    stock: 80,
    rating: 4.3,
    reviewCount: 67,
    isFeatured: false,
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '4',
    name: '무선 충전 패드',
    description: '빠르고 편리한 15W 무선 충전을 경험하세요. 다중 기기 동시 충전 지원.',
    price: 35000,
    discountPrice: null,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=Charger',
    ],
    category: mockCategories[1],
    stock: 120,
    rating: 4.2,
    reviewCount: 203,
    isFeatured: false,
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: '5',
    name: '아로마 캔들 세트',
    description: '집안을 향기롭게 꾸며주는 프리미엄 아로마 캔들. 라벤더, 바닐라, 시트러스 3종 세트.',
    price: 28000,
    discountPrice: null,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=Candle',
    ],
    category: mockCategories[3],
    stock: 60,
    rating: 4.6,
    reviewCount: 44,
    isFeatured: true,
    createdAt: '2024-02-05T00:00:00Z',
  },
  {
    id: '6',
    name: '프리미엄 요가 매트',
    description: '미끄럼 방지 천연 고무 소재로 안전하게 운동하세요. 6mm 두께로 관절 보호.',
    price: 52000,
    discountPrice: 42000,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=YogaMat',
    ],
    category: mockCategories[4],
    stock: 45,
    rating: 4.4,
    reviewCount: 88,
    isFeatured: false,
    createdAt: '2024-02-10T00:00:00Z',
  },
  {
    id: '7',
    name: '레더 슬림 지갑',
    description: '고급 천연 가죽으로 제작된 슬림 지갑. RFID 차단 기능으로 카드 정보 보호.',
    price: 78000,
    discountPrice: 68000,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=Wallet',
    ],
    category: mockCategories[2],
    stock: 35,
    rating: 4.8,
    reviewCount: 156,
    isFeatured: true,
    createdAt: '2024-02-15T00:00:00Z',
  },
  {
    id: '8',
    name: '미니 블루투스 스피커',
    description: '작지만 강력한 사운드의 포터블 스피커. IPX7 방수 등급으로 야외 사용 가능.',
    price: 85000,
    discountPrice: 75000,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=Speaker',
    ],
    category: mockCategories[1],
    stock: 25,
    rating: 4.5,
    reviewCount: 112,
    isFeatured: true,
    createdAt: '2024-02-20T00:00:00Z',
  },
  {
    id: '9',
    name: '스포츠 러닝화',
    description: '가볍고 통기성 좋은 러닝화. 충격 흡수 미드솔로 장거리 러닝에 최적.',
    price: 120000,
    discountPrice: 98000,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=RunningShoes',
    ],
    category: mockCategories[4],
    stock: 40,
    rating: 4.6,
    reviewCount: 73,
    isFeatured: false,
    createdAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '10',
    name: '원목 디퓨저',
    description: '자연스러운 원목 디자인의 초음파 가습 디퓨저. 7가지 LED 무드등 내장.',
    price: 45000,
    discountPrice: null,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=Diffuser',
    ],
    category: mockCategories[3],
    stock: 55,
    rating: 4.3,
    reviewCount: 39,
    isFeatured: false,
    createdAt: '2024-03-05T00:00:00Z',
  },
  {
    id: '11',
    name: '캐시미어 머플러',
    description: '부드러운 캐시미어 100% 소재의 고급 머플러. 다양한 컬러 선택 가능.',
    price: 89000,
    discountPrice: null,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=Muffler',
    ],
    category: mockCategories[2],
    stock: 20,
    rating: 4.7,
    reviewCount: 28,
    isFeatured: false,
    createdAt: '2024-03-10T00:00:00Z',
  },
  {
    id: '12',
    name: '4K 웹캠',
    description: '재택근무와 스트리밍을 위한 4K 해상도 웹캠. 자동 화이트밸런스 및 노이즈 캔슬링 마이크 내장.',
    price: 150000,
    discountPrice: 135000,
    images: [
      'https://placehold.co/600x400/1a1a2e/e0e0e0?text=Webcam',
    ],
    category: mockCategories[1],
    stock: 15,
    rating: 4.4,
    reviewCount: 61,
    isFeatured: true,
    createdAt: '2024-03-15T00:00:00Z',
  },
]

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchProducts(
  params: ProductFilterParams = {}
): Promise<PaginatedResponse<Product>> {
  await delay(300)

  let filtered = [...mockProducts]

  if (params.category && params.category !== 'all') {
    filtered = filtered.filter((p) => p.category.slug === params.category)
  }

  if (params.search) {
    const q = params.search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }

  if (params.minPrice !== undefined) {
    filtered = filtered.filter(
      (p) => (p.discountPrice ?? p.price) >= params.minPrice!
    )
  }

  if (params.maxPrice !== undefined) {
    filtered = filtered.filter(
      (p) => (p.discountPrice ?? p.price) <= params.maxPrice!
    )
  }

  if (params.featured) {
    filtered = filtered.filter((p) => p.isFeatured)
  }

  if (params.sortBy) {
    switch (params.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price))
        break
      case 'price_desc':
        filtered.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price))
        break
      case 'newest':
        filtered.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
    }
  }

  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 8
  const total = filtered.length
  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize
  const data = filtered.slice(start, start + pageSize)

  return { data, total, page, pageSize, totalPages }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(200)
  return mockProducts.find((p) => p.id === id) ?? null
}

export async function fetchCategories(): Promise<Category[]> {
  await delay(100)
  return mockCategories
}

export const mockCart: Cart = {
  id: 'cart-1',
  items: [],
  totalPrice: 0,
  totalItems: 0,
}

export async function fetchCart(): Promise<Cart> {
  await delay(150)
  return { ...mockCart }
}

export const mockOrders: Order[] = []