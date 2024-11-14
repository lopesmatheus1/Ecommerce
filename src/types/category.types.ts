import Product from './product.types'

export interface Category {
  id: string
  name: string
  displayName: string
  imageUrl: string
  products: Product[]
}
