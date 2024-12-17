import React from 'react'
import NavLinks from './Components/NavLinks'
import Carousel from './Components/Carousel'
import Categories from './Components/Categories'
import Products from './Components/Products'
import Heading from './Components/Heading'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

export default function Home() {
  return (
    <div  className=''>
        <Heading/>
        <Navbar/> 
        <NavLinks/>
        <Carousel/>
        <Categories/>
        <Products/>
        <Footer/>

    </div>
  )
}
