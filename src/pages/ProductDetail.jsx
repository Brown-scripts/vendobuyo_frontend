import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import client from '../api/client';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await client.get(`/api/products/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming the data you want is in response.data
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (!product) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-gray-800">
        {product.title}
      </h2>
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-80 object-cover mb-6 rounded-lg shadow-md"
      />
      <div className="mb-6">
        <p className="text-2xl text-green-600 font-semibold">
          ${product.price.toFixed(2)}
        </p>
        <p className="mt-2 text-gray-700">{product.description}</p>
      </div>
      <div className="mb-6 text-gray-500">
        <p>
          In stock:{" "}
          <span className="text-gray-800 font-medium">
            {product.stockQuantity}
          </span>
        </p>
      </div>
      <button className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition duration-300">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
