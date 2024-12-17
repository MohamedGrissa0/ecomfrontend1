"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

// Categories Component
export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://ecombackend-g2bt.onrender.com/api/category/");
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className='mx-auto container py-16 px-16 md:px-20 lg:px-32'>
      <div className='grid grid-cols-3 md:grid-cols-5 gap-6'>
        {categories.map((category, index) => (
          <Link href={"category/" + category.Name} key={index} className='text-center p-2'>
            <Image
              src={`https://ecombackend-g2bt.onrender.com/api/${category.Image}`} // Fixed template string
              alt={category.Name} // Corrected property name from 'name' to 'Name'
              width={200} // Set width for all images
              height={120} // Set height for all images
              className='object-contain bg-white rounded-full w-32 md:w-40 lg:w-28 mx-auto' // Responsive width
            />
            <p className='mt-4 tracking-widest text-center uppercase font-bold text-lg text-gray-700'>
              {category.Name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
