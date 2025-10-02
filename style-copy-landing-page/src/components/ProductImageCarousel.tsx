import { useState } from "react";

const ProductImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  // cache-buster query to ensure the latest public images load after updates
  const cacheBuster = `?v=${Math.floor(Date.now() / 1000)}`;

  const images = [
    {
      src: "/FrontView.png" + cacheBuster,
      alt: "Atmos Halo - Front View"
    },
    {
      src: "/Back.png" + cacheBuster,
      alt: "Atmos Halo - Back View"
    },
    {
      src: "/Angledview.png" + cacheBuster,
      alt: "Atmos Halo - Angled View"
    }
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-2xl aspect-square flex items-center justify-center overflow-hidden relative">
      {/* Image Container with Transition */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 w-full h-full object-contain rounded-2xl transition-opacity duration-500 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2">
        <button 
          onClick={prevImage}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-white text-sm font-medium">
          {currentImage + 1}/{images.length}
        </span>
        <button 
          onClick={nextImage}
          className="text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductImageCarousel;
