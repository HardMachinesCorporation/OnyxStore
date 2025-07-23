export type NotificationType = 'success' | 'error' | 'warning'

export type INotification = {
  id: number
  message: string
  type: NotificationType
}
export type AddNotificationFn = (message: string, type?: NotificationType) => void
