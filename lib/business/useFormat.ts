import type { Cents } from '~/lib/business/cents'

export function useFormat() {
  const formatCents = (priceCents: Cents): string => {
    const dollars = priceCents / 100n
    const cents = priceCents % 100n
    return `$${dollars}.${cents.toString().padStart(2, '0')}`
  }

  return { formatCents }
}
