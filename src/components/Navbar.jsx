import { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import UserContext from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { ROLES } from '../utils/constants';
import Search from './Search';


function Navbar() {
  const { user, setUser, userProfile } = useContext(UserContext);
  const { emptyCart, getTotalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMobileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
    localStorage.removeItem('token');
    setUser(null);
    emptyCart();
    navigate('/login');
  };

  const handleDropdownNavigation = (path) => {
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
    if (path === '/orders') {
      navigate(userProfile?.role === ROLES.seller ? '/seller/orders' : '/orders');
    } else {
      navigate(path);
    }
  };

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

          {/* Search Bar in the Middle */}
          {user && (
            <div className="hidden md:flex flex-1 justify-center">
              <Search />
            </div>
          )}

          {/* Auth Links / User Dropdown and Cart */}
          <div className="hidden md:flex md:items-center space-x-4">
            {user ? (
              <>
                {userProfile?.role === ROLES.buyer && (
                  <Link
                    to="/cart"
                    className="relative flex items-center text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium"
                  >
                    <FaShoppingCart className="mr-1" />
                    <span>Cart</span>
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 text-xs bg-rose-600 text-white px-1 rounded-full">
                        {getTotalItems()}
                      </span>
                    )}
                  </Link>
                )}

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center text-gray-700 hover:text-gray-900 px-4 py-2 text-base font-medium focus:outline-none"
                  >
                    <span>{userProfile?.name || 'User'}</span>
                    {userProfile?.role === ROLES.seller && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Seller
                      </span>
                    )}
                    <svg
                      className={`ml-2 h-4 w-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                      <button
                        onClick={() => handleDropdownNavigation('/profile')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => handleDropdownNavigation('/orders')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-rose-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-500 hover:text-gray-700 px-4 py-2 text-base font-medium">Login</Link>
                <Link to="/register" className="text-gray-500 hover:text-gray-700 px-4 py-2 text-base font-medium">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user && <Search />}
            {user && (
              <>
                <Link to="/cart" className="block text-gray-500 hover:text-gray-700 px-3 py-2 text-base font-medium">Cart</Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                    className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-base font-medium focus:outline-none w-full"
                  >
                    <span>{userProfile?.name || 'User'}</span>
                    {userProfile?.role === ROLES.seller && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Seller
                      </span>
                    )}
                    <svg
                      className={`ml-2 h-4 w-4 transform transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isMobileDropdownOpen && (
                    <div className="mt-2 w-full bg-white shadow-lg rounded-lg py-2 z-50">
                      <button
                        onClick={() => handleDropdownNavigation('/profile')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => handleDropdownNavigation('/orders')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-rose-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;