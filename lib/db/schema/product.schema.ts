import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import postgres from 'postgres'
import type { z } from 'zod'

// 📦 Table Drizzle
export const ProductsTable = pgTable('products', {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  title: varchar('title', { length: 255 }).notNull(),
  image: varchar('image').notNull(),
  price: integer('price').notNull(),
  description: varchar('description').notNull(),
  brand: varchar('brand'),
  model: varchar('model'),
  color: varchar('color'),
  category: varchar('category'),
  discount: integer('discount'),

})

// ✅ DTO TypeScript
const _ProductSchema = createSelectSchema(ProductsTable)
export type ProductDto = z.infer<typeof _ProductSchema>
// ❌ À éviter dans une app à fort trafic
const sql = postgres(process.env.DATABASE_URL!)

export type FeaturedProduct = {
  id?: number
  title: string
  description: string
  price: number
  originalPrice: number
  rating: number
  onSale: boolean
  image: string
}
