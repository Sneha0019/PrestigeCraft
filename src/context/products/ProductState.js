import React, { useState } from 'react'
import ProductContext from './productContext'



const ProductState = (props) => {
  const host = 'https://ecommerce-website-full-stack-eidn9mwm1-snehas-projects-b171f877.vercel.app';
  const [products, setProducts] = useState([]);

  //-----GET ALL PRODUCTS
  const getProducts = async()=>{
    try{
        const response = await fetch(`${host}/api/products/fetchallproducts`, {
            method: "GET",
            headers:{
                "content-Type" : "application/json",
            },
        });

  const data = await response.json();
   setProducts(data.product);
    
    }catch(error){
      return console.log("error in fetching", error);

    }

    
  }


  //--GET ALL RING----
  const getProductRing = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/ring`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });

   const data = await response.json();
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }


   //--GET ALL EARRINGS----
   const getProductEarring = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/earring`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });

   const data = await response.json();
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }

   //--GET ALL NOSERING----
   const getProductNosering = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/nosering`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });

   const data = await response.json();
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }

   //--GET ALL BRACELET----
   const getProductBracelet = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/bracelet`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });

   const data = await response.json();
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }


   //--GET ALL Bangles----
   const getProductBangle = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/bangles`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });

   const data = await response.json();
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }


   //--GET ALL NECKLACE---
   const getProductNecklace = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/necklace`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });

   const data = await response.json();
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }

   //--GET ALL ANKLETS---
   const getProductAnklet = async ()=>{

    try{
      const response = await fetch(`${host}/api/products/anklets`, {
          method: "GET",
          headers:{
              "content-Type" : "application/json",
          },
      });

   const data = await response.json();
    setProducts(data.product);
  

  }catch(error){
      console.log("error in fetching", error);

  }

  }



  return (
    <ProductContext.Provider value={{products, getProducts, getProductRing, getProductEarring, getProductNosering, getProductBracelet, getProductBangle, getProductNecklace, getProductAnklet}}>
        {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState;
