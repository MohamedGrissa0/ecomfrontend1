"use client"
import localFont from "next/font/local";
import "./globals.css";
import Heading from "./Components/Heading";
import Head from "next/head";
import Navbar from "./Components/Navbar";
import NavLinks from "./Components/NavLinks";
import Carousel from "./Components/Carousel";
import Categories from "./Components/Categories";
import Products from "./Components/Products";
import Footer from "./Components/Footer";
import { Providers } from '../redux/reduxWrapper'; // Import the wrapper
import { Toaster } from "react-hot-toast";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body
        className={``}
      >
                <Providers>

      

        {children}
        <Toaster/>

        </Providers>

      </body>
    </html>
  );
}
