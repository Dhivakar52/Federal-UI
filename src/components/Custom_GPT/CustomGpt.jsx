import React from 'react'
import { Outlet } from 'react-router-dom'

const CustomGpt = () => {
  return (
    <>
    <div>
       <h1>Custom-GPT</h1>
    </div>
         <Outlet/>
         </>
  )
}

export default CustomGpt
