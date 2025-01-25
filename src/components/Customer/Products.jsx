import React, { useState } from "react";
import { Trash2, Edit2, Search, Plus, X } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    moq: "",
    description: "",
    category: "",
    leadTime: "",
    unit: "pcs"
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = form;
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }
    setForm({
      name: "",
      price: "",
      moq: "",
      description: "",
      category: "",
      leadTime: "",
      unit: "pcs"
    });
    setIsModalOpen(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleEdit = (index) => {
    setForm(products[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="section-title">Manage Products</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn btn-primary"
        >
          <Plus size={20} className="mr-2" />
          Add Product
        </button>
      </div>
      
      {showAlert && (
        <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-700">
          {editingIndex !== null ? "Product updated successfully!" : "Product added successfully!"}
        </div>
      )}

      <div className="mb-4 flex items-center">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 p-2 rounded-lg border border-[#F1F1F1]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-3xl border border-[#F1F1F1] shadow-[0_7px_14px_#EAEAEA]">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left font-medium">Name</th>
              <th className="p-4 text-left font-medium">Category</th>
              <th className="p-4 text-left font-medium">Price</th>
              <th className="p-4 text-left font-medium">MOQ</th>
              <th className="p-4 text-left font-medium">Lead Time</th>
              <th className="p-4 text-left font-medium">Description</th>
              <th className="p-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4">{product.name}</td>
                <td className="p-4"><span className="tag">{product.category}</span></td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.moq} {product.unit}</td>
                <td className="p-4">{product.leadTime} days</td>
                <td className="p-4">{product.description}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="btn btn-text p-1"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="btn btn-text p-1 text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl p-8 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingIndex !== null ? "Edit Product" : "Add New Product"}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-text"
                >
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter product name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#F1F1F1]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                      type="text"
                      placeholder="Product category"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#F1F1F1]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                      type="number"
                      required
                      placeholder="Enter price"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#F1F1F1]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">MOQ (Minimum Order Quantity)</label>
                    <div className="flex">
                      <input
                        type="number"
                        required
                        placeholder="Enter MOQ"
                        value={form.moq}
                        onChange={(e) => setForm({ ...form, moq: e.target.value })}
                        className="w-full p-2 rounded-l-lg border border-[#F1F1F1]"
                      />
                      <select
                        value={form.unit}
                        onChange={(e) => setForm({ ...form, unit: e.target.value })}
                        className="border border-l-0 border-[#F1F1F1] rounded-r-lg px-3"
                      >
                        <option value="pcs">PCS</option>
                        <option value="kg">KG</option>
                        <option value="sets">Sets</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Lead Time (Days)</label>
                    <input
                      type="number"
                      placeholder="Production lead time"
                      value={form.leadTime}
                      onChange={(e) => setForm({ ...form, leadTime: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#F1F1F1]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      placeholder="Product description"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#F1F1F1]"
                      rows="2"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)} 
                    className="btn btn-text"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingIndex !== null ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;