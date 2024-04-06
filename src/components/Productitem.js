import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrderContext from "../context/orders/OrderContext";
import WishlistContext from "../context/wishlists/WishlistContext";

const Productitem = (props) => {
  const Ordercontext = useContext(OrderContext);
  const { addInCart } = Ordercontext;

  const Wishlistcontext = useContext(WishlistContext);
  const { addInWishlist } = Wishlistcontext;

  const bgColor = "#FFE7E7";
  const txtColor = "#6D2932";
  const { product } = props;

  const navigate = useNavigate();
  const [isHeartClicked, setIsHeartClicked] = useState("fa-regular fa-heart");

  const handleClick = () => {
    console.log("going to product details", product);
    navigate('/productdetails', {
      state: { product: product }
    });
  }

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      console.log("Adding product to cart:", product);
      const res = await addInCart(product);
      navigate("/addtocart");
    } else {
      navigate("/login");
    }
  }

  const handleWishList = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('token')) {
      if (isHeartClicked === "fa-regular fa-heart") { // If heart is not clicked, add to wishlist
        setIsHeartClicked("fa-solid fa-heart");
        const res = await addInWishlist(product);
        if (res.success) {
          navigate("/wishlist");
        }
      } else { // If heart is clicked, remove from wishlist
        setIsHeartClicked("fa-regular fa-heart");
        // Add logic to remove from wishlist
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="my-3">
      <div className="card shadow-sm" style={{ borderRadius: 20 }}>
        <img
          src={product.imageUrl}
          className="card-img-top "
          onClick={handleClick}
          style={{ borderRadius: "2.5rem", cursor: 'pointer', padding: '2rem' }}
          alt="..."
        />
        <i
          onClick={handleWishList}
          className={isHeartClicked}
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1', cursor: 'pointer', color: txtColor }}
        ></i>
        <div className="card-body">
          <h5 className="card-title">{product.productName}</h5>
          <p className="card-text">${product.price}</p>
          <div className="d-grid gap-2">
            <button onClick={handleAddToCart} className="btn" type="button" style={{ backgroundColor: bgColor, color: txtColor }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productitem;
