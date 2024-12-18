"use client";
import CategoryProducts from "@/app/Components/CategoryProducts";
import React, { useEffect, useState } from "react";
import p1 from "../../../assets/images/products/p1.webp";
import p2 from "../../../assets/images/products/p2.png";
import p3 from "../../../assets/images/products/p3.webp";
import p4 from "../../../assets/images/products/p4.webp";
import p5 from "../../../assets/images/products/p5.webp";
import p6 from "../../../assets/images/products/p6.webp";
import "animate.css"; // Import Animate.css
import toast from "react-hot-toast";
import axios from "axios";

export default function Page({ params }) {
  const { categoryname } = React.use(params); // Extract the category name from URL parameters
  console.log(categoryname)
  // State to manage selected values and sidebar visibility
  const [priceRange, setPriceRange] = useState([20, 1500]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://ecombackend-yn1k.onrender.com/api/products/${categoryname}`)
        console.log(response.data)
        setProducts(response.data)
      }
      catch (err) {
        console.error(err.message)
        console.log(err)
      }
    }
    fetchData()
  })

  // Handler for category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handler for price range change
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([value, priceRange[1]]); // Update minimum price, keep max
  };

  // Handler for brand selection
  const handleBrandChange = (brand) => {
    setSelectedBrands((prevSelected) =>
      prevSelected.includes(brand) ? prevSelected.filter((b) => b !== brand) : [...prevSelected, brand]
    );
  };

  // Filtering logic based on category, price range, and selected brands
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return categoryMatch && priceMatch && brandMatch;
  });

  const uniqueBrands = [...new Set(filteredProducts.map(product => product.brand))];



  return (
    <div>
      <div className="mx-auto container h-full">
        <div className="grid relative grid-cols-10 gap-5 py-10 px-4 md:px-0 lg:px-16 h-full">
          {/* Toggle button for small screens */}
          <span
            className="md:hidden block cursor-pointer text-blue-600"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "" : "+"}
          </span>

          {/* Sidebar */}
          <div
            className={`absolute md:relative top-0 left-0 h-full p-8 bg-white md:col-span-3 lg:col-span-2 transform ${isSidebarOpen ? "animate__animated animate__slideInLeft" : ""
              } ${isSidebarOpen ? "block z-[99]" : "hidden"} md:block space-y-6`}
          >
            {/* Categories Section 
            <div>
                <div className="flex justify-between space-x-4">
                <p className="text-lg tracking-wider text-center font-semibold">Catégories de produits</p>
                <span className="flex cursor-pointer md:hidden" onClick={()=>{setIsSidebarOpen(false)}}>
                &times;

                                    </span>
                </div>
              <div className="mt-2 bg-[#F3F3F3] p-2 rounded">
                <select
                  className="border-none px-4 outline-none bg-transparent w-full"
                  name="categories"
                  id="categories"
                  value={ selectedCategory}
                  onChange={handleCategoryChange}
                  defaultValue={categoryname?categoryname:"All"}
                >
                  <option value="All">All</option> {/* Default option to show all products 
                  {[...new Set(products.map((p) => p.category))].map((category, idx) => (
                    <option key={idx} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="h-[1px] bg-gray-200 w-full"></div>*/}

            {/* Price Filter Section */}
            <div>
              <p className="text-lg tracking-wider text-center">Filtrer par tarif</p>
              <div className="mt-2">
                <input
                  type="range"
                  min="0"
                  max="1500"
                  className="h-2 w-full"
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                />
                <p className="mt-2">Prix : {priceRange[0]} TND — {priceRange[1]} TND</p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-gray-200 w-full"></div>

            {/* Filter by Brands Section */}
            <div>
              <p className="text-lg tracking-widest">Filter by Brands</p>
              <div className="flex flex-col space-y-2 mt-2">
                {uniqueBrands.map((brand, idx) => (
                  <label key={idx} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-black"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <span className="ml-2">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="col-span-10 md:col-span-7 lg:col-span-8 h-full">
            {/* Display filtered products */}
            <CategoryProducts products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
