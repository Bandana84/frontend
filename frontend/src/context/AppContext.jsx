import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { dummyProducts }from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.VITE_CURRENCY; // fixed .env access
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})
    // const [user, setUser] = useState(() => {
    //     const storedUser = localStorage.getItem("user");
    //     return storedUser ? JSON.parse(storedUser) : null;
    //   });
      

    // Fetch all products
    const fetchProducts = async () => {
        setProducts(dummyProducts); // Make sure dummyProducts is available
    };

    // Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    };

    // Update cart item quantity
    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated Successfully!")
    };

    // Remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }  
        }
        toast.success("Removed from Cart")
        setCartItems(cartData)
    };
    //Get Cart Item Count
    const getCartCount =()=>{
        let totalCount =0;
        for(const item in cartItems){
            totalCount+=cartItems[item];
        
        }
        return totalCount;

    }
    // get Cart Total Amout
    const getCartAmount =()=>{
        let totalAmount =0;
        for(const items in cartItems){
            let itemInfo =products.find((product)=>product._id===items);
  if (cartItems[items]>0){
    totalAmount += itemInfo.offerPrice * cartItems[items]
  }
        }
        return Math.floor(totalAmount**100)/100;

    }

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts()
    }, []);

    const value = {
        navigate,
        user,
        setUser,
        setIsSeller,
        isSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        getCartAmount,
        getCartCount
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
