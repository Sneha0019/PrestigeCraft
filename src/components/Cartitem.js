import React, {useContext, useEffect, useState} from 'react'
import OrderContext from '../context/orders/OrderContext';

const Cartitem = (props) => {
  const context = useContext(OrderContext);
  const {updateOrder, deleteProductFromCart} = context;
  const { order, bgColor, txtColor} = props;
  console.log("came in thr cartitems lets showing order directly", order);
  console.log("camed at cartiemsss.",order.items[0].productUrl);
  const [quantity, setQuantity] = useState(1);

  //order id acquire for updating order
 const orderId = order._id;

  const [pricee, setPrice] = useState(order.items[0].price);
  const [totalPrice, setTotalPrice] = useState();
  const [addquantity, setControlQuantity] = useState(false);

  //original price of my item
  const orignalPrice = order.items[0].price;


  //handling remove item
 const handleTrash = async (e) =>{
  e.preventDefault();
  deleteProductFromCart(order._id);

 }


 //handling increment quantity
 const handleAdd = async (e) =>{
  e.preventDefault();
  setControlQuantity(true);
  console.log('current price is',pricee);
  console.log("ADD is clicked")
  setQuantity(quantity+1);
 }


 //handling decrement quantity
 const handleSub = async (e) =>{
  e.preventDefault();
  setControlQuantity(false);
  if(quantity-1===0){
    deleteProductFromCart(order._id);
  }else{
    setControlQuantity(false)
    setQuantity(quantity-1);
  }

 }

 useEffect(()=>{
  if(addquantity){

  setPrice(order.items[0].price * quantity);
  }else{
    setPrice(order.items[0].price / quantity);
  }
 },[quantity, pricee])


 useEffect(()=>{
  updateOrder(pricee, quantity, orignalPrice, orderId);
 },[pricee ,quantity, orignalPrice, orderId])


  return (
    <>
<div className="card mb-3 p-2 mt-5" style={{maxWidth: "540px"}}>
  <div className="row g-0">
    <div className="col-md-4 d-flex align-items-center">
      {
  order.items &&
  <img src={order.items[0].productUrl} className="img-fluid rounded-start" alt="..." />
}
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <div className="d-flex justify-content-between">
                                        <h5 className="card-title">{order.items[0].productName}</h5>
                                        <span>{quantity}</span>
                                    </div>

        <p className="card-text">Weight: {order.items[0].productWeight}</p>
        <p className="card-text">Price: ${pricee}</p>
       
        <p className="card-text"> <i onClick={handleTrash} className="fa-regular fa-trash-can" style={{ color: txtColor, cursor: 'pointer', display:'inline' }}></i> Remove  </p>
        <p className="card-text mx-1"> <i onClick={handleSub} className="fa-solid fa-square-minus" style={{ color: txtColor, cursor: 'pointer' }}></i> Quantity
                                            <i onClick={handleAdd} className="fa-solid fa-square-plus mx-1" style={{ color: txtColor, cursor: 'pointer' }}></i></p>
                                            
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default Cartitem
