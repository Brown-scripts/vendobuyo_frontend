import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";
import { ROLES } from "../utils/constants"; 

function OrderDetailsPage({ userProfile }) {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await client.get(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    console.log("Order State Updated:", order);
  }, [order]);

  const handleGoBack = () => {
    if (userProfile?.role === ROLES.buyer) {
      navigate("/orders");
    } else if (userProfile?.role === ROLES.seller) {
      navigate("/seller/orders");
    }
  };

  if (loading) return <div className="text-center text-gray-500 py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;
  if (!order) return <div className="text-center text-gray-600 py-10">Order not found</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <button
        onClick={handleGoBack}
        className="text-blue-600 hover:underline mb-4"
      >
        Go Back
      </button>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <p className="text-sm text-gray-500">Order ID: {order._id}</p>
        <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">Email: {order.userId?.email}</p>
        <p className="text-sm text-gray-500">Phone: {order.userId?.phone}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <ul className="space-y-2">
            {order.products.map((item, index) => (
              <li key={index} className="border p-2 rounded-lg">
                <p className="font-medium">Product ID: {item.productId?._id}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-500">Price: ${item.price}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <p className="text-lg font-semibold">Total Price: ${order.totalPrice}</p>
          <p className="text-sm text-gray-500">Status: {order.status}</p>
        </div>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;