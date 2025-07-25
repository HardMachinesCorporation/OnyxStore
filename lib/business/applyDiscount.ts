import type { Cents } from '~/lib/business/cents'

/**
 * Applies a percentage discount to a price in dollars.
 * - Internally converts dollars to cents (BigInt)
 * - Computes the discount and rounds to the nearest cent
 *
 * @param discountPercent Discount rate (0–100)
 * @param price Original price in dollars (e.g. 19.99)
 * @returns Final amount in cents (BigInt)
 */
export function applyDiscountedCents(
  discountPercent: number,
  price: number,
): Cents {
  // 1. Dollars → centimes (arrondi au centime le plus proche)
  const priceCents = BigInt(Math.round(price * 100))
  // 2. Facteur de réduction en BigInt (100% − discountPercent)
  const factor = BigInt(100) - BigInt(discountPercent)
  // 3. Application du facteur + arrondi (on ajoute 50n pour le "demi‑centime")
  return (priceCents * factor + 50n) / 100n
}
