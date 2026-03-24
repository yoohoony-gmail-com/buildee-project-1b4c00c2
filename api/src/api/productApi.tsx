import { Product } from '../types/product'
import { mockProducts } from '../data/mockProducts'

const SIMULATED_DELAY = 400

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const productApi = {
  async getProducts(): Promise<Product[]> {
    await delay(SIMULATED_DELAY)
    return [...mockProducts]
  },

  async getProductById(id: number): Promise<Product | undefined> {
    await delay(SIMULATED_DELAY)
    return mockProducts.find((p) => p.id === id)
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    await delay(SIMULATED_DELAY)
    if (category === '전체') return [...mockProducts]
    return mockProducts.filter((p) => p.category === category)
  },

  async getCategories(): Promise<string[]> {
    await delay(200)
    return ['전체', '전자기기', '패션', '홈리빙', '스포츠']
  },
}