import React, {useState} from 'react'
import OrderContext from './OrderContext'

const OrderState = (props) => {
    const host = 'https://ecommerce-website-full-stack-2.onrender.com';
    const [orders, setOrders] = useState([]);

    //----GET ALL PRODUCTS----
    const getOrders = async()=>{ 
            const response = await fetch(`${host}/api/orders/fetchorderdata`, {
                method: "GET",
                headers:{
                    "content-Type":"application/json",
                    "auth-token":localStorage.getItem('token')
                }
            });

            const data = await response.json();
            console.log(data);
            setOrders(data);

        
    }

    const addInCart = async(product) =>{
        try{
        const response = await fetch(`${host}/api/orders/addtocart`, {
            method:'POST',
            headers:{
                "content-Type":"application/json",
                "auth-token":localStorage.getItem('token')
            },


           
            body: JSON.stringify({"product":product}),

        });




        const newOrder = await response.json();
       if(newOrder.success){
        console.log("in new order after response", newOrder)
        setOrders(orders.concat(newOrder.order));
        
       }

       return newOrder;

     
    }catch(error){
        console.log("Error in adding item")
    }
    }
    
  

    //updating the order
    const updateOrder = async(totalprice, quantity, price, id) =>{
        //API CALL
        const response = await fetch(`${host}/api/orders/updatecart/${id}`, {
            method : "PUT",
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({"items": [{"price": price, "quantity": quantity}], "totalPrice": totalprice})
        });

        const data = await response.json();
        console.log(data);

        let newOrder = await JSON.parse(JSON.stringify(orders))

        setOrders(newOrder);
        getOrders();
    }


//deleting the order

    const deleteProductFromCart = async(id)=>{
        const response = await fetch(`${host}/api/orders/removeproduct/${id}`,{
            method: 'DELETE',
            headers: {
                "content-Type":"application/json",
                "auth-token":localStorage.getItem('token')
            },
        });
        const data = await response.json();
        const newOrders = orders.filter((order)=>{return order._id!==id});
        setOrders(newOrders);
    }
  return (
   <OrderContext.Provider value={{orders, getOrders, deleteProductFromCart, addInCart, updateOrder}}>
    {props.children}
   </OrderContext.Provider>
  )
}

export default OrderState
