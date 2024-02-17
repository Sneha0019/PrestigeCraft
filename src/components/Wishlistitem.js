import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WishlistContext from "../context/wishlists/WishlistContext";
import OrderContext from "../context/orders/OrderContext";

const Wishlistitem = (props) => {

  const Ordercontext = useContext(OrderContext);
  const {orders, addInCart} = Ordercontext;

  const Wishlistcontext = useContext(WishlistContext);
  const {addInWishlist, removefromwishlist} = Wishlistcontext;


  const bgColor = "#FFE7E7";
  const txtColor = "#6D2932";
  const {wishlistProduct} = props;
  console.log("wishlist product..........", wishlistProduct);
  console.log("wishlistproduct url...........", wishlistProduct.items[0].productUrl)
  const product = wishlistProduct.items[0];
  const productId = product.productId;


  const navigate = useNavigate();
  const [isHeartClicked, setIsHeartClicked] = useState("fa-solid fa-heart");

   
  const handleClick = ()=>{
    console.log("going to product details",product);
    navigate('/productdetails',{ 
      state: {product: product}
    });
    
  }



  // const handleAddToCart = async(e)=>{
  //   e.preventDefault();
  //   if(localStorage.getItem('token')){
  //     console.log("in wishlist item sending product to addiN CART....", product)
  //     const res = await addInCart(product);
  //     navigate("/addtocart") 
  //   }else{
  //      navigate("/login")
  //   }
  // }



  const handleWishList = async(e) =>{
    e.preventDefault();
    if(localStorage.getItem('token')){
      if(isHeartClicked==="fa-solid fa-heart"){
        const res = await removefromwishlist(wishlistProduct._id)
      }
     
      navigate("/wishlist")
    }else{
      navigate("/login");
    }
    
  }



  return (
    <>
      <div className="my-3">
        <div className="card shadow-sm" style={{borderRadius:20}}>
          <img
            src={wishlistProduct.items[0].productUrl}
            className="card-img-top " onClick={handleClick} style={{borderRadius:"2.5rem", cursor: 'pointer', padding: '2rem'}}
            alt="..."
            
          />
          <i onClick={handleWishList} className={isHeartClicked} style={{position:'absolute', top:'10px', right:'10px', zIndex: '1', cursor:'pointer', color: txtColor}}></i>
          <div className="card-body">
            <h5 className="card-title">{wishlistProduct.items[0].productName}</h5>
            <p className="card-text">${wishlistProduct.items[0].price}</p>
            <div className="d-grid gap-2">
              <button className="btn" type="button" style={{ backgroundColor: bgColor, color: txtColor }}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlistitem;
