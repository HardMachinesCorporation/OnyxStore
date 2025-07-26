import type { H3Event } from 'h3'

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

export async function passThisEventIfDatabaseReady(event: H3Event) {
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
}
