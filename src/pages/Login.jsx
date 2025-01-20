import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { randomColor } from '../utils/fxns';
import UserContext from '../context/UserContext';
import { ROLES } from '../utils/constants';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser, setUserProfile } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUserProfile = async (token) => {
    try {
      const response = await client.get("/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to load user profile. Please try again later.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await client.post('/api/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.setItem('token', response.data.token);
      setUser(response.data.token);

      const userData = await fetchUserProfile(response.data.token);
      if (userData?.role === ROLES.buyer) {
        navigate('/products');
      } else {
        navigate('/sellerDashboard');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden px-4">
      {/* Background text */}
      <div className="absolute z-[1] w-full grid grid-cols-7 gap-y-20">
        {Array(480).fill(null).map((_, index) => {
          const color = randomColor();
          return (
            <div
              key={index}
              className="transform text-lg sm:text-xl font-black rotate-[-30deg]"
              style={{ color }}
            >
              VendoBuyo
            </div>
          );
        })}
      </div>

      {/* Form container */}
      <div className="relative max-w-md w-full z-[2] mx-auto mt-16 sm:mt-20 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-600 mb-6">
          Start Shopping
        </h2>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6"
            role="alert"
          >
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm sm:text-lg font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm sm:text-lg font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 sm:py-3 rounded-lg font-bold text-white transition-all ${loading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
              }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
