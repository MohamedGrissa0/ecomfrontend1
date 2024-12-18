"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('https://ecombackend-yn1k.onrender.com/api/category');
      setCategories(data);
      console.log(data)
    } catch (error) {
      toast.error('Failed to fetch categories.');
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.Name);
    setCategoryDescription(category.Description);
  };

  const handleUpdate = async () => {
    if (!selectedCategory) return;

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('categoryDescription', categoryDescription);
    if (imageFile) formData.append('image', imageFile);

    try {
      await axios.put(`https://ecombackend-yn1k.onrender.com/api/category/${selectedCategory._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Category updated successfully!');
      fetchCategories();
      setSelectedCategory(null);
      setCategoryName('');
      setCategoryDescription('');
      setImageFile(null);
    } catch (error) {
      toast.error('Failed to update category.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Manage Categories</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Description</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Image</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{category.Name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{category.Description}</td>
                <td className="px-6 py-4 text-sm">
                  <img
                      src={`https://ecombackend-yn1k.onrender.com/api/${category.Image}`}
                      alt={category.Name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
                    onClick={() => handleEdit(category)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCategory && (
        <div className="mt-8 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Edit Category</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Category Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Category Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Category Image</label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            <button
              className="bg-green-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none"
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
