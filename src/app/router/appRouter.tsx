import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import Home from "../../pages/Home";
import Products from "../../pages/Products/Products";
import Cart from "../../pages/Cart/Cart";
import Contact from "../../pages/Contact/Contact";
import Privacy from "../../pages/Privacy/Privacy";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { Toaster } from 'sonner';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors visibleToasts={1} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
