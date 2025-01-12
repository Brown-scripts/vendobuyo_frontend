import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { ROLES } from '../utils/constants';

function Navbar() {
  const { user, setUser, userProfile } = useContext(UserContext);
  const { emptyCart, getTotalItems } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex justify-between h-20">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-10 w-auto" src="/logo.jpg" alt="Logo" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {
                user ?
                  <>
                    <Link to="/products" className="text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-3 py-2 text-base font-medium">
                      Products
                    </Link>
                    {
                      userProfile?.role == ROLES.buyer &&
                      <Link to="/cart" className="relative text-gray-500 border-gray-300 hover:text-gray-700 inline-flex items-center px-3 py-2 text-base font-medium">
                        <span className='mr-1.5'>Cart</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H19M7 13l-2 5m12 0h2M10 21a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {getTotalItems() ? <span className='absolute right-0 text-xs bg-rose-600 px-1 text-white ml-2 rounded-[0.3rem]'>{getTotalItems()}</span> : null}
                      </Link>
                    }
                  </>
                  :
                  <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-3 py-2 text-base font-medium"> {/* Increased font size */}
                    Home
                  </Link>
              }
            </div>
          </div>
          {
            user ?
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <div onClick={() => { localStorage.removeItem("token"); setUser(null); emptyCart(); navigate("/login") }} className="text-rose-500 cursor-pointer hover:text-gray-700 px-4 py-2 rounded-md text-base font-medium"> {/* Increased font size */}
                  Logout
                </div>
              </div>
              :
              <>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <Link to="/login" className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-base font-medium"> {/* Increased font size */}
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-base font-medium">
                    Register
                  </Link>
                </div>
              </>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
