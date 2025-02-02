import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

function SellerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await client.get('/api/orders/seller-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (err) {
        console.error('Error fetching seller orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 text-lg">{error}</div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        No orders found for your products
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800 text-center">
          Orders for Your Products
        </h2>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border rounded-lg p-6 hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Order #{order.orderId.slice(-6).toUpperCase()}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm 
                  ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Buyer Information:</h3>
                <p className="text-sm text-gray-600">{order.buyer.name}</p>
                <p className="text-sm text-gray-600">{order.buyer.email}</p>
                {order.buyer.phone && (
                  <p className="text-sm text-gray-600">{order.buyer.phone}</p>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Ordered Products:</h3>
                {order.products.map((item) => (
                  <div key={item.productId._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.productId.imageUrl}
                        alt={item.productId.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.productId.title}</p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × ${item.productId.price}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-800">
                      ${(item.quantity * item.productId.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => navigate(`/orders/${order.orderId}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerOrdersPage;


// import React from "react";
// import { useNavigate } from "react-router-dom";

// function SellersOrdersPage() {
//   const navigate = useNavigate();

//   const orders = [
//     {
//       _id: "order123456",
//       createdAt: "2025-01-30T12:34:56Z",
//       paymentStatus: "paid",
//       status: "completed",
//       totalAmount: 100.99,
//     },
//     {
//       _id: "order789012",
//       createdAt: "2025-01-28T10:15:30Z",
//       paymentStatus: "pending",
//       status: "processing",
//       totalAmount: 59.49,
//     },
//     {
//       _id: "order345678",
//       createdAt: "2025-01-25T08:45:20Z",
//       paymentStatus: "failed",
//       status: "cancelled",
//       totalAmount: 75.00,
//     },
//   ];

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-6">
//       <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800 text-center">
//           My Orders
//         </h2>

//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="border rounded-lg p-4 hover:shadow-md transition duration-300"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-sm text-gray-500">
//                   Order #{order._id.slice(-6).toUpperCase()}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </span>
//               </div>

//               <div className="flex justify-between items-center mb-2">
//                 <div className="space-x-2">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs 
//                     ${order.paymentStatus === "paid" ? "bg-green-100 text-green-800" : 
//                       order.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-800" : 
//                       "bg-red-100 text-red-800"}`}
//                   >
//                     {order.paymentStatus}
//                   </span>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs 
//                     ${order.status === "completed" ? "bg-green-100 text-green-800" : 
//                       order.status === "processing" ? "bg-blue-100 text-blue-800" : 
//                       "bg-red-100 text-red-800"}`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>

//                 <button
//                   onClick={() => navigate(`/orders/${order._id}`, { state: { order } })}
//                   className="bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 transition duration-300"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SellersOrdersPage;
