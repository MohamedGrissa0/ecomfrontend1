'use client'; // This is needed for components that need to maintain state in a client context
import React, { useState } from 'react';
import Link from 'next/link'; // Importing Link from next/link
import 'animate.css';

const NavLinks = () => {
  // Menu items array
  const menuItems = [
    { name: 'Nos Produits', link: '/' },
    { name: 'Marques', link: '/marques' },
    { name: 'Nos Promos', link: '/promos' },
    { name: 'Visage', link: '/category/visage' }, // Updated to include 'category'
    { name: 'Corps', link: '/category/corps' }, // Updated to include 'category'
    { name: 'Cheveux', link: '/category/cheveux' }, // Updated to include 'category'
    { name: 'Bébé et maman', link: '/category/bebe-et-maman' }, // Updated to include 'category'
    { name: 'COMPLEMENT ALIMENTAIRE', link: '/category/complement-alimentaire' }, // Updated to include 'category'
    { name: 'Hygiène', link: '/category/hygiene' }, // Updated to include 'category'
    { name: 'Solaire', link: '/category/solaire' }, // Updated to include 'category'
    { name: 'clothing', link: '/category/clothing' }, // Updated to include 'category'
    { name: 'Bio et Naturel', link: '/category/bio-et-naturel' }, // Updated to include 'category'
    { name: 'Matériel Médical', link: '/category/materiel-medical' }, // Updated to include 'category'
    { name: 'COFFRET', link: '/category/coffret' }, // Updated to include 'category'
  ];

  // Toggle state for mobile menu
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-3 bg-black">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

        {/* Mobile toggle button */}
        <div className="flex justify-between items-center w-full md:hidden">
          <div className="text-lg font-bold">Menu</div>
          <button
            aria-expanded={isOpen}
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Hamburger menu */}
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
            isOpen ? 'flex flex-col bg-black items-center justify-center w-full animate__animated animate__bounceInRight' : 'hidden'
          } md:flex md:justify-center w-full md:py-0`}
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`text-white my-2 md:my-0 py-2 px-2 text-sm text-center transition duration-200 ease-in-out 
                hover:text-[#C99440]`}
            >
              <Link href={item.link} className="block">
                <span className='uppercase'>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavLinks;
