import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users.jsx";
import Signup from "./user/Signup.jsx";
import Signin from "./lib/Signin.jsx";
import Profile from "./user/Profile.jsx";
import Product from "./product/Product.jsx";
import Products from "./product/Products.jsx";
import EditProduct from "./product/EditProduct.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";
import EditProfile from "./user/EditProfile.jsx";
import Resources from "./user/Resources.jsx";
import MyProduct from "./product/MyProducts.jsx";
import Menu from "./core/Menu";
function MainRouter() {
  return (
    <div>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/product" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<MyProduct />} />
        <Route
          path="/product/edit/:productId"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default MainRouter;
