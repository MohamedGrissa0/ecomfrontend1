"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaMinus, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';
import { incQuantity, removeItem, decreaseQuantity, clearCart, addItem } from '../../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Page({ params }) {
    const { id } = React.use(params); // Extract the product ID from URL parameters
    const [product1, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Default quantity is 1
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Fetch product data based on the ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://ecombackend-g2bt.onrender.com/api/products/p/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchProduct();
    }, [id]);

    // Fetch similar products based on the product's category
    useEffect(() => {
        if (product1) {
            const fetchSimilarProducts = async () => {
                try {
                    const response = await axios.get(`https://ecombackend-g2bt.onrender.com/api/products/${product1.category}`);
                    setProducts(response.data);
                } catch (err) {
                    console.error(err.message);
                }
            };

            fetchSimilarProducts();
        }
    }, [product1]);

    const handleIncrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        dispatch(incQuantity(product1._id)); // Use product1.id for quantity increment
    };

    const handleDecrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
            dispatch(decreaseQuantity(product1._id)); // Use product1.id for quantity decrement
        } else {
            console.error('Quantity cannot be less than 1');
        }
    };

    const handleAdd = (product) => {
        if (!product) return; // Prevent adding undefined product
        try {
            dispatch(addItem(product)); // Include quantity when adding to cart
            toast.success('Added to cart');
            // Use window.location to redirect the user to the cart page
            window.location.href = '/panier'; // Redirect to /panier page after adding to cart
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col space-y-8 lg:space-x-4 lg:flex-row p-4 lg:p-12">
                {/* Product Image and Description */}
                <div className="flex flex-col space-y-6 items-center w-full lg:w-1/2">
                    {product1 && (
                        <Image
                            src={`https://ecombackend-g2bt.onrender.com/api/uploads/${product1.images[0]}`}
                            width={280}
                            height={280}
                            alt="Product Image"
                            className="w-96 h-96 lg:w-full lg:h-full bg-white object-cover mx-auto rounded-lg"
                        />
                    )}
                </div>

                {/* Product Details and Actions */}
                <div className="flex flex-col w-full lg:w-1/2 p-7 items-center lg:items-start space-y-4">
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-widest uppercase">
                        {product1?.name}
                    </h1>

                    <div className="text-xl font-semibold text-gray-900">
                        <span className={`line-through text-gray-500 ${product1?.oldprice ? "" : "hidden"} mr-2`}> {product1?.oldprice} TND</span>
                        <span className="text-black">{product1?.price} TND</span>
                    </div>  

                    <div className="flex flex-col rounded-lg p-4 w-full lg:w-2/3">
                        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-4 p-4 rounded-lg">
                                <button
                                    onClick={handleDecrementQuantity}
                                    className="bg-white font-normal text-black border-[1px] border-black p-3 rounded hover:bg-gray-400"
                                >
                                    <FaMinus />
                                </button>
                                <span className="text-lg">{quantity}</span>
                                <button
                                    onClick={handleIncrementQuantity}
                                    className="bg-white text-black border-[1px] border-black p-3 rounded hover:bg-gray-400"
                                >
                                    <FaPlus />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <div className="w-full">
                                <button
                                    onClick={() => handleAdd(product1)} // Handle adding the product and redirecting
                                    className="bg-black tracking-wider text-white text-sm flex items-center justify-center p-3 hover:bg-gray-800 w-full"
                                >
                                    <span className="uppercase tracking-wider">Ajouter au panier</span>
                                </button>
                            </div>
                        </div>

                        {/* Buy Now Button */}
                        <div className="w-full mt-2">
                            <button
                                onClick={() => handleAdd(product1)} // Handle adding the product and redirecting
                                className="bg-white tracking-wider text-sm text-black border-[1px] border-black flex items-center justify-center p-3 hover:bg-black hover:text-white w-full"
                            >
                                <span className="uppercase tracking-wider">Acheter Maintenant</span>
                            </button>
                        </div>
                    </div>
                    <div className="tracking-wider text-center lg:text-left">
                        <p className="text-gray-700 uppercase">description</p>
                        <div className="h-[1px] w-full bg-gray-300 my-4"></div>
                        <p className="text-gray-700 leading-loose">{product1?.description}</p>
                    </div>
                </div>
            </div>

            {/* Similar Products Section */}
            <div className="flex items-center flex-col justify-center mt-16">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-widest uppercase">
                    You can also buy
                </h1>
                <div className='grid grid-cols-12 gap-x-8 py-10 px-14 gap-y-6'>
                    {products.map((product) => (
                        product._id !== product1?._id && (
                            <Link href={`products/${product._id}`} key={product._id} className='relative col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 gap-4 h-full bg-white rounded-lg shadow-md'>
                                <div className='h-max bg-white'>
                                    <Image
                                        src={`https://ecombackend-g2bt.onrender.com/api/uploads/${product.images[0]}`}
                                        alt={product.images[0]}
                                        width={200}
                                        height={120}
                                        className='object-contain w-max h-full mx-auto rounded-full'
                                    />
                                    <div className='h-[1px] w-full bg-gray-100'></div>
                                </div>
                                <div className='mb-14 mx-6 p-3 flex items-center flex-col space-y-2'>
                                    <div className='text-md p-2 font-normal tracking-widest uppercase'>{product.name}</div>
                                    <div className='text-lg p-1 font-semibold tracking-widest font-inter'>{product.brand.toUpperCase()}</div>
                                    <p className='w-full h-full font-inter text-center pb-3'>{product.name} DT</p>
                                    
                                </div>
                                <div
                                    onClick={() => handleAdd(product)}
                                    className={`absolute bottom-0 bg-black w-full p-4 transition-all duration-300 ease-in-out overflow-hidden h-max cursor-pointer text-white flex items-center space-x-2 justify-center`}
                                >
                                    <FaPlus size={10} />
                                    <p className='text-white uppercase tracking-widest text-sm'>
                                        Ajouter au Panier
                                    </p>
                                </div>
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
