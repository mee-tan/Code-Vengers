import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import React from 'react'
//import {Route, Routes} from 'react-router-dom'
import Home from './core/Home' 
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './lib/Signin.jsx'
import Profile from './user/Profile.jsx'
import Switch from 'react'
import PrivateRoute from './lib/PrivateRoute.jsx'
import EditProfile from './user/EditProfile.jsx'
import NewProduct from './product/NewProduct'
import EditProduct from './product/EditProduct'
import Product from './product/Product'
import Menu from './core/Menu' 
function MainRouter() {
        return (
          <div>
      <Menu/>
          
               
                        
                        <Routes>
  <Route path="/" element={<Home />} /> 
  <Route path="/users" element={<Users />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/signin" element={<Signin />} />
  <Route
    path="/user/edit/:userId"
    element={
      <PrivateRoute>
        <EditProfile />
      </PrivateRoute>
    }
  />
  <Route path="/user/:userId" element={<Profile />} />

  <Route path="/product/:productId" component={Product}/>
  <Route path="/shops/all" component={Shops}/>
  <Route path="/shops/:shopId" component={Shop}/>

</Routes>
</div>
  );
}

export default MainRouter;
