import React from 'react'
import Product from './Product'

const Home =() => {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide">
     <div className="carousel-indicators" >
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner" style={{borderRadius:5}}>
    <div className="carousel-item active">
      <img src={require('../Images/photo-1685489807405-fdffb06aef2c.jpeg')} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={require('../Images/photo-1663079899584-64acea4d6858.jpeg')} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={require('../Images/photo-1587947330318-88fcd9055420.jpeg')} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
{console.log("going to product")}
<Product/>
    </>
  )
}

export default Home
