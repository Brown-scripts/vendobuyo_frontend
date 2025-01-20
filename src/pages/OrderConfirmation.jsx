import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const { orderId } = location.state || null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-green-600 mb-6">
          Order Confirmation
        </h2>
        {orderId ? (
          <>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              Thank you for your order! Your order ID is:
              <span className="font-bold text-gray-800"> {orderId}</span>
            </p>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              You'll receive an email with the order details and tracking information once your order has been shipped.
            </p>
          </>
        ) : (
          <p className="text-lg text-red-600 mb-6">
            No order information available.
          </p>
        )}
        <Link
          to="/products"
          className="inline-block px-6 py-3 text-sm sm:text-base bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;
