import React from 'react';
import logo from '../../assets/images/logo.png'; // Adjust the path based on your structure
import Image from 'next/image';
import { FaFacebook, FaInstagram } from 'react-icons/fa6';

export default function Footer() {
    return (
        <div className="bg-[#fff] shadow-md h-max w-full">
            <div className=" flex justify-around items-center flex-col sm:flex-row  px-4 py-6 space-y-6 sm:space-y-0 sm:space-x-4">
                
                {/* Contact Information */}
                <div className="flex flex-col items-center space-y-2 text-center sm:text-left">
                    <p className="font-medium">+216 50135233</p>
                    <p>OUARDANINE, MONASTIR</p>
                    <p>Store@gmail.com</p>
                </div>

                {/* Logo */}
                <div className="flex justify-center sm:justify-start">
                    <Image
                        src={logo} // Imported image
                        alt="Company Logo"
                        width={200} // Default width
                        height={60} // Default height
                        className="object-contain w-32 md:w-48 lg:w-40" // Responsive width
                    />
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-center space-y-2 sm:space-y-4 text-center">
                    <p className="font-medium">SUIVEZ NOUS SUR LES RÉSEAUX SOCIAUX</p>
                    <div className="flex items-center space-x-4 text-[22px] text-black">
                        <FaFacebook className="hover:text-blue-600 transition" />
                        <FaInstagram className="hover:text-pink-500 transition" />
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="bg-black text-white py-4 px-2 flex flex-col sm:flex-row font-normal justify-around items-center space-y-4 sm:space-y-0 text-center text-sm">
                <p>© 2024 MAISONPARA. TOUS DROITS RÉSERVÉS. DEV BY THEPIXELCAT</p>
                <p className="hover:text-gray-400 cursor-pointer">POLITIQUE DE CONFIDENTIALITÉ</p>
                <p className="hover:text-gray-400 cursor-pointer">CONDITIONS GÉNÉRALE</p>
            </div>
        </div>
    );
}
