import { isNotNull } from 'drizzle-orm'

import { db } from '~/lib/db'
import { ProductsTable } from '~/lib/db/schema'
import type { ProductType } from '~/lib/types/products/product'
import { passThisEventIfDatabaseReady } from '~/server/utils/db/isEmpty'
import { handleSelectError } from '~/server/utils/sqlErrors'

export default defineEventHandler(async (event) => {
  // 0. Check if DB is not Empty, if it is, return clean Error for UI/UX
  await passThisEventIfDatabaseReady(event)

  const page = 3
  const pageSize = 21
  const offset = (page - 1) * pageSize

  //  1. GET only all products where the Category column is Not NULL
  try {
    const response = await db
      .select({
        id: ProductsTable.id,
        title: ProductsTable.title,
        price: ProductsTable.price,
        description: ProductsTable.description,
        image: ProductsTable.image,
        discount: ProductsTable.discount,
        category: ProductsTable.category,

      })
      .from(ProductsTable)
      .where(isNotNull(ProductsTable.category))
      .limit(pageSize)
      .offset(offset)

    //  2. TRANSFORM Returned Data to satisfy the shape of the UI Card (ProductType)
    const paginatedProducts: ProductType[] = response.map(product => ({
      id: product.id,
      title: product.title,
      originalPrice: product.price, // the originalPrice is the Price without a discount
      price: product.price,
      description: product.description ?? '',
      image: product.image,
      category: product.category,
      rating: (() => Math.floor(Math.random() * 5) + 1)(),
      onSale: product.discount !== null,

      // use -> applyDiscountedCents(Percentage, productPrice)
    })) satisfies ProductType[]

    //  3. EXTRACT the list of available Categories
    const categories = paginatedProducts.map(product => product.category)

    //  4. RETURN {data :ProductType[] , categories:string[] }
    return { data: paginatedProducts, categories: [...new Set(categories)] }
  }
  catch (error) {
    const resp = handleSelectError(error)
    if (resp) {
      throw createError({
        statusCode: 500,
        message: 'An error occurred contacting the database.',
        data: resp.body,
      })
    }
    throw error
  }
})
