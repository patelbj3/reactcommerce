/**
 * This is an object that represents the state, it can be a good idea to
 * put it in a separate file so you can reference it easier. It returns the 
 * default products and an empty array as the cart, initialstate for 'cart'
 */

import store_items from './store_items.json'
if (localStorage.getItem("storage") === null) {
localStorage.setItem('storage', JSON.stringify(store_items));
}

export default {
	
  cart: [],
  products: JSON.parse(localStorage.getItem('storage'))
}