import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import type {InferSelectModel} from "drizzle-orm";

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar('first_name',{ length: 255 }).notNull(),
  lastName: varchar('last_name',{ length: 255 }).notNull(),
  password: varchar('password').notNull(),
  email: varchar('email',{ length: 255 }).notNull().unique(),
})

export type User = InferSelectModel<typeof usersTable>
