import formatValues from './normalize';

const CART_ITEMS = 'cartItems';
const USER = 'user';
const TOTAL_PRICE = 'totalPrice';

export function getProductsCart() {
  const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS));
  return cartItems;
}

export function removeProductCart(product) {
  const data = getProductsCart() || [];
  const newData = data.filter((p) => p.id !== product.id);
  return localStorage.setItem(CART_ITEMS, JSON.stringify(newData));
}

export function addProductCart(product) {
  const data = getProductsCart() || [];
  const newData = data.filter((p) => p.id !== product.id);
  return localStorage.setItem(CART_ITEMS, JSON.stringify([...newData, product]));
}

export function saveTotalPrice(products) {
  const total = products
    .reduce((acc, { price, quantity }) => acc + (Number(price) * Number(quantity)), 0);
  localStorage.setItem(TOTAL_PRICE, formatValues(total));
  return formatValues(total);
}

export function getTotalPrice() {
  return localStorage.getItem(TOTAL_PRICE);
}

export function managerProductCart(product) {
  if (product.quantity === 0) {
    return removeProductCart(product);
  }
  return addProductCart(product);
}

export function clearCart() {
  return localStorage.setItem(CART_ITEMS, JSON.stringify([]));
}

export function logout() {
  localStorage.removeItem(CART_ITEMS);
  return localStorage.removeItem(USER);
}

export function getUser() {
  const user = JSON.parse(localStorage.getItem(USER));
  return user;
}

export function saveUser(user) {
  return localStorage.setItem(USER, JSON.stringify(user));
}
