import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrdersPage from './pages/userOrders';
import OrderDetailsPage from './pages/orderDetails';
import SellersOrdersPage from './pages/sellerOrders';
import ShopProducts from './pages/ShopProducts';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import SellerDashboard from './pages/SellerDashboard';
import { CartProvider } from './context/CartContext';
import './index.css';
import UserContext from './context/UserContext';
import { ROLES } from './utils/constants';

function App() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  const fetchUserProfile = async (token) => {
    setLoading(true)
    try {
      const response = await client.get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Assuming the user data is in response.data
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to load user profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setUser(token)
      fetchUserProfile(token)
    }
  }, [])

  if (loading) {
    <div className='text-center mt-10'>Loading, Please wait..</div>
  }

  return (
    <UserContext.Provider value={{ user, setUser, userProfile, setUserProfile }}>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="absolute z-[10]" id="modal-root"></div>
            <Navbar />
            <Routes>
              {
                user ?
                  <>
                    {
                      userProfile?.role == ROLES.buyer ?
                        <>
                          <Route path="/products" element={<Products />} />
                          <Route path="/products/:id" element={<ProductDetail />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/orders" element={<OrdersPage />} />
                          <Route path="/shop/:shopid" element={<ShopProducts />} />
                          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/order-confirmation" element={<OrderConfirmation />} />
                          <Route path="*" element={<Navigate to={"/products"} />} />
                        </> :
                        <>
                          <Route path="/seller/orders" element={<SellersOrdersPage />} />
                          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/seller-dashboard" element={<SellerDashboard />} />
                          <Route path="*" element={<Navigate to={"/seller-dashboard"} />} />
                        </>
                    }
                  </>
                  :
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to={"/"} />} />
                  </>

              }
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </UserContext.Provider>
  );
}

export default App;

