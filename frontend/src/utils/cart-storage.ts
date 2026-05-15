const CART_KEY = "foodieflow_cart"

export type CartItems = Record<number, number>

export function getCartFromStorage(): CartItems {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as CartItems
  } catch {
    return {}
  }
}

export function saveCartToStorage(cart: CartItems): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  window.dispatchEvent(new Event("cartUpdated"))
}

export function getCartItemCount(): number {
  const cart = getCartFromStorage()
  return Object.values(cart).reduce((sum, count) => sum + count, 0)
}
