import React, { useState, useEffect } from 'react';

const colorImages: Record<string, string> = {
  'blush-chrome': '/Blush chrome.png',
  'ice-chrome': '/ice Chrome.png',
  'black-mist': '/Obsidian Mist.png',
  'rose-gold': '/Rose Gold.png',
};

interface ProductImageProps {
  selectedColor: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ selectedColor }) => {
  const [imageSrc, setImageSrc] = useState(colorImages[selectedColor] || colorImages['blush-chrome']);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => {
      setImageSrc(colorImages[selectedColor] || colorImages['blush-chrome']);
      setFade(true);
    }, 200);
    return () => clearTimeout(timeout);
  }, [selectedColor]);

  const altText = {
    'blush-chrome': 'Blush Chrome Band',
    'ice-chrome': 'Ice Chrome Band',
    'black-mist': 'Black Mist Band',
    'rose-gold': 'Rose Gold Band',
  }[selectedColor] || 'Atmos Band';

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl flex items-center justify-center aspect-square w-full max-w-xl mx-auto shadow-xl overflow-hidden border border-white/30">
      <img
        src={imageSrc}
        alt={altText}
        className={`w-full h-full object-cover object-center rounded-2xl transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        draggable={false}
      />
    </div>
  );
};

export default ProductImage;
