import type { AppEnvironement } from '~/types/app.env'

export function useAppEn(): AppEnvironement {
  const config = useRuntimeConfig()
  return (config.public.appEn as AppEnvironement)
}
