import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-green-500 py-8 mt-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white font-bold text-lg mb-4 hover:text-yellow-300 transition duration-300" title="Buy from here">
          Bhupendra Recipes for Rapidious
        </p>
        
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://facebook.com" title="Facebook" className="text-white hover:text-yellow-300 transition duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" title="Twitter" className="text-white hover:text-yellow-300 transition duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" title="Instagram" className="text-white hover:text-yellow-300 transition duration-300">
            <FaInstagram size={24} />
          </a>
        </div>
        
        <button className="mt-4 px-6 py-2 bg-yellow-400 text-blue-700 font-semibold rounded-lg hover:bg-yellow-500 transition duration-300">
          Contact Us
        </button>
      </div>
    </footer>
  );
};
