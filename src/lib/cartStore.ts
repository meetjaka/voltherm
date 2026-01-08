// Shopping cart management with localStorage persistence

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  category?: string;
  addedAt: number;
}

const CART_STORAGE_KEY = 'voltherm_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(items: CartItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
}

export function addToCart(item: Omit<CartItem, 'addedAt'>): boolean {
  const cart = getCart();
  
  // Check if item already exists
  if (cart.some(i => i.productId === item.productId)) {
    return false; // Already in cart
  }
  
  const newItem: CartItem = {
    ...item,
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
