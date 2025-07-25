import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'

export const ProductsTable = pgTable('products', {
  id: serial().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  price: integer('price').notNull(),
  description: varchar('description'),
  category: varchar('category'),
  brand: varchar('brand'),
  model: varchar('model'),
  color: varchar('color'),
  discount: integer('discount'),
  image: varchar('image').notNull(),
})

export type Product = InferSelectModel<typeof ProductsTable>
export type ProductDto = InferInsertModel<typeof ProductsTable>
