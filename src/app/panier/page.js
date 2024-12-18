"use client";
import React, { useState } from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { incQuantity, removeItem, decreaseQuantity, clearCart } from '../../redux/cartSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Page() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    console.log(cartItems);

    // State for shipping cost
    const [shippingCost, setShippingCost] = useState(0);
    
    // States for user details form
    const [userInfo, setUserInfo] = useState({
        name: '',
        address: '',
        phone: '',
    });
    
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false); // For tracking order status

    const handleRemoveItem = (product) => {
        dispatch(removeItem(product._id));
        console.error('Item removed from cart!');
    };

    const handleIncrementQuantity = (product) => {
        dispatch(incQuantity(product._id));
        toast.success('Increased quantity!');
    };

    const handleDecrementQuantity = (product) => {
        if (product.quantity > 1) {
            dispatch(decreaseQuantity(product._id));
            toast.success('Decreased quantity!');
        } else {
            handleRemoveItem(product);
        }
    };

    const handleClear = () => {
        dispatch(clearCart());
    };

    const handleShippingChange = (event) => {
        setShippingCost(event.target.value === "free" ? 0 : 7.10);
    };

    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = (subTotal + shippingCost).toFixed(2);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOrder = async () => {
        if (!userInfo.name || !userInfo.address || !userInfo.phone) {
            console.error("Please fill all the fields.");
            return;
        }
    
        try {
            const NewOrder = await axios.post("https://ecombackend-yn1k.onrender.com/api/order/", {
                Products: cartItems,
                TotalPrice: subTotal,
                TotalQuantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
                DeliveryPrice: shippingCost ? shippingCost : 0,
                customerName: userInfo.name, // Use the field name that matches the backend
                customerAddress: userInfo.address, // Use the field name that matches the backend
                customerPhone: userInfo.phone, // Use the field name that matches the backend
            });
    
            setIsOrderPlaced(true);
            toast.success('Your order has been successfully placed!');
            console.log(NewOrder);
        } catch (err) {
            console.error("Failed to create order");
            console.log(err);
        }
    };
    

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 lg:px-16 xl:px-44">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
                {cartItems.length > 0 && (
                    <button
                        onClick={handleClear}
                        className="text-red-500 flex items-center"
                    >
                        <FaTrash size={20} /> <span className="ml-2">Clear Cart</span>
                    </button>
                )}
            </div>

            <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
                {/* Cart Items */}
                <div className="md:col-span-9 flex flex-col items-center space-y-6 w-full">
                    {cartItems.length > 0 ? (
                        cartItems.map((product, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white shadow rounded-lg p-4 w-full md:w-full space-y-4 md:space-y-0"
                            >
                                <div className="flex items-center w-full md:w-1/2 ">
                                    <Image
                                        src={`https://ecombackend-yn1k.onrender.com/api/${product.images[0]}`}
                                        alt={product.marque}
                                        width={100}
                                        height={100}
                                        className="rounded"
                                    />
                                    <div className="ml-4 w-full">
                                        <h2 className="text-lg font-semibold uppercase">
                                            {product.brand}
                                        </h2>
                                        <p className="text-gray-600 ">
                                            {product.description.substr(0, 100) + "..." }
                                        </p>
                                        <p className="text-green-600 mt-2">
                                            {product.stockStatus ? "In stock" : "Ships in 3-4 weeks"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center ml-28 md:ml-0 space-x-4">
                                    <button
                                        onClick={() => handleDecrementQuantity(product)}
                                        className="bg-[#F3F3F3] text-black p-2 rounded"
                                    >
                                        <FaMinus />
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button
                                        onClick={() => handleIncrementQuantity(product)}
                                        className="bg-[#F3F3F3] text-black p-2 rounded"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="flex  md:flex-row justify-between  md:justify-center w-full md:w-max items-center space-x-4 mt-4  md:ml-0 md:mt-0">
                                    <p className="text-lg  ml-28 md:ml-0 font-semibold">{product.price} TND</p>
                                    <button
                                        onClick={() => handleRemoveItem(product)}
                                        className="text-red-500 flex items-center"
                                    >
                                        <FaTrash /> <span className="ml-2"></span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg tracking-wider text-2xl">Your cart is empty.</p>
                    )}
                </div>

                {/* Order Summary */}
                {cartItems.length > 0 && (
                    <div className="bg-white py-6 flex flex-col rounded-lg w-full md:col-span-3 shadow-md">
                        <div className="px-6 mb-6">
                            <h2 className="text-xl font-thin">ORDER SUMMARY</h2>
                        </div>
                        <div className="space-y-2 px-6">
                            <div className="flex justify-between py-4">
                                <p>SOUS-TOTAL</p>
                                <p>{subTotal.toFixed(2)} TND</p>
                            </div>

                            <div className="mt-4">
                                <p className="font-bold">EXPÉDITION</p>
                                <div className="flex items-center mt-2">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        id="freeShipping"
                                        value="free"
                                        onChange={handleShippingChange}
                                        checked={shippingCost === 0}
                                        className="mr-2"
                                    />
                                    <label htmlFor="freeShipping">LIVRAISON GRATUITE GRAND TUNIS</label>
                                </div>
                                <div className="flex items-center mt-2">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        id="paidShipping"
                                        value="paid"
                                        onChange={handleShippingChange}
                                        checked={shippingCost === 7.10}
                                        className="mr-2"
                                    />
                                    <label htmlFor="paidShipping">Livraison: 7,10 TND</label>
                                </div>
                                <p className="text-gray-500 mt-2 text-sm">
                                    LES OPTIONS DE LIVRAISON SERONT MISES À JOUR LORS DE LA COMMANDE.
                                </p>
                            </div>

                            <div className="flex justify-between py-4 mt-6 font-bold">
                                <p>TOTAL</p>
                                <p>{total} TND</p>
                            </div>
                        </div>

                        {/* Show Form if Order not placed */}
                        {!isOrderPlaced && (
                            <div className="mt-4 w-full  flex items-center justify-center">
                                <button
                                    onClick={() => setIsFormVisible(true)}
                                    className="bg-black text-white px-4 py-3 rounded-lg"
                                >
                                    Commander
                                </button>
                            </div>
                        )}

                        {/* Show Form to collect user information */}
                        {isFormVisible && !isOrderPlaced && (
                            <div className="mt-4 p-4  border-gray-300 rounded">
                                <h3 className="font-bold text-center text-lg mb-4">Complete Your Information</h3>
                                <form className="space-y-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={userInfo.name}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Your Address"
                                        value={userInfo.address}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Your Phone Number"
                                        value={userInfo.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded"
                                    />
                                    <div className="flex w-full items-center justify-center  mt-4">
                                        <button
                                            type="button"
                                            onClick={handleOrder}
                                            className="bg-black text-white px-6 py-3 rounded-lg"
                                        >
                                            Submit Order
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
