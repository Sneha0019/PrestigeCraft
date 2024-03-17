import React, {useState} from 'react'
import WishlistContext from './WishlistContext';

const WishlistState = (props) => {
    const host = 'http://localhost:5000';
    const [wishlistproducts, setWishlistProducts] = useState([]);

    //----GET ALL PRODUCTS----
    const getAllWishlistProduct = async ()=>{ 
        try{
            const response = await fetch(`${host}/api/wishlists/fetchwishlistdata`, {
                method: "GET",
                headers:{
                    "content-Type":"application/json",
                    "auth-token":localStorage.getItem('token')
                }
            });

            const data = await response.json();
            console.log(data);
            setWishlistProducts(data);
        }catch(error){
            throw new Error("FFailed to fetch data")
        }
         
    }


    const addInWishlist = async(product) =>{
        try{
            let success = false
        const response = await fetch(`${host}/api/wishlists/addtowishlist`, {
            method:'POST',
            headers:{
                "content-Type":"application/json",
                "auth-token":localStorage.getItem('token')
            },
           
            body: JSON.stringify({"product":product}),

        });

        const newProducts = await response.json();
        console.log("in new order after response", newProducts)
        setWishlistProducts(wishlistproducts.concat(newProducts));

        await getAllWishlistProduct();

        return newProducts;
        
       }catch(error){
        throw new Error("failed to add in wishlist")
    }
}
    

    
  


// //deleting the order
    const removefromwishlist = async(id)=>{
        const response = await fetch(`${host}/api/wishlists/removefromwishlist/${id}`,{
            method: 'DELETE',
            headers: {
                "content-Type":"application/json",
                "auth-token":localStorage.getItem('token')
            },
        });
        const data = await response.json();
        const newProducts = wishlistproducts.filter((wishlistproduct)=>{return wishlistproduct._id!==id});
        setWishlistProducts(newProducts);
        getAllWishlistProduct();
    }
  return (
   <WishlistContext.Provider value={{wishlistproducts,  getAllWishlistProduct, addInWishlist, removefromwishlist}}>
    {props.children}
   </WishlistContext.Provider>
  )
}

export default WishlistState
