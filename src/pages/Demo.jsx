import React, { useEffect, useState } from "react";
import DemoLayout from "../components/DemoLayout";
import { motion, AnimatePresence } from "framer-motion";

export default function Demo() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showMiniCart, setShowMiniCart] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("demo-products");
    if (storedProducts) setProducts(JSON.parse(storedProducts));
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("demo-cart")) || [];
      setCart(storedCart);
    };

    updateCart();
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  const getQuantity = (product) =>
    cart.filter((item) => item.name === product.name).length;

  const increaseQuantity = (product) => {
    const updated = [...cart, product];
    localStorage.setItem("demo-cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const decreaseQuantity = (product) => {
    const index = cart.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      const updated = [...cart];
      updated.splice(index, 1);
      localStorage.setItem("demo-cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cart-updated"));
    }
  };

  const totalPrice = cart
    .reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(2);

  const groupedCart = cart.reduce((acc, item) => {
    const key = item.name;
    acc[key] = acc[key] || { ...item, quantity: 0 };
    acc[key].quantity += 1;
    return acc;
  }, {});
  const groupedItems = Object.values(groupedCart);

  return (
    <>
      <DemoLayout>
        <div className="pt-24 pb-16 px-4 md:px-8 text-white">
          <h2 className="text-4xl font-bold text-center mb-10">Mūsų produktai</h2>

          {products.length === 0 ? (
            <p className="text-center text-white/70">
              Prekių dar nėra. Prisijunkite kaip administratorius norėdami jas pridėti.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {products.map((product, i) => {
                const quantity = getQuantity(product);
                return (
                  <div
                    key={i}
                    className="group relative bg-white/80 border rounded-xl overflow-hidden shadow hover:shadow-xl transition text-black"
                  >
                    <div className="relative w-full h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      />
                      {product.description && (
                        <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-center text-sm px-4">
                          {product.description}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <p className="text-xl font-bold text-red-600 mb-4">{product.price} €</p>

                      {quantity === 0 ? (
                        <button
                          onClick={() => increaseQuantity(product)}
                          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                        >
                          Į krepšelį
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => decreaseQuantity(product)}
                            className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
                          >
                            −
                          </button>
                          <span className="text-lg font-medium">{quantity}</span>
                          <button
                            onClick={() => increaseQuantity(product)}
                            className="px-3 py-1 bg-gray-200 rounded text-lg hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DemoLayout>

      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-4 right-4 z-50"
          >
            {!showMiniCart && (
              <button
                onClick={() => setShowMiniCart(true)}
                className="bg-black text-white px-5 py-3 rounded-full shadow-lg hover:bg-gray-800 transition min-w-[170px] text-center"
              >
                🛒 {cart.length} preki{cart.length === 1 ? "ė" : "ės"} – {totalPrice} €
              </button>
            )}

            <AnimatePresence>
              {showMiniCart && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="w-80 bg-white text-black rounded-xl shadow-lg p-4 space-y-3"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">🛒 Krepšelis</h3>
                    <button
                      onClick={() => setShowMiniCart(false)}
                      className="text-gray-500 hover:text-black text-xl"
                    >
                      🔽
                    </button>
                  </div>

                  {groupedItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-600">x{item.quantity}</span>
                    </div>
                  ))}
                  <div className="text-right font-semibold pt-2">
                    Iš viso: {totalPrice} €
                  </div>
                  <a
                    href="/demo/cart"
                    className="block text-center bg-black text-white py-2 rounded mt-3 hover:bg-gray-800 transition"
                  >
                    Eiti į krepšelį
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
