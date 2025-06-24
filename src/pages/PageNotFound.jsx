import React from 'react'
import error from '../assets/images/error_404.png'
import '../css/PageNotFound.css'

const PageNotFound = () => {
  return (
    <>
    <div>
    <div className='error_img'>
      <img src={error}  className="img-fluid"   alt="" />
    </div>
    <div className='error_msg'>
         <h3>404 <span>Page Not Found</span></h3>
    </div>
    </div>
  
    </>
  )
}

export default PageNotFound
