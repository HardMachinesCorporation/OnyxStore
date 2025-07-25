import { DrizzleQueryError } from 'drizzle-orm/errors'

export type SQLGETRequestErrorCode
    = | '42703'
      | '42P01'
      | '42501'
      | '22P02'
      | `${'08'}${string}`

export const errorCodeConfig: Record<SQLGETRequestErrorCode, { status: number, message: string }> = {
  '42703': { status: 400, message: 'Invalid Column' },
  '42P01': { status: 400, message: 'Table not found' },
  '42501': { status: 403, message: 'Permission denied for user' },
  '22P02': { status: 400, message: 'Invalid Format' },
} as const

/**
 * Handles and maps known Drizzle select query errors to HTTP-style response objects.
 *
 * This function checks whether the provided `error` is an instance of `DrizzleQueryError` and whether it
 * contains a recognized SQL error code (`SQLGETRequestErrorCode`). If the error code matches one defined in
 * `errorCodeConfig`, a corresponding HTTP status and message are returned. If the code starts with `'08'`,
 * it is considered a connection-related error and returns a generic `400` response.
 *
 * For all other unrecognized Drizzle errors, a `503 Service Unavailable` response is returned.
 * If the error does not match the expected Drizzle error shape, `null` is returned, signaling that the
 * error should be handled elsewhere.
 *
 * @param error - The error thrown during a Drizzle select operation. Expected to be of type `DrizzleQueryError`.
 * @returns An object with an HTTP-like `status` and `body`, or `null` if the error is not recognized.
 *
 * @example
 * const result = HandleSelectError(error);
 * if (result) {
 *   return new Response(JSON.stringify(result.body), { status: result.status });
 * }
 */
export function handleSelectError(error: unknown): { status: number, body: any } | null {
  if (error && error instanceof DrizzleQueryError && 'code' in error) {
    const code = error.code as SQLGETRequestErrorCode
    if (errorCodeConfig[code]) {
      return { status: errorCodeConfig[code].status, body: { error: errorCodeConfig[code].message } }
    }
    if (code.startsWith('08')) {
      return { status: 400, body: { error: 'connection Error' } }
    }
    return { status: 503, body: { error: 'Unknown Error' } }
  }
  return null
}
