import React, { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.id === action.payload._id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, id: action.payload._id, quantity: 1 }];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'EMPTY_CART':
      return []; // Return an empty array to clear the cart
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [error, setError] = useState(null);

  const addToCart = (product) => {
    try {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    } catch (err) {
      setError('Failed to add item to cart. Please try again.');
    }
  };

  const removeFromCart = (productId) => {
    try {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } catch (err) {
      setError('Failed to remove item from cart. Please try again.');
    }
  };

  const updateQuantity = (productId, quantity) => {
    try {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    } catch (err) {
      setError('Failed to update item quantity. Please try again.');
    }
  };

  const emptyCart = () => {
    try {
      dispatch({ type: 'EMPTY_CART' });
    } catch (err) {
      setError('Failed to empty the cart. Please try again.');
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getUniqueItemsCount = () => {
    return cart.length;
  };

  const clearError = () => setError(null);

  return (
    <CartContext.Provider value={{ dispatch, cart, addToCart, removeFromCart, updateQuantity, emptyCart, getTotalItems, getUniqueItemsCount, error, clearError }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
