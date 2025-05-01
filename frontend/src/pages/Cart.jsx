import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyAddress } from "../assets/assets";

const Cart = () => {
    const [showAddress, setShowAddress] = useState(false);
    const { products, currency, cartItems, removeFromCart, getCartCount, updateCartItem, navigate, getCartAmount } = useAppContext();
    
    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([dummyAddress]);
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState("COD");

    const placeOrder = async () => {
        // Place order logic
    };

    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            product.quantity = cartItems[key];
            tempArray.push(product);
        }
        setCartArray(tempArray);
    };

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Cart Items Section */}
            <div className="flex-1 md:pr-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Your Cart <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full ml-2">{getCartCount()} items</span>
                    </h1>
                    <button 
                        onClick={() => { navigate("/products"); scrollTo(0, 0) }}
                        className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                        <span>Continue Shopping</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-[2fr_1fr_1fr] bg-gray-50 px-6 py-4 text-gray-600 font-medium">
                        <p>Product Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>

                    {cartArray.map((product, index) => (
                        <div 
                            key={index} 
                            className="grid grid-cols-[2fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div 
                                    onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }}
                                    className="cursor-pointer w-20 h-20 flex-shrink-0 rounded-lg bg-white border border-gray-200 overflow-hidden"
                                >
                                    <img className="w-full h-full object-contain p-2" src={product.image[0]} alt={product.name} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800 line-clamp-1">{product.name}</p>
                                    <div className="text-sm text-gray-500 mt-1">
                                        <p>Weight: <span className="font-medium">{product.weight || "N/A"}</span></p>
                                        <div className="flex items-center mt-1">
                                            <span className="mr-2">Qty:</span>
                                            <select 
                                                onChange={e => updateCartItem(product._id, Number(e.target.value))} 
                                                value={cartItems[product._id]}
                                                className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                                            >
                                                {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index) => (
                                                    <option key={index} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center font-medium text-gray-700">{currency}{(product.offerPrice * product.quantity).toFixed(2)}</p>
                            <div className="flex justify-center">
                                <button 
                                    onClick={() => removeFromCart(product._id)}
                                    className="p-2 rounded-full hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Summary Section */}
            <div className="md:w-96 w-full mt-8 md:mt-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                    
                    {/* Delivery Address */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Delivery Address</h3>
                            <button 
                                onClick={() => setShowAddress(!showAddress)}
                                className="text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                                {showAddress ? 'Cancel' : 'Change'}
                            </button>
                        </div>
                        <div className="relative">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <p className="text-gray-700">
                                    {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : "No address found"}
                                </p>
                            </div>
                            {showAddress && (
                                <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                    {addresses.map((address, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => { setSelectedAddress(address); setShowAddress(false); }}
                                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                        >
                                            <p className="text-gray-700">
                                                {address.street}, {address.city}, {address.state}, {address.country}
                                            </p>
                                        </div>
                                    ))}
                                    <div 
                                        onClick={() => navigate("/add-address")}
                                        className="p-3 bg-primary/5 hover:bg-primary/10 cursor-pointer text-center text-primary font-medium transition-colors"
                                    >
                                        + Add New Address
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">Payment Method</h3>
                        <select 
                            onChange={e => setPaymentOption(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
                        >
                            <option value="COD">Cash On Delivery</option>
                            <option value="Online">Online Payment</option>
                        </select>
                    </div>

                    {/* Order Total */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-medium">{currency}{getCartAmount().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Tax (2%)</span>
                            <span className="font-medium">{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3 mt-3">
                            <div className="flex justify-between font-bold text-gray-800">
                                <span>Total</span>
                                <span>{currency}{(getCartAmount() * 1.02).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Button */}
                    <button 
                        onClick={placeOrder}
                        className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        {paymentOption === "COD" ? "Place Order" : "Proceed to Payment"}
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default Cart;