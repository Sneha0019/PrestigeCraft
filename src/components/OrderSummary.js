import React, { useContext } from 'react'
import OrderContext from '../context/orders/OrderContext';
import {loadStripe} from '@stripe/react-stripe-js'

const OrderSummary = (props) => {
    const context = useContext(OrderContext)
    const {orders}  = context;
    
     console.log("order summmaryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy...", orders)
     
     let calPrice = 0;
     const caltotalPrice = orders.map((order)=>{
        console.log("total price is",order.totalPrice)
        calPrice += order.totalPrice;
     })

     const deliveryFee = calPrice>1? 0.50: 0;
     
    const {txtColor} = props;


  return (
    <>
          <div className="col-md-10 d-flex justify-content-flex-end">
                <div className="container mt-2 flex-end" style={{ backgroundColor: '#f4F3F3', padding:25 }}>
                    <h4 className='mt-2 mb-3' style={{ color: txtColor }}>ORDER SUMMARY</h4>
                    <div className="d-flex">
                        <div className="container text-flex-start">
                            <p>Subtotal</p>
                            <p>Delivery Charge</p>
                            <h6 style={{ color: txtColor }}>TOTAL (Inc of all Taxes.)</h6>
                        </div>

                        <div className="container text-flex-end">
                            <p>$ {calPrice}</p>
                            <p>$ {deliveryFee}</p>
                            <h6 style={{ color: txtColor }}>$ {calPrice+deliveryFee}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-2 p-0 d-flex' >
            <a class="btn p-1 btn-lg flex-end" href="#" role="button"  style={{backgroundColor: txtColor, color: "#fff", width: '83.5%'}}>Pay Now</a>
            </div>
        </>
    
  )
}

export default OrderSummary
