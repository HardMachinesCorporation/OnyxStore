export type ProductProps = {
  id: number
  title: string
  discountedPrice: number
  description: string
  originalPrice: number
  image: string
  onSale?: boolean
  rating?: number
}
