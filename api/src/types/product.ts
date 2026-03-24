export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface CartItem {
  productId: number
  quantity: number
}

export type Category = '전체' | '전자기기' | '패션' | '홈리빙' | '스포츠'