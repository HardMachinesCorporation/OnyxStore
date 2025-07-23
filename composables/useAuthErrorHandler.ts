import { isAuthError } from '@supabase/auth-js'
import type { AuthError } from '@supabase/auth-js'

import type { AddNotificationFn } from '~/types/notification'
import { ERROR_MESSAGES, LOGOUT_ERROR } from '~/types/supabase.error'

export function useAuthErrorHandler() {
  const addNotification = inject<AddNotificationFn>('addNotification') as AddNotificationFn

  function handleRegistrationError(error: AuthError) {
    const message = ERROR_MESSAGES[String(error.code)] || 'Something went wrong'

    addNotification(message, 'error')
  }

  function handleLogoutError(error: AuthError) {
    if (isAuthError(error)) {
      const message = LOGOUT_ERROR[Number(error.status)] || 'Something went wrong'

      addNotification(message, 'success')
    }
  }

  return { handleRegistrationError, handleLogoutError }
}
