import { sql } from '~/lib/db'

export async function doesTableExist(tableName: string): Promise<boolean> {
  // 1. Validation du nom de table
  if (!/^[a-z_]\w*$/i.test(tableName)) {
    throw new Error('Invalid table name')
  }

  // 2. Requête SQL sécurisée avec le bon typage
  const result = await sql<[{ exists: boolean }]>`
        SELECT EXISTS (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'public'
              AND table_name = ${tableName}
        ) as "exists"
    `

  return result[0]?.exists ?? false
}
