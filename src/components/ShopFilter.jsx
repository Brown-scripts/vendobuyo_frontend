import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

function ShopFilter() {
  const [shops, setShops] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await client.get("/api/products/shops", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    fetchShops();
  }, []);

  const handleShopClick = (shopId) => {
    setIsOpen(false);
    navigate(`/shop/${shopId}`);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Filter by Shops
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-end">
          <div className="bg-white w-64 h-full shadow-xl p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              &#x2715;
            </button>
            <h2 className="text-xl font-bold mb-4">Shops</h2>
            <ul>
              {shops.map((shop) => (
                <li key={shop._id} className="mb-2">
                  <button
                    onClick={() => handleShopClick(shop._id)}
                    className="text-blue-600 hover:underline"
                  >
                    {shop.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopFilter;