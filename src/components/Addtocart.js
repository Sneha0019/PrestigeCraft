import React, {useContext, useEffect} from 'react'
import OrderContext from '../context/orders/OrderContext';
import Cartitem from './Cartitem'
import OrderSummary from './OrderSummary';
import { useNavigate } from 'react-router-dom';

const Addtocart = (props) => {
    const navigate = useNavigate();
    const { bgColor, txtColor} = props;
    const context = useContext(OrderContext);
    const {orders, getOrders} = context;
    console.log(orders)
    console.log("came into add to cart")


    useEffect(()=>{
      if(localStorage.getItem("token")){
        getOrders();
      }else{
        navigate("/login")
      }
 //eslint-disable-next-line
    }, []);
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex justify-content-center">
            <div style={{width: '100%'}}>
          {orders && orders.map((order) => {
            console.log("going to cartitem", order)
            return <Cartitem key={order._id} order={order} txtColor={txtColor} />;
          })}
          {orders.length===0 && 
          <div className="container mt-5">
          <h3 style={{color: txtColor}}>No orders to preview!</h3>
          </div>}
          </div>
          </div>
        </div>
        <div className="col-md-6 mt-5">
          <OrderSummary txtColor={txtColor}/>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Addtocart
