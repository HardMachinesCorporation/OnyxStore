import type { AuthError } from '@supabase/auth-js'

import type { AddNotificationFn } from '~/types/notification'
import { ERROR_MESSAGES } from '~/types/supabase.error'

export function useAuthErrorHandler() {
  const addNotification = inject<AddNotificationFn>('addNotification') as AddNotificationFn

  function handleAuthError(error: AuthError) {
    const message = ERROR_MESSAGES[String(error.code)] || 'Something went wrong'

    addNotification(message, 'error')
  }

  return { handleAuthError }
}
