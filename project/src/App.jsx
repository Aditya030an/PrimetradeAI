import React from "react";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Floatingbutton from "./Component/Floatingbutton"; // ✅ ADD THIS
import Login from "./Component/login";
import Forgetpassword from "./Component/Forgetpassword";
import Signup from "./Component/Signup";
import Product from "./Component/Product";
import AllBlogs from "./Component/Blogs";
import BlogDetails from "./Component/BlogDetails";
import BuyNow from "./Component/BuyNow";
import Ordersuccessful from "./Component/Ordersuccessful";
import CancelPayment from "./Cancelpayment";
import Consultation from "./Component/Consultation";
import MyConsultations from "./Component/MyConsultations";
// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProducts from "./Component/AllProducts";
import MyOrders from "./Component/MyOrders";

import UserProtectedRoute from "./Component/Protected/UserProtectedRoute";
import AdminProtectedRoute from "./Component/Protected/AdminProtectedRoute";
import Cart from "./Component/Cart";
import ForgotPassword from "./Component/Forgetpassword";
import ResetPassword from "./Component/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="w-full min-h-screen bg-white overflow-x-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forgetpassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Consultation" element={<Consultation />} />
          <Route path="/Contact" element={<Contact />} />

          <Route path="/all_products" element={<AllProducts />} />
          <Route path="/product_details/:id" element={<Product />} />
          <Route path="/Product" element={<Product />} />

          <Route path="/all_blogs" element={<AllBlogs />} />
          <Route path="/blog_details/:id" element={<BlogDetails />} />

          <Route
            path="/BuyNow"
            element={
              <UserProtectedRoute>
                <BuyNow />
              </UserProtectedRoute>
            }
          />

          <Route path="/order_successful" element={<Ordersuccessful />} />
          <Route path="/CancelPayment" element={<CancelPayment />} />

          <Route
            path="/my_consultations"
            element={
              <UserProtectedRoute>
                <MyConsultations />
              </UserProtectedRoute>
            }
          />

          {/* my order page */}

          <Route
            path="/my_order"
            element={
              <UserProtectedRoute>
                <MyOrders />
              </UserProtectedRoute>
            }
          />
          <Route path="/my_cart" element={<Cart />} />

          {/* ✅ ADMIN PROTECTED (example route) */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <h1>Admin Panel</h1>
              </AdminProtectedRoute>
            }
          />
        </Routes>

        {/* FLOATING BUTTONS (GLOBAL) */}
        <Floatingbutton />
      </div>
    </BrowserRouter>
  );
};

export default App;
