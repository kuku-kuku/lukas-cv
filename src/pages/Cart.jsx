import React, { useEffect, useState } from "react";
import DemoLayout from "../components/DemoLayout";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("demo-cart")) || [];
    setCart(stored);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("demo-cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleDecrease = (product) => {
    const index = cart.findIndex((item) => item.name === product.name);
    if (index !== -1) {
      const updated = [...cart];
      updated.splice(index, 1);
      updateCart(updated);
    }
  };

  const handleIncrease = (product) => {
    updateCart([...cart, product]);
  };

  const handleRemoveAll = (product) => {
    const updated = cart.filter((item) => item.name !== product.name);
    updateCart(updated);
  };

  const handleClearCart = () => {
    updateCart([]);
  };

  const handleCheckout = () => {
    // kol mokėjimai neveikia – nieko nedarom
  };

  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

  const groupedCart = cart.reduce((acc, item) => {
    const key = item.name;
    acc[key] = acc[key] || { ...item, quantity: 0 };
    acc[key].quantity += 1;
    return acc;
  }, {});
  const groupedItems = Object.values(groupedCart);

  return (
    <DemoLayout>
      <h1 className="text-3xl font-bold text-center mb-10">Tavo krepšelis</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Krepšelis tuščias.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {groupedItems.map((product, i) => (
              <div
                key={i}
                className="border rounded-xl overflow-hidden shadow bg-white text-black flex flex-col"
              >
                <div className="relative group h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  {product.description && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-4">
                      <p className="text-white text-sm text-center">{product.description}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-xl font-bold">{product.price} €</p>

                  <div className="flex items-center justify-center gap-4 mt-2">
                    <button
                      onClick={() => handleDecrease(product)}
                      className="px-4 py-2 text-xl bg-gray-300 rounded hover:bg-gray-400 transition"
                    >
                      −
                    </button>

                    <span className="text-xl font-semibold">{product.quantity} vnt.</span>

                    <button
                      onClick={() => handleIncrease(product)}
                      className="px-4 py-2 text-xl bg-gray-300 rounded hover:bg-gray-400 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveAll(product)}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full"
                  >
                    Pašalinti viską
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow text-center space-y-4 text-black">
            <p className="text-xl font-semibold">
              Bendra suma: <span className="font-bold">{totalPrice} €</span>
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleClearCart}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
              >
                Išvalyti krepšelį
              </button>

              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Mokėti
              </button>
            </div>

            {message && (
              <p className="text-green-600 font-semibold mt-4">{message}</p>
            )}
          </div>
        </>
      )}
    </DemoLayout>
  );
}
