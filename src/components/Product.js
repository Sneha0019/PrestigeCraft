import React, { useContext, useEffect, useState } from 'react'
import productContext from '../context/products/productContext';
import Productitem from './Productitem'
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from './spinner';


const Product = (props) => {
  const {category} = props;
  const [loading, setLoading] = useState(true);
  const location = useLocation()
  const context = useContext(productContext);
  console.log(context);
  const {products, getProducts, getProductRing, getProductEarring, getProductNosering, getProductBracelet, getProductBangle, getProductNecklace, getProductAnklet} = context;
 

  // const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');


  useEffect(()=>{
    setLoading(true);
    if(location.pathname==="/ring" || category==="Ring" || query==="Ring"){
    getProductRing();
    }else if(location.pathname==="/earring" || category==="Earrings" || query==="Earrings"){
      getProductEarring();
    }else if(location.pathname==="/nosering" || category==="Nosering"|| query==="Nosering"){
      getProductNosering();
    }else if(location.pathname==="/bracelet" || category==='Bracelet' || query==="Bracelet" ){
      getProductBracelet();
    }else if(location.pathname==="/bangles" || category==="Bangles" || query==="Bangles"){
      getProductBangle();
    }else if(location.pathname==="/necklace" || category==="Necklace" || query==="Necklace"){
      getProductNecklace();
    }else if(location.pathname==="/anklets" || category==="Anklet" || query==="Anklet"){
      getProductAnklet();
    }else{
      getProducts()
    }
    setLoading(false);
    //eslint-disable-next-line
  },[location.pathname]);
  

  return (
    <>
      <div className="container">
      {loading? (
          <Spinner/>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {products && products.map(product => {
            if (!query || product.productName.includes(query)) {
              return (
                <div className="col" key={product._id}>
                  <Productitem key={product._id} product={product}/>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  </>
  )
}

export default Product
