"use client";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    stockQuantity: "",
    category: "",
    images: null,
  });
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://ecombackend-g2bt.onrender.com/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err.message || "Failed to fetch products");
      }
    };
    fetchData();
  }, []);

  const handleOpen = (product) => {
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.brand,
      stockQuantity: product.stockQuantity,
      category: product.category,
      images: null,
    });
    setSelectedProductId(product._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setProductForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const fileInputRef = useRef(null);
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setProductForm((prevForm) => ({ ...prevForm, images: event.target.files }));
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://ecombackend-g2bt.onrender.com/api/products/${id}`);
      setProducts(res.data);
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error(err.message || "Failed to delete product");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("description", productForm.description);
    formData.append("price", productForm.price);
    formData.append("brand", productForm.brand);
    formData.append("stockQuantity", productForm.stockQuantity);
    formData.append("category", productForm.category);
    
    if (productForm.images) {
      for (let i = 0; i < productForm.images.length; i++) {
        formData.append("images", productForm.images[i]);
      }
    }

    try {
      const res = await axios.put(`https://ecombackend-g2bt.onrender.com/api/products/${selectedProductId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProducts(res.data);
      toast.success("Product updated successfully!");
      setOpen(false);
    } catch (err) {
      console.error(err.message || "Failed to update product");
    }
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen w-full container mx-auto">
      {/* Header Section */}
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">PRODUCTS LIST</h1>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-4 px-6 border-b border-gray-300 text-left text-sm font-medium">Image</th>
              <th className="py-4 px-6 border-b border-gray-300 text-left text-sm font-medium">Name</th>
              <th className="py-4 px-6 border-b border-gray-300 text-left text-sm font-medium">Description</th>
              <th className="py-4 px-6 border-b border-gray-300 text-left text-sm font-medium">OldPrice</th>
              <th className="py-4 px-6 border-b border-gray-300 text-left text-sm font-medium">Price</th>
              <th className="py-4 px-6 border-b border-gray-300 text-left text-sm font-medium">Stock</th>
              <th className="py-4 px-6 border-b border-gray-300 text-left text-sm font-medium">Category</th>
              <th className="py-4 px-6 border-b border-gray-300 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-100  border-b   border-gray-300 transition-colors duration-200">
                  <td className="py-4 px-6 border-b border-gray-300 text-sm">
                    <Image
                      src={`https://ecombackend-g2bt.onrender.com/api/${p.images[0]}`}
                      alt={p.name}
                      width={50}
                      height={50}
                      className="object-cover rounded-full"
                    />
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300 text-sm font-medium">{p.name}</td>
                  <td className="py-4 px-6 border-b border-gray-300 text-sm">{p.description}</td>
                  <td className="py-4 px-6 border-b border-gray-300 text-sm">{`$${p.oldprice}`}</td>
                  <td className="py-4 px-6 border-b border-gray-300 text-sm">{`$${p.price}`}</td>
                  <td className="py-4 px-6 border-b border-gray-300 text-sm">{p.stockQuantity}</td>
                  <td className="py-4 px-6 border-b border-gray-300 text-sm">{p.category}</td>
                  <td className="py-4 px-6 h-full w-full flex items-center justify-center  text-sm   space-x-2">
                    <button
                      onClick={() => handleOpen(p)}
                      className="bg-blue-600 p-2 rounded-md text-white transition duration-200 hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 rounded-md text-white p-2 transition duration-200 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Form Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="border border-gray-300 p-3 mb-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="description"
                value={productForm.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border border-gray-300 p-3 mb-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="number"
                name="price"
                value={productForm.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="border border-gray-300 p-3 mb-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="brand"
                value={productForm.brand}
                onChange={handleInputChange}
                placeholder="Brand"
                className="border border-gray-300 p-3 mb-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="number"
                name="stockQuantity"
                value={productForm.stockQuantity}
                onChange={handleInputChange}
                placeholder="Stock Quantity"
                className="border border-gray-300 p-3 mb-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="category"
                value={productForm.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="border border-gray-300 p-3 mb-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleFileClick}
                  className="bg-gray-200 p-3 rounded-md hover:bg-gray-300"
                >
                  Select Images
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="mr-2 border border-gray-300 rounded-md p-2 hover:bg-gray-100 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
