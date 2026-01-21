import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import Home from "../../pages/Home";
import Products from "../../pages/Products/Products";
import Cart from "../../pages/Cart/Cart";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
