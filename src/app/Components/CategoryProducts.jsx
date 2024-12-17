"use client";
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/redux/cartSlice';
import toast from 'react-hot-toast';
import 'animate.css';


export default function CategoryProducts({ products }) {
    console.log(products)
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState('Solaire');
    const [priceRange, setPriceRange] = useState([20, 1500]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [text, setText] = useState("MEILLEURES VENTES");
    const handleAddItem = (item) => {
        dispatch(addItem(item));
        toast.success('Item Added from cart!');

    };
    const [allp, setAllp] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);

    const [selectedOption, setSelectedOption] = useState("TRI PAR DEFAUT");

    const handleOptionClick = (optionLabel) => {
        setSelectedOption(optionLabel);
        setIsOpen(false);
        // Add logic to handle sorting based on the selected value here
    };
    // Array with product details

    // Handler for category change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPriceRange([parseInt(value), priceRange[1]]); // Update minimum price, keep max
    };

    // Handler for brand selection
    const handleBrandChange = (brand) => {
        setSelectedBrands((prevSelected) => {
            if (prevSelected.includes(brand)) {
                // If brand is already selected, remove it
                return prevSelected.filter((b) => b !== brand);
            } else {
                // If not, add it
                return [...prevSelected, brand];
            }
        });
    };

    const filteredProducts = products.filter((product) => {
        // Check category filter (show all if "All" is selected)
        const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;

        // Check price range filter
        const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

        // Check brand filter (show all if no brand is selected)
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.marque);

        return categoryMatch && priceMatch && brandMatch;



    });
    


    return (
        <div className='  realtive text-center w-full flex h-full  justify-center'>


            {/* Products Grid */}
            <div className='flex  flex-col md:flex-col text-left md:items-center justify-between mb-4'>


                <div className='flex justify-between flex-col   md:flex-row w-full items-center'>
                    <p className='text-[#626262] text-md  px-5 md:mb-0'>
                        AFFICHAGE DE 1–30 SUR 267 RÉSULTATS
                    </p>
                    <div className='flex items-center justify-between w-full md:w-max '>
                        <div className='relative flex items-center justify-between  bg-[#F3F3F3] p-2  rounded w-max md:w-max'>
                            <div
                                className='flex justify-between items-center cursor-pointer px-4 py-2 bg-transparent'
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span>{selectedOption}</span>
                                <span>&#9662;</span> {/* Dropdown icon */}
                            </div>
                            {isOpen && (
                                <div className='absolute  bg-white z-10  rounded shadow-lg '>
                                    <div
                                        className='py-2 px-4 text-black hover:bg-black hover:text-white cursor-pointer'
                                        onClick={() => handleOptionClick("TRI PAR DEFAUT")}
                                    >
                                        TRI PAR DEFAUT
                                    </div>
                                    <div
                                        className='py-2 px-4 text-md text-black hover:bg-black hover:text-white cursor-pointer'
                                        onClick={() => handleOptionClick("Prix : Du moins cher au plus cher")}
                                    >
                                        Prix : Du moins cher au plus cher
                                    </div>
                                    <div
                                        className='py-2 px-4 text-black hover:bg-black hover:text-white cursor-pointer'
                                        onClick={() => handleOptionClick("Prix : Du plus cher au moins cher")}
                                    >
                                        Prix : Du plus cher au moins cher
                                    </div>
                                    <div
                                        className='py-2 px-4 text-black hover:bg-black hover:text-white cursor-pointer'
                                        onClick={() => handleOptionClick("Le plus recommandé")}
                                    >
                                        Le plus recommandé
                                    </div>
                                    <div
                                        className='py-2 px-4 text-black hover:bg-black hover:text-white cursor-pointer'
                                        onClick={() => handleOptionClick("Le plus populaire")}
                                    >
                                        Le plus populaire
                                    </div>
                                    <div
                                        className='py-2 px-4 text-black hover:bg-black hover:text-white cursor-pointer'
                                        onClick={() => handleOptionClick("Les plus récents")}
                                    >
                                        Les plus récents
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='flex md:hidden'>
                            <button onClick={() => { setIsOpen1(!isOpen1) }}>Filter</button>
                        </div>
                        {isOpen1 && (
                            <div className={`absolute w-max -right-4 h-full space-y-6 p-8 rounded top-10 bg-white ${!isOpen1 ? 'animate__animated animate__fadeOutRight' : 'animate__animated animate__fadeInRight'}`}>
                                {/* Categories Section */}
                                <div>
                                    <div className='flex space-x-2'>
                                        <p className='text-lg tracking-wider text-center font-semibold'>Catégories de produits</p>
                                        <button onClick={() => setIsOpen1(false)}>&times;</button>
                                    </div>
                                    <div className="mt-2 bg-[#F3F3F3] p-2 rounded">
                                        <select
                                            className="border-none px-4 outline-none bg-transparent w-full"
                                            name="categories"
                                            id="categories"
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                        >
                                            <option value="All">All</option> {/* Default option to show all products */}
                                            {[...new Set(products.map((p) => p.category))].map((category, idx) => (
                                                <option key={idx} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className='h-[1px] bg-gray-200 w-full'></div>

                                {/* Price Filter Section */}
                                <div>
                                    <p className='text-lg tracking-wider text-center'>Filtrer par tarif</p>
                                    <div className='mt-2'>
                                        <input
                                            type="range"
                                            min="20"
                                            max="1500"
                                            className="h-2 w-full"
                                            value={priceRange[0]}
                                            onChange={handlePriceChange}
                                        />
                                        <p className='mt-2'>Prix : {priceRange[0]} TND — {priceRange[1]} TND</p>
                                    </div>
                                    <button className='mt-2 border border-black p-2 w-full text-sm'>Filtrer</button>
                                </div>

                                {/* Divider */}
                                <div className='h-[1px] bg-gray-200 w-full'></div>

                                {/* Filter by Brands Section */}
                                <div>
                                    <p className='text-lg tracking-widest'>Filter by</p>
                                    <div className="flex flex-col space-y-2 mt-2">
                                        {[...new Set(products.map((p) => p.marque))].map((brand, idx) => (
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
                        )}
                    </div>
                </div>

                <div className='grid grid-cols-12 gap-4 pt-2 '>
                    {(filteredProducts.length > 0 ? filteredProducts : products).map((product, index) => (
                        <div href={`products/${product._id}`} key={index} className=' relative col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 gap-4 h-full  bg-white rounded-lg shadow-md'>
                            <div className=' h-max bg-white'>
                                <Image
                                    src={`https://ecombackend-yn1k.onrender.com/api/${product.images[0]}`}
                                    alt={product.images[0]}
                                    width={200}
                                    height={120}
                                    className='object-contain  w-max h-full mx-auto rounded-full'
                                />
                                <div className='h-[1px] w-full bg-gray-100'></div>
                            </div>
                            <div className='mb-14 mx-6 p-3 flex items-center justify-center flex-col '>
                                <div className='text-md p-2  font-normal tracking-widest  text-center	'>{product.name}</div>

                                <div className='text-lg  p-1 font-semibold tracking-widest  font-inter	'>{product.brand.toUpperCase()}</div>
                                <p className='w-full h-full font-inter text-center   pb-3'>{product.price + " "}DT</p>
                            </div>
                            <div
                                onClick={() => { handleAddItem(product); }}
                                className={` bg-black w-full p-4 transition-all  absolute bottom-0  duration-300 ease-in-out overflow-hidden h-max cursor-pointer text-white flex items-center space-x-2 justify-center`}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >                              <FaPlus className='' size={10} />
                                <p className='text-white tracking-widest text-sm 	'>AJOUTER AU PANIER</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>

    );
}
