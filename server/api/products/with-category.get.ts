import { asc, isNotNull } from 'drizzle-orm'

import { db } from '~/lib/db'
import { ProductsTable } from '~/lib/db/schema'
import type { ProductType } from '~/lib/types/products/product'
import type { Paginated } from '~/lib/types/response/api/pagination'
import { passThisEventIfDatabaseReady } from '~/server/utils/db/isEmpty'
import { handleSelectError } from '~/server/utils/sqlErrors'

export default defineEventHandler(async (event) => {
  // ♠ TODO Fix pagination
  // 0. Check if DB is not Empty, if it is, return clean Error for UI/UX
  await passThisEventIfDatabaseReady(event)

  // 1) et parse les params
  const { page = '1', pageSize = '10' } = getQuery(event)
  const pageNum = Math.max(1, Number.parseInt(page as string, 10))
  const sizeNum = Math.max(1, Number.parseInt(pageSize as string, 10))
  const offset = (pageNum - 1) * sizeNum

  const whereClause = isNotNull(ProductsTable.category)

  //  1. GET only all products where the Category column is Not NULL
  try {
    const rows = await db
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
      .where(whereClause)
      .orderBy(asc(ProductsTable.id))
      .limit(sizeNum)
      .offset(offset)

    //  2. TRANSFORM Returned Data to satisfy the shape of the UI Card (ProductType)
    const table: ProductType[] = rows.map(product => ({
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
    const categories = table.map(product => product.category)

    // Calculate total page
    const totalPages = Math.ceil(table.length / sizeNum)

    const result: Paginated<ProductType> = {
      data: table,
      total: table.length,
      page: pageNum,
      pageSize: sizeNum,
      totalPages,
    }

    //  4. RETURN {paginatedData: Paginated<ProductType> , categories:string[] }
    return { paginatedData: result, categories: [...new Set(categories)] }
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
