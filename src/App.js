import "../src/style.css"
import ProductState from "./context/products/ProductState";
import Product from "./components/Product";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddtoWishlist from "./components/AddtoWishlist"

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Addtocart from "./components/Addtocart";
import OrderState from "./context/orders/OrderState";
import WishlistContext from "./context/wishlists/WishlistContext";
import WishlistState from "./context/wishlists/WishlistState";




function App() {
  const bgColor = "#FFE7E7";
  const txtColor = "#6D2932"
  return (
    <>
    <WishlistState>
    <OrderState> 
    <ProductState>
      <BrowserRouter>  
      <Navbar bgColor={bgColor} txtColor={txtColor}/>
       <div className="container-fluid">
       <Routes>
       <Route exact path="/" element={<Home/>} />
       <Route exact path="/" element={<Product/>}/>
       <Route exact path="/ring" element={<Product/>}/>
       <Route exact path="/earring" element={<Product/>}/>
       <Route exact path="/nosering" element={<Product/>}/>
       <Route exact path="/bracelet" element={<Product/>}/>
       <Route exact path="/bangles" element={<Product/>}/>
       <Route exact path="/necklace" element={<Product/>}/>
       <Route exact path="/anklets" element={<Product/>}/>
       <Route exact path="/signup" element={<Signup bgColor={bgColor} txtColor={txtColor}/>} />
       <Route exact path="/login" element={<Login bgColor={bgColor} txtColor={txtColor}/>} />
       <Route exact path="/productdetails" element={<ProductDetails bgColor={bgColor} txtColor={txtColor}/>}/>
       <Route exact path="/addtocart" element={<Addtocart bgColor={bgColor} txtColor={txtColor}/>}/>
       <Route exact path="/wishlist" element={<AddtoWishlist bgColor={bgColor} txtColor={txtColor}/>}/>
       </Routes>
       </div>
     </BrowserRouter>
     </ProductState>  
     </OrderState>  
     </WishlistState> 
    </>
  );
}

export default App;
