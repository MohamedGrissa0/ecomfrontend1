'use client'; // This is needed for components that need to maintain state in a client context
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Importing Link from next/link
import axios from 'axios'; // Ensure axios is imported

const NavLinks = () => {
  // State to store categories
  const [categories, setCategories] = useState([]);

  // Fetch categories when component mounts
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

  // State to handle mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-3 bg-black">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

        {/* Mobile toggle button */}
        <div className="flex justify-between items-center w-full md:hidden">
          <div className="text-lg font-bold text-white">Menu</div>
          <button
            aria-expanded={isOpen ? 'true' : 'false'}
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Hamburger menu icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>

        {/* Menu items */}
        <ul
          className={`${
            isOpen ? 'flex flex-col items-center justify-center w-full animate__animated animate__fadeInRight' : 'hidden'
          } md:flex md:justify-center w-full md:py-0`}
        >
          {categories.map((item, index) => (
            <li
              key={index}
              className="text-white my-2 md:my-0 py-2 px-4 text-sm text-center transition-all duration-300 ease-in-out 
                hover:text-[#C99440] hover:scale-105 transform"
            >
              {/* Check if item.link exists before rendering Link */}
              {item.Name ? (
          <Link href={"category/"+item.Name} key={index} className='text-center p-2 cursor-pointer'>
                  <span className="uppercase">{item.Name}</span>
                </Link>
              ) : (
                <span className="uppercase">{item.Name}</span> // Fallback if link is undefined
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;
