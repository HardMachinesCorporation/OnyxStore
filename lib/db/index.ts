import { drizzle } from 'drizzle-orm/postgres-js'

const config = useRuntimeConfig()
const db = drizzle({
  connection: {
    url: process.env.DATABASE_URL,
  },

})

export default db
