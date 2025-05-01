import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'

import { Toaster } from "react-hot-toast";
import { AuthProvider } from './context/AuthContext'; 

import Footer from './components/footer';
import Login from './components/Login';
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import ForgotPassword from "./components/ForgotPassword";
import ResendOtp from "./components/resend_otp";
import VerifyEmail from "./components/Verify_Email";



import { useAppContext } from './context/AppContext';
import AllProducts from './pages/allproduct';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';


const App =()=>{
  const isSellerPath =useLocation().pathname.includes("seller")
  const { showUserLogin } = useAppContext()
  return(
    <AuthProvider>
    <div>
     {isSellerPath ? null : <Navbar/>}
     {showUserLogin ? <Login/> :null}
     <Toaster/>
      <div className={`${isSellerPath ? "":"px-6md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<AllProducts/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>














          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
            <Route path="/verify-email/:username" element={<VerifyEmail />} />
            <Route path="/resend-otp" element={<ResendOtp />} />

        </Routes>
      </div>
      {!isSellerPath &&<Footer/>}
    </div>
    </AuthProvider>
  )
}
export default App
