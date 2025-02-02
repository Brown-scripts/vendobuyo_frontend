import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../api/client';
import ShopFilter from '../components/ShopFilter';

function ShopProducts() {
  const { shopid } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await client.get(`/api/products/shop/${shopid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please check your internet connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [shopid]);

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
          onClick={() => fetchProducts()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        {/* <h2 className="text-3xl font-extrabold text-gray-800">Shop Products</h2> */}
        <ShopFilter />
      </div>
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
                <p className="text-gray-500 text-sm">
                  {product.description.substring(0, 50)}...
                </p>
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

export default ShopProducts;