import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const { user, setUser, setShowUserLogin, navigate,setSearchQuery,searchQuery, getCartCount,login } = useAppContext();

    const logout = async () => {
        setUser(null);
        navigate('/');
    }

    useEffect(()=>{
if(searchQuery.length >0 ){
    navigate("/products")
}
    },[searchQuery])

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 shadow-sm border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <NavLink 
                        to='/' 
                        onClick={() => setOpen(false)}
                        className="flex items-center space-x-2 group"
                    >
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-indigo-600 group-hover:rotate-12 transition-transform duration-300">
                            <img className="h-7 w-7" src="/logo.svg" alt="logo" />
                        </div>
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
                            Farms2Basket
                        </h3>
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to='/' 
                            className={({ isActive }) => 
                                `relative px-1 py-2 text-sm font-medium transition-colors duration-300
                                ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`
                            }
                        >
                            Home
                            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </NavLink>
                        
                        <NavLink 
                            to='/products' 
                            className={({ isActive }) => 
                                `relative px-1 py-2 text-sm font-medium transition-colors duration-300
                                ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`
                            }
                        >
                            Shop
                        </NavLink>
                        
                        <NavLink 
                            to='/contact' 
                            className={({ isActive }) => 
                                `relative px-1 py-2 text-sm font-medium transition-colors duration-300
                                ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`
                            }
                        >
                            Contact
                        </NavLink>
                        
                        {/* Search Bar */}
                        <div className="hidden lg:flex items-center text-sm space-x-2 border border-gray-200 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-white focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
                            <input  onChange={(e) => setSearchQuery(e.target.value)}  
                                className="py-1 w-36 bg-transparent outline-none placeholder-gray-500 text-gray-700 focus:w-44 transition-all duration-300" 
                                type="text" 
                                placeholder="Search products" 
                            />
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                                <path d="M10.836 10.615 15 14.695" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Cart */}
                        <div 
                            onClick={() => navigate("/cart")} 
                            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                        >
                            
                <img src="/nav_cart_icon.svg" alt='cart' className='w-6 opacity-80'/> <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18p] rounded-full">{getCartCount()}</button>
                       </div>
                        {/* Auth */}
{!user ? (
  <button 
    onClick={() => setShowUserLogin(true)} 
    className="relative px-6 py-1.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
  >
    Login
    <span className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></span>
  </button>
) : (
  <div className="relative group">
    <div className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <img 
          src="profile_icon.png" 
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border-2 border-primary/30 hover:border-primary/60 transition-all duration-300" 
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </div>
      <span className="hidden lg:inline-block font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
        {user.name || user.email}
      </span>
    </div>

    <div className="hidden group-hover:block absolute top-12 right-0 bg-white shadow-lg border border-gray-100 py-2 w-48 rounded-xl z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-90"></div>
      <div className="relative z-10">
        {user.role === "customer" && (
          <div 
            onClick={() => navigate("/my-orders")} 
            className="px-4 py-2.5 hover:bg-primary/5 cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>My Orders</span>
          </div>
        )}

        <div 
          onClick={() => navigate("/forgot-password")} 
          className="px-4 py-2.5 hover:bg-primary/5 cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Account</span>
        </div>

        <div className="border-t border-gray-100 my-1"></div>

        <div 
          onClick={() => {
            localStorage.clear(); // Optional: clear tokens
            setUser(null);
            login(null); // Optional if login/logout sets role
            navigate("/"); // Redirect on logout
          }}
          className="px-4 py-2.5 hover:bg-primary/5 cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  


                    {/* Mobile menu button */}
                    <button 
                        onClick={() => setOpen(!open)} 
                        aria-label="Menu" 
                        className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200"
                    >
                        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" className="w-5 h-5">
                            <rect width="21" height="1.5" rx=".75" fill="currentColor" />
                            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="currentColor" />
                            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
  <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg">
    <div className="px-4 pt-2 pb-6 space-y-2">
      <NavLink 
        to="/" 
        onClick={() => setOpen(false)} 
        className={({ isActive }) => 
          `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
          ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/products" 
        onClick={() => setOpen(false)} 
        className={({ isActive }) => 
          `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
          ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`
        }
      >
        Shop
      </NavLink>
      
      {/* Mobile Cart Item */}
      <div 
        onClick={() => {
          setOpen(false);
          navigate("/cart");
        }}
        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
      >
        <div className="flex items-center w-full">
          <img src="/nav_cart_icon.svg" alt="cart" className="w-5 h-5 mr-3 opacity-80" />
          <span>Cart</span>
          <span className="ml-auto inline-flex items-center justify-center w-6 h-6 text-xs font-medium bg-primary text-white rounded-full">
            {getCartCount()}
          </span>
        </div>
      </div>

      {user && (
        <NavLink 
          to="/my-orders" 
          onClick={() => setOpen(false)} 
          className={({ isActive }) => 
            `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
            ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`
          }
        >
          My orders
        </NavLink>
      )}
      <NavLink 
        to="/contact" 
        onClick={() => setOpen(false)} 
        className={({ isActive }) => 
          `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
          ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`
        }
      >
        Contact
      </NavLink>
      
      <div className="pt-2">
        {!user ? (
          <button 
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="w-full px-4 py-2 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-md text-base font-medium shadow hover:shadow-md transition-all duration-300"
          >
            Login
          </button>
        ) : (
          <button 
            onClick={logout} 
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md text-base font-medium shadow hover:shadow-md transition-all duration-300"
          >
            Logout
            </button>   
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;  