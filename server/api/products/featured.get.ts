import { db } from '~/lib/db'
import { ProductsTable } from '~/lib/db/schema'
import type { FeaturedProduct } from '~/lib/db/schema'
import { doesTableExist } from '~/server/utils/db/isEmpty'
import { handleSelectError } from '~/server/utils/sqlErrors'

export default defineEventHandler(async (event) => {
  if (!await doesTableExist('products')) {
    const publicMessage = 'Database is empty. Table "products" does not exist. Please seed the database.'
    console.error(publicMessage)
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'the Database is empty',
      data: publicMessage,
      fatal: true, // Marque cette erreur comme critique
    }))
  }

  try {
    const response = await db
      .select({
        id: ProductsTable.id,
        title: ProductsTable.title,
        price: ProductsTable.price,
        description: ProductsTable.description,
        image: ProductsTable.image,
        discount: ProductsTable.discount,

      })
      .from(ProductsTable)
      .limit(4)

    // const randomDiscount = Math.floor(Math.random() * 10) + 1
    return response.map(product => ({
      id: product.id,
      title: product.title,
      originalPrice: product.price, // Price without discount
      price: product.price,
      description: product.description ?? '',
      image: product.image,
      rating: (() => Math.floor(Math.random() * 5) + 1)(),
      onSale: product.discount !== null,
      // Because discountedPrice is of type number | null

      // use -> applyDiscountedCents(Percentage, productPrice)
    })) satisfies FeaturedProduct[]
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
