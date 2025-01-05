import React from 'react';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, dispatch } = useCart();

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg rounded-md">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is currently empty. Start shopping!</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4 bg-white rounded-lg shadow-sm px-4 mb-4"
            >
              <div>
                <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-all"
                >
                  -
                </button>
                <span className="mx-4 text-gray-800 font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-all"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-6 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition-all"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-blue-800">Total: ${total.toFixed(2)}</p>
            <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
