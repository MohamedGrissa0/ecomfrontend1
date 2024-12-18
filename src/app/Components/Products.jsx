"use client";
import React, { useEffect, useState } from 'react';
import p1 from '../../assets/images/products/p1.webp';
import p2 from '../../assets/images/products/p2.png';
import p3 from '../../assets/images/products/p3.webp';
import p4 from '../../assets/images/products/p4.webp';
import p5 from '../../assets/images/products/p5.webp';
import p6 from '../../assets/images/products/p6.webp';
import Image from 'next/image';
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/redux/cartSlice';
import toast from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';

export default function Products() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([])
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [text, setText] = useState("MEILLEURES VENTES");
    const handleAddItem = (item) => {
        dispatch(addItem(item));
        toast.success('Item Added from cart!');
    };
    const [Hover, setHover] = useState(false)
  // Re-run this effect whenever cartItems changes

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://ecombackend-yn1k.onrender.com/api/products/")
                setProducts(response.data)
                console.log(response.data)
            }
            catch (err) {
                toast.error(err)
            }
        }
        fetchData()
    }, [])
    const handleHover = () => {
        setHover(true)
    }

    return (
        <div className='flex text-center w-full flex-col py-6  justify-center'>
            <p className='  text-3xl md:text-xl lg:text-5xl tracking-widest mb-4 uppercase'>Nos Produits</p>

            {/* Filter Buttons */}
            <div className='flex space-x-8 p-2 text- justify-center items-center'>
                <p
                    onClick={() => setText("MEILLEURES VENTES")}
                    className={`tracking-widest text-md md:text-lg p-2 cursor-pointer ${text === "MEILLEURES VENTES" ? "border-b-2 border-black" : ""}`}
                >
                    MEILLEURES VENTES
                </p>
                <p
                    onClick={() => setText("TOP PROMOS")}
                    className={`tracking-widest text-md md:text-lg p-2 cursor-pointer ${text === "TOP PROMOS" ? "border-b-2 border-black" : ""}`}
                >
                    TOP PROMOS
                </p>
                <p
                    onClick={() => setText("NOUVEAUTÉS")}
                    className={`tracking-widest text-md md:text-lg p-2 cursor-pointer ${text === "NOUVEAUTÉS" ? "border-b-2 border-black" : ""}`}
                >
                    NOUVEAUTÉS
                </p>
            </div>

            {/* Products Grid */}
            <div className=' flex items-center justify-center p-20 '>
                <div className='grid grid-cols-12 gap-x-8 py-10 gap-y-6'>
                    {products.map((product, index) => (
                        <Link href={`products/${product._id}`} key={index} className=' relative col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-2 gap-4 h-full  bg-white rounded-lg shadow-md'>
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
                            <div className='mb-14 mx-6 p-3 flex items-center flex-col space-y-2'>
                                <div className='text-md p-2  font-normal tracking-widest 	'>{product.name}</div>

                                <div className='text-lg  p-1 font-semibold tracking-widest  font-inter	'>{product.brand.toUpperCase()}</div>
                                <p className='w-full h-full font-inter   pb-3'>{product.price + " "}DT</p>
                            </div>
                            <div
                                onClick={() => { handleAddItem(product); }}
                                className={`absolute bottom-0 bg-black w-full p-4 transition-all duration-300 ease-in-out overflow-hidden h-max cursor-pointer text-white flex items-center space-x-2 justify-center`}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >                              <FaPlus className='' size={10} />
                                <p className='text-white tracking-widest text-sm	'>AJOUTER AU PANIER</p>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </div>
    );
}
