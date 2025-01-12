import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className='flex flex-col gap-2 mt-10 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 6h15l-1.5 10H7.5L6 6z"></path>
            <circle cx="10" cy="20" r="2"></circle>
            <circle cx="17" cy="20" r="2"></circle>
            <path d="M1 1h4l2 13h12l2-13h4"></path>
          </svg>
          <div className="flex items-center mt-2 text-center text-gray-500 font-extrabold">Cart Empty <span className='text-2xl'>😔</span></div>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4 bg-white rounded-lg shadow-sm px-4 mb-4"
            >
              <div>
                <h3 className="font-medium text-gray-800">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center mx-6">
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
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition-all"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 text-center">
            <p className="text-2xl font-bold text-blue-800">Total: ${total.toFixed(2)}</p>
            <div className='flex flex-col'>
              <button onClick={() => { navigate("/checkout") }} className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-all">
                Proceed to Checkout
              </button>
              <button onClick={() => { navigate("/products") }} className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all">
                Continue shopping
              </button>
            </div>
          </div>

        </>
      )}
    </div>
  );
}

export default Cart;
