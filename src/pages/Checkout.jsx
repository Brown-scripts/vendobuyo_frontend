import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import client from '../api/client'

function Checkout() {
  const { cart, dispatch } = useCart();
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await client.post(
        '/api/orders',
        {
          products: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          totalPrice: total,
          shippingAddress: address,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Clear the cart
      cart.forEach((item) => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id }));

      navigate('/order-confirmation', { state: { orderId: response.data._id } });
    } catch (err) {
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-200 shadow-lg rounded-md">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Checkout</h2>
      {error && (
        <div className="text-center bg-red-100 text-red-700 p-3 rounded-md mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="address" className="block text-lg font-semibold mb-2">
            Shipping Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Order Summary</h3>
          <div className="bg-white rounded-lg shadow-md p-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-2">
                <span className="text-gray-800 font-medium">
                  {item.title} x {item.quantity}
                </span>
                <span className="text-gray-600 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="font-semibold text-lg text-gray-900 mt-4">
              Total: ${total.toFixed(2)}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-all"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
