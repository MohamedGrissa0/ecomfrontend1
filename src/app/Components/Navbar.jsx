"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/logo.png'; // Adjust the path based on your structure
import Link from 'next/link';

export default function Navbar() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        if (search.length > 0) {
            // Redirect to the search page with the search query
            window.location.replace(`/search/${search}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-[#fff] shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src={logo} // Path to your logo
                        alt="Company Logo"
                        width={200} // Default width
                        height={60} // Default height
                        className="object-contain w-24 md:w-48 lg:w-40" // Responsive width based on screen size
                    />
                </div>

                {/* Search Bar */}
                <div className="flex items-center border rounded-md overflow-hidden bg-[#F3F3F3]">
                    <input
                        type="text"
                        placeholder="Search"
                        className="py-3 px-2 md:px-12 bg-transparent border-none outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={handleKeyPress} // Handle Enter key press
                    />
                    <button
                        onClick={handleSearch} // Call handleSearch on button click
                        className="flex items-center justify-center p-3 text-white bg-black hover:bg-gray-700 transition"
                    >
                        <CiSearch size={25} />
                    </button>
                </div>

                {/* Shopping Cart */}
                <div className="flex items-center justify-between">
                    <Link href="/panier" className="flex items-center justify-center p-2 text-[28px] text-black font-bold hover:bg-gray-100 rounded transition">
                        <AiOutlineShoppingCart />
                        <span className="ml-1 text-xl">({cartItems?.length || 0})</span> {/* Displaying cart items count */}
                    </Link>
                </div>
            </div>
        </div>
    );
}
