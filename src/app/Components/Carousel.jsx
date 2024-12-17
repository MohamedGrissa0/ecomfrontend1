import React from 'react'

export default function Carousel() {
    return (
        <div className='grid grid-cols-2 w-full '>
            <div className="col-span-1 flex p-32  tracking-widest text-center	flex-col items-center w-full justify-center bg-[#EDD0B3]">
                <p className='text-lg'>OFFRE DE LANCEMENT            </p>

                <p className='text-4xl text-center'>LIVRAISON GRATUITE SUR LE GRAND TUNIS DÈS 59 DT.
                </p>
            </div>
            <div className=" tracking-widest text-center p-24 col-span-1 flex-col bg-[#CEC3E7] flex items-center justify-center w-full  ">
            <p className='text-lg'>DÉCOUVREZ NOTRE </p>

            <p className='text-4xl'>SÉLECTION SOLAIRE</p>
            </div>
        </div>
    )
}
