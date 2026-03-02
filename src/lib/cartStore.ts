// Shopping cart management with localStorage persistence

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  category?: string;
  quantity: number;
  addedAt: number;
}

const CART_STORAGE_KEY = 'voltherm_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return [];
  // Migrate old items that may not have quantity
  const items: CartItem[] = JSON.parse(stored);
  return items.map(i => ({ ...i, quantity: i.quantity ?? 1 }));
}

export function saveCart(items: CartItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
}

export function addToCart(item: Omit<CartItem, 'addedAt' | 'quantity'>): boolean {
  const cart = getCart();
  
  // Check if item already exists
  if (cart.some(i => i.productId === item.productId)) {
    return false; // Already in cart
  }
  
  const newItem: CartItem = {
    ...item,
    quantity: 1,
    addedAt: Date.now()
  };
  
  cart.push(newItem);
  saveCart(cart);
  return true;
}

export function removeFromCart(productId: number) {
  const cart = getCart();
  const filtered = cart.filter(item => item.productId !== productId);
  saveCart(filtered);
}

/**
 * Set the quantity of an item in the cart.
 * If newQuantity <= 0, the item is removed automatically.
 */
export function updateCartItemQuantity(productId: number, newQuantity: number) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  const updated = cart.map(item =>
    item.productId === productId ? { ...item, quantity: newQuantity } : item
  );
  saveCart(updated);
}

export function isInCart(productId: number): boolean {
  const cart = getCart();
  return cart.some(item => item.productId === productId);
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount(): number {
  return getCart().length;
}
