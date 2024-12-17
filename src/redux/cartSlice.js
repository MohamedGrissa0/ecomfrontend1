import { createSlice } from '@reduxjs/toolkit';

// Helper function to calculate totals from cartItems
const calculateTotals = (cartItems) => {
  let totalQuantity = 0;
  let totalPrice = 0;

  cartItems.forEach(item => {
    totalQuantity += item.quantity;
    totalPrice += item.totalPrice;
  });

  return { totalQuantity, totalPrice };
};

// Retrieve and parse cart items from localStorage (only on the client side)
let storedCartItems = [];

if (typeof window !== "undefined") {
  const cartData = localStorage.getItem("cartItems");
  storedCartItems = cartData ? JSON.parse(cartData) : [];
}

const { totalQuantity, totalPrice } = calculateTotals(storedCartItems);

const initialState = {
  cartItems: storedCartItems,
  totalQuantity: totalQuantity || 0,
  totalPrice: totalPrice || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(i => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += item.price;
      } else {
        state.cartItems.push({ ...item, quantity: 1, totalPrice: item.price });
      }

      state.totalQuantity += 1;
      state.totalPrice += item.price;

      // Update localStorage (only in the browser)
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(i => i._id === itemId);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.cartItems = state.cartItems.filter(i => i._id !== itemId);

        // Update localStorage (only in the browser)
        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    },
    incQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(i => i._id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;

        state.totalQuantity += 1;
        state.totalPrice += existingItem.price;

        // Update localStorage (only in the browser)
        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(i => i._id === itemId);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.totalQuantity -= 1;
          state.totalPrice -= existingItem.totalPrice;
          state.cartItems = state.cartItems.filter(i => i.id !== itemId);
        } else {
          existingItem.quantity -= 1;
          existingItem.totalPrice -= existingItem.price;

          state.totalQuantity -= 1;
          state.totalPrice -= existingItem.price;
        }

        // Update localStorage (only in the browser)
        if (typeof window !== "undefined") {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;

      // Clear localStorage (only in the browser)
      if (typeof window !== "undefined") {
        localStorage.removeItem("cartItems");
      }
    },
  },
});

export const { addItem, removeItem, incQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
