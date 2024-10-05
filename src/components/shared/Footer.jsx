import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-lg font-bold mb-1">Your Company</h2>
            <p className="text-gray-400 text-sm p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-lg font-bold mb-1">Quick Links</h2>
            <ul className="text-sm">
              <li className="mb-1">
                <a href="/" className="text-gray-400 hover:text-white">Home</a>
              </li>
              <li className="mb-1">
                <a href="/about" className="text-gray-400 hover:text-white">About</a>
              </li>
              <li className="mb-1">
                <a href="/services" className="text-gray-400 hover:text-white">Services</a>
              </li>
              <li className="mb-1">
                <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-1">Follow Us</h2>
            <div className="flex space-x-3">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="https://x.com/AyokuGilbe56484" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/ayoku_g3/" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-400 text-sm">
          &copy; 2024 <strong>AYG3</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;