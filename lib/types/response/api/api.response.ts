import type { ProductDto } from '~/lib/db/schema'

export type ApiResponse = {
  status: string
  message: string
  products: Array<ProductDto>
}
