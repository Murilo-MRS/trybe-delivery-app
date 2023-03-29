const CART_ITEMS = 'cartItems';
const USER = 'user';

export function getProductsCart() {
  const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS));
  return cartItems;
}
export function saveProductCart(product) {
  const data = getProductsCart() || [];
  localStorage.setItem(CART_ITEMS, JSON.stringify([...data, product]));
}

// Em analise
/* export function removeProductCart(product) {
  const products = getProductsCart();
  const productsFiltered = products.filter((p) => p.id !== product.id);
  localStorage.setItem(CART_ITEMS, JSON.stringify(productsFiltered));
} */
export function clearCart() {
  localStorage.setItem(CART_ITEMS, JSON.stringify([]));
}

export function logout() {
  localStorage.removeItem(CART_ITEMS);
  localStorage.removeItem(USER);
}

export function getUser() {
  const user = JSON.parse(localStorage.getItem(USER));
  return user;
}

export function saveUser(user) {
  localStorage.setItem(USER, JSON.stringify(user));
}
