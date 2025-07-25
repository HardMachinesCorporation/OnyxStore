export type ProductProps = {
  id: number
  brand: string
  price: number
  image: string
  description: string
  rating?: number
  category: string
  productType: string
  productColor?: { hex: string, colorNme: string }
  oldPrice?: number
  onSale?: boolean

}
/**
 * /**
 *
 *  "product_colors": [
 *       {
 *         "hex_value": "#B28378",
 *         "colour_name": "BFF Pencil"
 *       },
 *
 * **
 */
