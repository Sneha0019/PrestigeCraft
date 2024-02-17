import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Product from './Product'
import OrderContext from '../context/orders/OrderContext'

const ProductDetails = (props) => {
  const navigate = useNavigate();
  const location = useLocation()
  const product = location.state.product;
  const {txtColor, bgColor} = props;
  console.log("product camed", product)
  const context = useContext(OrderContext) 
  // const {getProducts, getProductRing, getProductEarring, getProductNosering, getProductBracelet, getProductBangle, getProductNecklace, getProductAnklet} = context;


  const {orders, addInCart} = context;
  

  const handleAddToCart = async(e)=>{
    e.preventDefault();
    if(localStorage.getItem('token')){
      console.log("sending product from product details to csrt itemss.............", product);
      const res = await addInCart(product);
      navigate("/addtocart") 
    }else{
       navigate("/login")
    }
  }


  return (
    <>
    <div class="container d-flex flex-column flex-md-row mt-5">
  <div class="container text-center mb-3 mb-md-0">
    <img src={product.imageUrl || product.productUrl} class="img-fluid" style={{maxHeight:'500px', maxWidth:'100%'}} alt="Jhumkas Image"/>
  </div>

  <div class="container text-md-left">
    <h3 style={{borderBottom:`2px solid ${txtColor}`, padding:4}}>{product.productName}</h3>
  


    <p>{product.description}</p>

    <div className="row">
      <h3>Product Details</h3>

      <div className="d-flex pt-2 m-0" style={{borderTop:`2px solid ${txtColor}`}}>
        <p> Weight: {product.weight}</p>
        <p className='mx-2'> dimension: {product.dimension}cm</p>
        <p className='mx-1'> material: {product.material}</p>
      </div>

    <h5>Price - ${product.price}</h5>
    <p>Price inclusive of all taxes.</p>
    <div className="d-flex" style={{borderBottom:`2px solid ${txtColor}`, padding:10}}>
    <a onClick={handleAddToCart} class="btn btn-light btn-lg" href="#" role="button">Add to Cart</a>
    <a onClick={handleAddToCart} class="btn mx-3 btn-lg" href="#" role="button"  style={{backgroundColor: txtColor, color: "#fff"}}>Buy Now</a>
    </div>
    </div>

    
    <ul style={{listStyleType:'none', padding:5}} >
      <li>
      <i class="fa-regular fa-gem" style={{color: txtColor}}></i> purity guaranted
      </li>

      <li>
      <i class="fa-solid fa-arrow-right-arrow-left" style={{color: txtColor}}></i> Exhchange across all stores
      </li>

      <li>
      <i class="fa-solid fa-box" style={{color: txtColor}}></i> Free shipping all across India
      </li>
    </ul>
  </div>
 </div>

  <Product category={product.category}/>
    </>
  )
}

export default ProductDetails
