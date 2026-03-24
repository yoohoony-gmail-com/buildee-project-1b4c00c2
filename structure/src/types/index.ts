export interface Category {
  id: string
  name: string
  slug: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountPrice: number | null
  images: string[]
  category: Category
  stock: number
  rating: number
  reviewCount: number
  isFeatured: boolean
  createdAt: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  subtotal: number
}

export interface Cart {
  id: string
  items: CartItem[]
  totalPrice: number
  totalItems: number
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled'

export interface ShippingAddress {
  name: string
  phone: string
  address: string
  detailAddress: string
  zipCode: string
}

export interface Order {
  id: string
  items: CartItem[]
  totalPrice: number
  status: OrderStatus
  shippingAddress: ShippingAddress
  createdAt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ProductFilterParams {
  page?: number
  pageSize?: number
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating'
  featured?: boolean
}