import type { InferSelectModel } from 'drizzle-orm'
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar('firstName', { length: 255 }).notNull(),
  lastName: varchar('lastName', { length: 255 }).notNull(),
  password: varchar('password').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
})

export type User = InferSelectModel<typeof usersTable>
