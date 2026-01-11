import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Home from "../../pages/Home/Home";
import Products from "../../pages/Products/Products";
import Cart from "../../pages/Cart/Cart";
import Contact from "../../pages/Contact/Contact";
import Privacity from "../../pages/Privacy/Privacity";

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
            <Route path="/privacity" element={<Privacity />}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}
