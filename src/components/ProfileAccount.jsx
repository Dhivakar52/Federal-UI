import React from 'react'
import { Outlet } from 'react-router-dom'



const ProfileAccount = () => {


  return (
    <div>
         <div>
         <h4>Accounts</h4>
         </div>
         <Outlet/>
    </div>
  )
}

export default ProfileAccount
