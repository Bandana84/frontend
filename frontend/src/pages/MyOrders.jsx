import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyOrders } from '../assets/assets'
const MyOrders =()=>{
    const[myOrders,setMyOrders]=useState([])
    const {currency}=useAppContext()
    const fetchMyorders=async()=>{
        setMyOrders(dummyOrders)
    }
    useEffect(()=>{
        fetchMyorders()
    },[])
    return (
        <div className="">
<div className="">
    <p className="">My Orders</p>
    <div className="">

    </div>
</div>
{myOrders.map((order,index)=>(
    <div key={index} className="">
        <p className=""> 
            <span>OrderId:{order._id}</span>
            <span>Payment:{order._paymentType}</span>
            <span>TotalAmount:{currency}{order.amount}</span>
        </p>
        </div>
))}
        </div>

    )
}
export default MyOrders