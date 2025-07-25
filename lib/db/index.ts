import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL,
  },

})

export const sql = postgres(process.env.DATABASE_URL!, {
  max: 10, // ou max: 1 pour script CLI
  idle_timeout: 30, // ⏱️ auto close unused connexions
})
