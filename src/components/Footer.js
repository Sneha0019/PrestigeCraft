import React from 'react'

const Footer = (props) => {
  const {txtColor, bgColor} = props;
  return (
    <>
   <div className='container' style={{paddingTop: 55}}>
  <footer className="footer mt-10 py-3 bg-body-tertiary fixed-bottom">
    <div className="container" >
      {/* Update the span with the inline style */}
      <span style={{color:txtColor}} >© 2023-2024, Jewel.com, Inc. </span>
    </div>
  </footer>
</div>

    </>
  )
}


export default Footer
