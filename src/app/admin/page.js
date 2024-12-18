"use client";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Page() {
  const [showProductForm, setShowProductForm] = useState(true);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categories, setCategories] = useState([]);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    oldprice: "",
    brand: "",
    stockQuantity: "",
    category: "",
    images: null,
  });

  const [categoryForm, setCategoryForm] = useState({
    categoryName: "",
    categoryDescription: "",
    image: null, // Single image for the category
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://ecombackend-yn1k.onrender.com/api/category/");
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  const productFileInputRef = useRef(null);
  const categoryFileInputRef = useRef(null);

  const handleFileClick = (ref) => {
    ref.current.click();
  };

  const handleFileChangeProduct = (event) => {
    setProductForm((prevForm) => ({ ...prevForm, images: event.target.files }));
  };

  const handleFileChangeCategory = (event) => {
    setCategoryForm((prevForm) => ({ ...prevForm, image: event.target.files[0] })); // Set only one image
  };

  const toggleProductForm = () => {
    setShowProductForm(true);
    setShowCategoryForm(false);
  };

  const toggleCategoryForm = () => {
    setShowProductForm(false);
    setShowCategoryForm(true);
  };

  const handleProductInputChange = (event) => {
    const { name, value } = event.target;
    setProductForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleCategoryInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    Object.keys(productForm).forEach((key) => {
      if (key === "images") {
        Array.from(productForm.images || []).forEach((file) => {
          formData.append("images", file);
        });
      } else {
        formData.append(key, productForm[key]);
      }
    });

    try {
      await axios.post("https://ecombackend-yn1k.onrender.com/api/products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
      setProductForm({
        name: "",
        description: "",
        price: "",
        oldprice: "",
        brand: "",
        stockQuantity: "",
        category: "",
        images: null,
      });
    } catch (error) {
      console.error("Error: " + error.message);
      console.error("Error:", error.message);
    }
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", categoryForm.categoryName);
    formData.append("categoryDescription", categoryForm.categoryDescription);
    formData.append("image", categoryForm.image); // Append single image

    console.log(categoryForm)

    try {
      await axios.post("https://ecombackend-yn1k.onrender.com/api/category/", formData);
      toast.success("Category added successfully!");
      setCategoryForm({
        categoryName: "",
        categoryDescription: "",
        image: null,
      });
    } catch (error) {
      console.error("Error: " + (error.response?.data?.message || error.message));
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-4xl font-bold text-center p-4 px-12 tracking-widest text-gray-800">
        ADMIN DASHBOARD PANEL
      </h1>

      <div className="flex items-center space-x-4 p-4 px-12">
        <button
          className="flex-grow p-4 px-12 border-2 border-black text-xl font-semibold text-gray-800 bg-white hover:bg-gray-800 hover:text-white transition duration-300 rounded-lg shadow-md"
          onClick={toggleProductForm}
        >
          CREATE NEW PRODUCT
        </button>
        <button
          className="flex-grow p-4 px-12 border-2 border-black text-xl font-semibold text-gray-800 bg-white hover:bg-gray-800 hover:text-white transition duration-300 rounded-lg shadow-md"
          onClick={toggleCategoryForm}
        >
          CREATE NEW CATEGORY
        </button>
      </div>

      {showProductForm && (
        <form
          onSubmit={handleProductSubmit}
          className="flex flex-col items-center space-y-4 p-4 px-12 w-full max-w-md bg-white rounded-lg shadow-lg mt-4"
        >
          <h2 className="text-2xl font-bold text-gray-800">Create New Product</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productForm.name}
            onChange={handleProductInputChange}
            className="border p-2 w-full rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={productForm.description}
            onChange={handleProductInputChange}
            className="border p-2 w-full rounded-lg"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productForm.price}
            onChange={handleProductInputChange}
            className="border p-2 w-full rounded-lg"
          />
          <input
            type="number"
            name="oldprice"
            placeholder="Old Price"
            value={productForm.oldprice}
            onChange={handleProductInputChange}
            className="border p-2 w-full rounded-lg"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={productForm.brand}
            onChange={handleProductInputChange}
            className="border p-2 w-full rounded-lg"
          />
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            value={productForm.stockQuantity}
            onChange={handleProductInputChange}
            className="border p-2 w-full rounded-lg"
          />
          <select
            name="category"
            value={productForm.category}
            onChange={handleProductInputChange}
            className="border p-2 w-full rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.Name}>
                {category.Name.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => handleFileClick(productFileInputRef)}
            className="mt-4 bg-black text-white rounded-lg p-4 px-12 tracking-widest border border-black text-lg transition duration-300 hover:bg-gray-700"
          >
            UPLOAD IMAGES
          </button>
          <input type="file" multiple ref={productFileInputRef} onChange={handleFileChangeProduct} style={{ display: "none" }} />
          <button type="submit" className="p-4 px-12 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-red-600">
            Add Product
          </button>
        </form>
      )}

      {showCategoryForm && (
        <form
          onSubmit={handleCategorySubmit}
          className="flex flex-col items-center space-y-4 p-4 px-12 w-full max-w-md bg-white rounded-lg shadow-lg mt-4"
        >
          <h2 className="text-2xl font-bold text-gray-800">Create New Category</h2>
          <input
            type="text"
            name="categoryName"
            placeholder="Category Name"
            value={categoryForm.categoryName}
            onChange={handleCategoryInputChange}
            className="border p-2 w-full rounded-lg"
          />
          <textarea
            name="categoryDescription"
            placeholder="Category Description"
            value={categoryForm.categoryDescription}
            onChange={handleCategoryInputChange}
            className="border p-2 w-full rounded-lg"
          />
          <button
            type="button"
            onClick={() => handleFileClick(categoryFileInputRef)}
            className="mt-4 bg-black text-white rounded-lg p-4 px-12 tracking-widest border border-black text-lg transition duration-300 hover:bg-gray-700"
          >
            UPLOAD IMAGE
          </button>
          <input type="file" ref={categoryFileInputRef} onChange={handleFileChangeCategory} style={{ display: "none" }} />
          <button type="submit" className="p-4 px-12 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-red-600">
            Add Category
          </button>
        </form>
      )}
    </div>
  );
}
