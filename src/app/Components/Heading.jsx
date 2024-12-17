import React from 'react';
import { IoCall } from 'react-icons/io5';
import { FaFacebookF } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';

export default function Heading() {
    return (
        <div className="bg-black px-4 py-2">
            <div className="mx-auto container flex flex-col md:flex-row space-y-2 md:space-y-0 items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-white text-lg md:text-xl">
                        <IoCall />
                    </span>
                    <p className="text-white font-bold text-xs md:text-lg">
                        +216 29960110
                    </p>
                </div>
                <div className="flex flex-col items-center text-center md:-space-y-1">
                    <p className="text-white font-bold text-xs md:text-lg">
                        OFFRE DE LANCEMENT : LIVRAISON GRATUITE DÈS 59 DT D&apos;ACHAT SUR LE GRAND TUNIS
                    </p>
                    <p className="text-[#C99440] font-bold text-xs md:text-lg">
                        LIVRAISON GRATUITE DÈS 99 DT D&apos;ACHAT SUR TOUTE LA TUNISIE
                    </p>
                </div>
                <div className="flex space-x-4 text-white font-bold text-xs md:text-lg">
                    <FaFacebookF />
                    <FaInstagram />
                </div>
            </div>
        </div>
    );
}
