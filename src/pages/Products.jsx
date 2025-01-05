import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import client from '../api/client';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await client.get("/api/products");

      // Assuming the data you want is in response.data
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(
        "Failed to fetch products. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 mb-4 font-semibold">{error}</p>
        <button
          onClick={fetchProducts}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Our Products
      </h2>
      {products.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-500 mb-4">
            No products available at the moment. Check back soon!
          </p>
          <Link to="/" className="text-blue-500 font-semibold hover:underline">
            Browse other categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-500 text-sm">{product.description}</p>
                <p className="text-xl font-bold text-blue-600 mt-2">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
