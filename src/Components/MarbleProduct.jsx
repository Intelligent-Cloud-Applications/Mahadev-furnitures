import { useState } from 'react';
import WhiteImage from '../assets/blackmarble.jpg';
import BlackImage from '../assets/blackmarble.jpg';
import BrownImage from '../assets/red.jpg';
import data from '../../utils/data.json';

const ProductPage = () => {
  const { marble } = data;
  const [expandedProductId, setExpandedProductId] = useState(null);

  const imageMap = {
    WhiteImage,
    BlackImage,
    BrownImage
  };

  const toggleDetails = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom scrollbar styles */}
      <style>
        {`
          /* Custom Scrollbar for Product Cards */
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            transition: all 0.3s ease;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }

          /* Add the scroll reveal animation */
          .scroll-reveal {
            animation: fadeIn 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        {/* Heading with elegant typography */}
        <div className="mb-12 relative">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 text-center mt-16 mb-2 tracking-wide">
            {marble.hero.title}
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto font-light">
            {marble.hero.subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {marble.products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              style={{ perspective: '1000px' }}
            >
              {/* Card container with flip animation */}
              <div
                className={`relative transition-all duration-700 w-full h-full flex-grow flex flex-col`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: expandedProductId === product.id ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  minHeight: '500px',
                }}
              >
                {/* Front side - Product image and basic info */}
                <div
                  className="absolute w-full h-full backface-hidden flex flex-col rounded-xl overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Image Container - Fixed height for consistency */}
                  <div className="h-56 sm:h-64 overflow-hidden">
                    <img
                      src={imageMap[product.image]}
                      alt={product.name}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {product.type}
                    </span>
                  </div>

                  {/* Content with fixed layout for consistency */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    {/* Title and Origin */}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-2">
                        Origin: {product.origin}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              index < Math.floor(product.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-xs sm:text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Description with fixed height for consistency */}
                    <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3 flex-grow">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="bg-gray-100 rounded-lg p-3 mb-4 flex justify-center items-center">
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">${product.price}</span>
                      <span className="text-xs sm:text-sm text-gray-500 ml-2">per sq ft</span>
                    </div>

                    {/* View Details Button - Fixed position at bottom */}
                    <button
                      className="w-full bg-gray-900 text-white py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 mt-auto text-sm sm:text-base font-medium"
                      onClick={() => toggleDetails(product.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Back side - Product details with black background covering entire card */}
                <div
                  className="absolute w-full h-full backface-hidden overflow-hidden rounded-xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {/* Aesthetic black background with subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900"></div>

                  {/* Subtle marble texture overlay with low opacity */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                      backgroundImage: `url(${imageMap[product.image]})`
                    }}
                  ></div>

                  {/* Details content with elegant typography */}
                  <div className="relative text-white p-5 sm:p-7 h-full flex flex-col">
                    {/* Elegant header with subtle border */}
                    <div className="mb-6 pb-4 border-b border-gray-700 border-opacity-50">
                      <h3 className="text-xl sm:text-2xl font-light tracking-wider mb-1">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-300 text-xs sm:text-sm font-light tracking-wide">
                          <span className="mr-2">{product.origin}</span>•
                          <span className="mx-2">{product.type}</span>•
                          <span className="ml-2 text-yellow-400">{product.rating} ★</span>
                        </p>
                        <div className="bg-black bg-opacity-40 px-4 py-2 rounded-lg">
                          <span className="text-lg sm:text-xl font-light tracking-wider text-white">${product.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Product details with elegant styling and enhanced scrollbar */}
                    <div className="space-y-5 flex-grow overflow-y-auto pr-1 custom-scrollbar scroll-reveal">
                      {/* Specifications section */}
                      <div className="mb-5">
                        <h4 className="font-light text-base sm:text-lg tracking-wider border-l-2 border-gray-500 pl-3 mb-4">
                          Product Specifications
                        </h4>

                        <div className="grid grid-cols-1 gap-4 text-sm">
                          <div className="flex flex-col bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                            <span className="text-gray-400 font-light uppercase text-xs tracking-wider mb-1">Durability</span>
                            <span className="text-white font-light tracking-wide">{product.specifications.durability}</span>
                          </div>

                          <div className="flex flex-col bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                            <span className="text-gray-400 font-light uppercase text-xs tracking-wider mb-1">Expected Lifetime</span>
                            <span className="text-white font-light tracking-wide">{product.specifications.lifetime}</span>
                          </div>

                          <div className="flex flex-col bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                            <span className="text-gray-400 font-light uppercase text-xs tracking-wider mb-1">Applications</span>
                            <span className="text-white font-light tracking-wide">{product.specifications.applications}</span>
                          </div>

                          <div className="flex flex-col bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                            <span className="text-gray-400 font-light uppercase text-xs tracking-wider mb-1">Maintenance</span>
                            <span className="text-white font-light tracking-wide">{product.specifications.maintenance}</span>
                          </div>

                          <div className="flex flex-col bg-black bg-opacity-40 p-3 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                            <span className="text-gray-400 font-light uppercase text-xs tracking-wider mb-1">Availability</span>
                            <span className="text-white font-light tracking-wide">{product.specifications.availability}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back to Product Button - Updated with aesthetic color */}
                    <div className="mt-5">
                      <button
                        className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-light tracking-wider py-2 sm:py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base hover:from-white hover:to-white"
                        onClick={() => toggleDetails(product.id)}
                      >
                        Back to Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;