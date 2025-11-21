// src/Routing/Routing.jsx
import React ,{ useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer  from "../Footer/Footer";
import HomePage from "../Pages/HomePage";
import ViewCart from '../ViewCart/ViewCart'
import CheckOut from '../CheckOut/CheckOut'
import Success from "../Success/Success";
import ViewProducts from "../Components/ViewProducts/ViewProducts";
import New from '../Components/Home/New/New'


const Routing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <BrowserRouter>
    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<ViewCart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/success" element={<Success />} />
        <Route path='viewproducts/:id' element={<ViewProducts/>} />
        <Route path="/products" element={<New searchTerm={searchTerm} />} />
        {/* <New searchTerm={searchTerm} /> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default Routing;
