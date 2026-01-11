import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Home from "../../pages/Home/Home";
import Products from "../../pages/Products/Products";
import Cart from "../../pages/Cart/Cart";
import Contact from "../../pages/Contact/Contact";
import Privacy from "../../pages/Privacy/Privacy";
import Login from "../../pages/Auth/Login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/privacy" element={<Privacy />}/>
            <Route path="/login" element={<Login />}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}
