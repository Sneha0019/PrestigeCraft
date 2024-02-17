import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import WishlistContext from '../context/wishlists/WishlistContext';
import Wishlistitem from "./Wishlistitem"


const AddtoWishlist = (props) => {
       const {txtColor} = props;
        const navigate = useNavigate();
        const context = useContext(WishlistContext);
        const {wishlistproducts ,  getAllWishlistProduct} = context;
       

        useEffect(()=>{
          if(localStorage.getItem("token")){
            getAllWishlistProduct();
          }else{
            navigate("/login")
          }
     //eslint-disable-next-line
        }, []);
      
  return (
    <>
    <div className="container">
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
    {wishlistproducts.length>0? wishlistproducts.map(wishlistProduct=> {
      return <div className="col">
       { console.log("caling wishlistitem item")}
        <Wishlistitem key={wishlistProduct._id} wishlistProduct={wishlistProduct}/>
        </div>
    }):(   
    <div className="row w-100 mt-5">
      <h3 style={{color: txtColor}}>No items added to Wishlist!</h3>
    </div>

      )}
  </div>
  </div> 
  </>
  )

}

export default AddtoWishlist








