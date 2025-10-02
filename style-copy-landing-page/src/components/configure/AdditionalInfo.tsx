import React from 'react';
import { Calendar, Zap, Shield } from "lucide-react";

const AdditionalInfo = () => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100">
      <div className="text-center flex flex-col items-center">
        <span className="relative flex items-center justify-center mb-3">
          <Calendar className="w-8 h-8 text-blue-500 animate-pulse" aria-label="Shipping Timeline" />
        </span>
        <h4 className="font-semibold text-black mb-2">Shipping Timeline</h4>
        <p className="text-sm text-gray-600">HALO ships Spring 2026. Full confirmation + balance request 60 days prior to delivery.</p>
      </div>
      <div className="text-center flex flex-col items-center">
        <span className="relative flex items-center justify-center mb-3">
          <Zap className="w-8 h-8 text-yellow-500 animate-bounce" aria-label="Early Access" />
        </span>
        <h4 className="font-semibold text-black mb-2">Early Access</h4>
        <p className="text-sm text-gray-600">Get first access to Atmos software updates and be part of shaping the future of wearable AI.</p>
      </div>
      <div className="text-center flex flex-col items-center">
        <span className="relative flex items-center justify-center mb-3">
          <Shield className="w-8 h-8 text-green-500 animate-pulse" aria-label="Protected" />
        </span>
        <h4 className="font-semibold text-black mb-2">Protected</h4>
        <p className="text-sm text-gray-600">SSL protected checkout. Cancel anytime for a full refund before shipment.</p>
      </div>
    </div>
  );
};

export default AdditionalInfo;
