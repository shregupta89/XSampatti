import React from 'react'

import {Navigate,Outlet} from 'react-router-dom'

const PrivateRoutes = () => {
    let auth = { token: localStorage.getItem("authToken") };
  return (
    <div>
        {auth.token?<Outlet/>:<Navigate to='/Login'/>}
      
    </div>
  )
}

export default PrivateRoutes
