import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import { Toaster } from 'sonner';

// Páginas con carga perezosa (Lazy Load)
const Home = lazy(() => import("../../pages/Home"));
const Products = lazy(() => import("../../pages/Products/Products"));
const ProductDetail = lazy(() => import("../../pages/Products/ProductDetail"));
const Cart = lazy(() => import("../../pages/Cart/Cart"));
const Contact = lazy(() => import("../../pages/Contact/Contact"));
const Privacy = lazy(() => import("../../pages/Privacy/Privacy"));
const Login = lazy(() => import("../../pages/Auth/Login"));
const Register = lazy(() => import("../../pages/Auth/Register"));
const Profile = lazy(() => import("../../pages/Profile/Profile"));

// Un cargador simple para cuando se cambia de página
const PageLoader = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent" />
  </div>
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors visibleToasts={1} />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}