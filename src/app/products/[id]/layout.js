"use client"; // Ensure this is the correct client component

import Footer from '../../Components/Footer';
import Heading from '../../Components/Heading';
import Navbar from '../../Components/Navbar';
import NavLinks from '../../Components/NavLinks';
import { Providers } from '../../../redux/reduxWrapper'; // Import the wrapper
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen"> {/* Ensure the layout takes full height of the viewport */}
        <Heading />
        <Navbar />
        <NavLinks />
        
        {/* Main content area that expands to fill available space */}
        <main className="flex-grow"> 
          {children}
        </main>
        
        {/* Footer is placed at the bottom */}
        <Footer />

        {/* Toast notifications */}
        <Toaster />
      </div>
    </Providers>
  );
}
