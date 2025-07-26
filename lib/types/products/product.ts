export type ProductType = {
  id?: number
  title: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  onSale?: boolean
  image: string
  category?: string | null
}
