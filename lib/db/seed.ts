import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { $fetch } from 'ofetch'

import { ProductsTable } from '~/lib/db/schema'
import type { ProductDto } from '~/lib/db/schema'
import type { ApiResponse } from '~/lib/types/response/api/api.response'

dotenv.config()

const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL,
  },

})

async function main() {
  const fakeApiURL = process.env.NUXT_FAKE_STORE_URL as string
  const data = await $fetch<ApiResponse>(
    fakeApiURL,
  )

  await db.transaction(async (trx) => {
    for (const product of data.products) {
      // Build a ProductDto
      const dto: ProductDto = {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        brand: product.brand,
        model: product.model,
        color: product.color,
        discount: product.discount,
        image: product.image,

      }

      await trx
        .insert(ProductsTable)
        .values(dto)
    }
  })
  console.log(`✅ Seed terminé : ${dtos.length} produits insérés.`)
  process.exit(0)
}

await main().catch((err) => {
  console.error('❌ Erreur lors du seed :', err)
  process.exit(1)
})
