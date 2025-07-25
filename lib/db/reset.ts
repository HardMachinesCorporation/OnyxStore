import * as dotenv from 'dotenv'
import postgres from 'postgres'

dotenv.config()

const sql = postgres(process.env.DATABASE_URL as string, { max: 1 })

async function resetDatabase() {
  console.log('🧨 resetting database')
  await sql`DROP SCHEMA public CASCADE;`
  await sql`CREATE SCHEMA public;`
  console.log('✅ Done.')
  await sql.end()
}

await resetDatabase()
