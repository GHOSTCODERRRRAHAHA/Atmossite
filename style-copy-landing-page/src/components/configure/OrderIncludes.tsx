import React from 'react';
import { Watch, Mic, Zap, BatteryFull, Gift } from 'lucide-react';

const includedItems = [
  {
    label: 'HALO Smartband – Launch Edition',
    icon: <Watch className="w-5 h-5 text-gray-700" aria-label="Smartband" />,
  },
  {
    label: 'AI-Powered Voice & Sensor Engine',
    icon: <Mic className="w-5 h-5 text-gray-700" aria-label="Voice & Sensor" />,
  },
  {
    label: 'MagLink Fast Charging Cable',
    icon: <Zap className="w-5 h-5 text-gray-700" aria-label="Charging Cable" />,
  },
  {
    label: 'Dual Sensor Battery Unit',
    icon: <BatteryFull className="w-5 h-5 text-gray-700" aria-label="Battery Unit" />,
  },
  {
    label: 'Welcome Kit + Access to Atmos Companion App (Beta)',
    icon: <Gift className="w-5 h-5 text-gray-700" aria-label="Welcome Kit" />,
  },
];

const OrderIncludes = () => {
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8 border border-gray-100">
      <h3 className="text-xl font-bold text-black mb-4">Order Includes</h3>
      <div className="space-y-4 divide-y divide-gray-200">
        {includedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 pt-2 first:pt-0">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg shadow-sm">
              {item.icon}
            </div>
            <span className="text-gray-700 text-base font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderIncludes;
