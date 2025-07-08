import React, { useEffect, useState } from "react";
import { Pencil, Trash2, X, Plus } from "lucide-react";
import DemoLayout from "../components/DemoLayout";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "", price: "", image: "" });
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", image: "" });

  useEffect(() => {
    const stored = localStorage.getItem("demo-products");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  const saveProducts = (list) => {
    setProducts(list);
    localStorage.setItem("demo-products", JSON.stringify(list));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const updated = [...products, newProduct];
    saveProducts(updated);
    setNewProduct({ name: "", description: "", price: "", image: "" });
    setAddModalVisible(false);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm("Ar tikrai norite ištrinti šią prekę?");
    if (!confirmed) return;

    const productToDelete = products[index];
    const updated = products.filter((_, i) => i !== index);
    saveProducts(updated);

    const cart = JSON.parse(localStorage.getItem("demo-cart")) || [];
    const updatedCart = cart.filter((item) => item.name !== productToDelete.name);
    localStorage.setItem("demo-cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setEditData(products[index]);
    setFormVisible(true);
  };

  const handleEditSave = () => {
    const updated = [...products];
    updated[editIndex] = editData;
    saveProducts(updated);

    const cart = JSON.parse(localStorage.getItem("demo-cart")) || [];
    const updatedCart = cart.map((item) =>
      item.name === products[editIndex].name ? { ...editData } : item
    );
    localStorage.setItem("demo-cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));

    setFormVisible(false);
    setEditIndex(null);
  };

  return (
    <DemoLayout>
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Valdymo panelė</h1>

      <div className="text-center mb-8">
        <button
          onClick={() => setAddModalVisible(true)}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition flex items-center gap-2 mx-auto"
        >
          <Plus className="w-4 h-4" /> Pridėti naują prekę
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product, i) => (
          <div key={i} className="border rounded-xl p-4 shadow-md bg-gray-100 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold text-black">{product.name}</h2>
            <p className="text-gray-700">{product.description}</p>
            <p className="font-bold text-black mb-2">{product.price} €</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openEditModal(i)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(i)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {formVisible && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative text-black">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setFormVisible(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">Redaguoti prekę</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Pavadinimas"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="border px-3 py-2 rounded text-black"
              />
              <input
                type="text"
                placeholder="Aprašymas"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="border px-3 py-2 rounded text-black"
              />
              <input
                type="number"
                placeholder="Kaina (€)"
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                className="border px-3 py-2 rounded text-black"
              />
              <input
                type="text"
                placeholder="Nuotraukos URL"
                value={editData.image}
                onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                className="border px-3 py-2 rounded text-black"
              />
              <button
                onClick={handleEditSave}
                className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Išsaugoti
              </button>
            </div>
          </div>
        </div>
      )}

      {addModalVisible && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative text-black">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setAddModalVisible(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">Pridėti prekę</h3>
            <form className="flex flex-col gap-3" onSubmit={handleAdd}>
              <input
                type="text"
                placeholder="Pavadinimas"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="border px-3 py-2 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Aprašymas"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="border px-3 py-2 rounded text-black"
                required
              />
              <input
                type="number"
                placeholder="Kaina (€)"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="border px-3 py-2 rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Nuotraukos URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="border px-3 py-2 rounded text-black"
                required
              />
              <button
                type="submit"
                className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
              >
                Pridėti
              </button>
            </form>
          </div>
        </div>
      )}
    </DemoLayout>
  );
}
