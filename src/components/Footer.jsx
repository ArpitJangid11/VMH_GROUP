import React from 'react'

const Footer = () => (
  <footer className="bg-blue-600 text-white py-4 text-center w-full">
    <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} VMH Groups Market Research.hi All rights reserved.
      </p>
      <nav className="mt-2 sm:mt-0">
        <a href="/about" className="text-white hover:underline mx-2">About</a>
        <a href="/contact" className="text-white hover:underline mx-2">Contact</a>
        <a href="/faqs" className="text-white hover:underline mx-2">FAQs</a>
      </nav>
    </div>
  </footer>
);

export default Footer;
