import React from 'react';

const ProductInfo = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold text-black mb-6">HALO</h1>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-lg text-gray-700">Batch I</span>
          <div className="flex items-center gap-2">
            <span className="relative flex items-center" aria-label="Available">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
            </span>
            <span className="text-sm font-medium text-green-600">Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
