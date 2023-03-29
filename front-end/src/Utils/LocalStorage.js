const CART_ITEMS = 'cartItems';
const USER = 'user';

export function getProductsCart() {
  const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS));
  return cartItems;
}
export function addProductCart(product) {
  const data = getProductsCart() || [];
  const newData = data.filter((p) => p.id !== product.id);
  if (product.quantity === 0) {
    return localStorage.setItem(CART_ITEMS, JSON.stringify(newData));
  }
  return localStorage.setItem(CART_ITEMS, JSON.stringify([...newData, product]));
}

export function managerCart() {

}

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
