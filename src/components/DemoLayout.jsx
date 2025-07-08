import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  LogIn,
  Settings,
  PackageSearch,
  LogOut,
} from "lucide-react";

export default function DemoLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("demo-cart")) || [];
      setCartCount(cart.length);
    };
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem("demo-auth");
    setIsAdmin(auth === "true");
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("demo-auth");
    setIsAdmin(false);
    navigate("/demo/admin");
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('/forest.jpg')",
        backgroundColor: "rgba(0,0,0,0.7)",
        backgroundBlendMode: "darken",
      }}
    >
      {/* Navbar */}
      <header className="w-full px-6 py-4 fixed top-0 z-20 bg-black/40 text-white backdrop-blur-md transition duration-300 flex justify-between items-center">
        <Link to="/demo" className="text-2xl font-extrabold tracking-tight">
          Demo<span className="text-yellow-300">Store</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm md:text-base">
          <Link
            to="/demo"
            className={`hover:underline underline-offset-4 ${location.pathname === "/demo" ? "font-semibold" : ""}`}
          >
            Produktai
          </Link>

          <Link
            to="/demo/cart"
            className="relative hover:underline underline-offset-4"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-yellow-300 text-black rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {!isAdmin && (
            <Link
              to="/demo/admin"
              className={`hover:underline underline-offset-4 ${
                location.pathname === "/demo/admin" ? "font-semibold" : ""
              }`}
            >
              <LogIn className="inline w-5 h-5 mr-1 -mt-1" /> Prisijungti
            </Link>
          )}

          {isAdmin && (
            <>
              <Link
                to="/demo/admin-panel"
                className={`hover:underline underline-offset-4 ${
                  location.pathname === "/demo/admin-panel"
                    ? "font-semibold"
                    : ""
                }`}
              >
                <Settings className="inline w-5 h-5 mr-1 -mt-1" /> Valdymas
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:underline underline-offset-4"
              >
                <LogOut className="w-5 h-5 -mt-1" />
                Atsijungti
              </button>
            </>
          )}
        </nav>
      </header>

      <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto w-full flex-grow">
        {children}
      </main>

      <footer className="bg-black/20 border-t border-white/10 py-4 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Lukas Beneta. Sukurta demonstraciniais tikslais.
      </footer>
    </div>
  );
}
