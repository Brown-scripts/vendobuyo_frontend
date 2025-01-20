import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { ROLES } from '../utils/constants';

function Navbar() {
  const { user, setUser, userProfile } = useContext(UserContext);
  const { emptyCart, getTotalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo and App Name */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-10 w-auto" src="/logo.jpg" alt="Logo" />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                VendoBuyo
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {user ? (
              <>
                <Link
                  to="/products"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                >
                  Products
                </Link>
                {userProfile?.role === ROLES.buyer && (
                  <Link
                    to="/cart"
                    className="relative text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  >
                    <span>Cart</span>
                    {getTotalItems() > 0 && (
                      <span className="absolute right-0 top-0 text-xs bg-rose-600 text-white px-1 rounded-full">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                )}
              </>
            ) : null}
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex md:items-center">
            {user ? (
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  setUser(null);
                  emptyCart();
                  navigate('/login');
                }}
                className="text-rose-500 hover:text-gray-700 px-4 py-2 text-base font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-700 px-4 py-2 text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-500 hover:text-gray-700 px-4 py-2 text-base font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user ? (
                <>
                  <Link
                    to="/products"
                    className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  >
                    Products
                  </Link>
                  {userProfile?.role === ROLES.buyer && (
                    <Link
                      to="/cart"
                      className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                    >
                      Cart
                      {getTotalItems() > 0 && (
                        <span className="ml-2 text-xs bg-rose-600 text-white px-1 rounded-full">
                          {getTotalItems()}
                        </span>
                      )}
                    </Link>
                  )}
                </>
              ) : null}
              {user ? (
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    setUser(null);
                    emptyCart();
                    navigate('/login');
                  }}
                  className="block w-full text-left text-rose-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
