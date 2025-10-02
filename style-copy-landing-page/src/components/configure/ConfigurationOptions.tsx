import React from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Plus, Minus } from "lucide-react";

interface ConfigurationOptionsProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  paymentOption: string;
  setPaymentOption: (option: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  isProcessing: boolean;
  onAddToCart: () => void;
}

const COUNTRIES = [
  { code: 'us', name: 'United States', status: 'online' },
  { code: 'ca', name: 'Canada', status: 'online' },
  { code: 'gb', name: 'United Kingdom', status: 'online' },
  { code: 'au', name: 'Australia', status: 'soon' },
  { code: 'fr', name: 'France', status: 'soon' },
  { code: 'de', name: 'Germany', status: 'soon' },
  { code: 'jp', name: 'Japan', status: 'soon' },
  { code: 'cn', name: 'China', status: 'soon' },
  { code: 'in', name: 'India', status: 'soon' },
  { code: 'br', name: 'Brazil', status: 'soon' },
  { code: 'mx', name: 'Mexico', status: 'soon' },
  { code: 'za', name: 'South Africa', status: 'soon' },
  { code: 'it', name: 'Italy', status: 'soon' },
  { code: 'es', name: 'Spain', status: 'soon' },
  { code: 'ru', name: 'Russia', status: 'soon' },
  { code: 'kr', name: 'South Korea', status: 'soon' },
  { code: 'se', name: 'Sweden', status: 'soon' },
  { code: 'no', name: 'Norway', status: 'soon' },
  { code: 'fi', name: 'Finland', status: 'soon' },
  { code: 'dk', name: 'Denmark', status: 'soon' },
  { code: 'nl', name: 'Netherlands', status: 'soon' },
  { code: 'ch', name: 'Switzerland', status: 'soon' },
  { code: 'be', name: 'Belgium', status: 'soon' },
  { code: 'at', name: 'Austria', status: 'soon' },
  { code: 'ie', name: 'Ireland', status: 'soon' },
  { code: 'nz', name: 'New Zealand', status: 'soon' },
  { code: 'sg', name: 'Singapore', status: 'soon' },
  { code: 'hk', name: 'Hong Kong', status: 'soon' },
  { code: 'ar', name: 'Argentina', status: 'soon' },
  { code: 'cl', name: 'Chile', status: 'soon' },
  { code: 'sa', name: 'Saudi Arabia', status: 'soon' },
  { code: 'ae', name: 'United Arab Emirates', status: 'soon' },
  { code: 'tr', name: 'Turkey', status: 'soon' },
  { code: 'pl', name: 'Poland', status: 'soon' },
  { code: 'cz', name: 'Czech Republic', status: 'soon' },
  { code: 'pt', name: 'Portugal', status: 'soon' },
  { code: 'gr', name: 'Greece', status: 'soon' },
  { code: 'hu', name: 'Hungary', status: 'soon' },
  { code: 'il', name: 'Israel', status: 'soon' },
  { code: 'th', name: 'Thailand', status: 'soon' },
  { code: 'my', name: 'Malaysia', status: 'soon' },
  { code: 'ph', name: 'Philippines', status: 'soon' },
  { code: 'id', name: 'Indonesia', status: 'soon' },
  { code: 'vn', name: 'Vietnam', status: 'soon' },
  { code: 'eg', name: 'Egypt', status: 'soon' },
  { code: 'ng', name: 'Nigeria', status: 'soon' },
  { code: 'ke', name: 'Kenya', status: 'soon' },
  { code: 'gh', name: 'Ghana', status: 'soon' },
  { code: 'pk', name: 'Pakistan', status: 'soon' },
  { code: 'bd', name: 'Bangladesh', status: 'soon' },
  { code: 'ua', name: 'Ukraine', status: 'soon' },
  { code: 'ro', name: 'Romania', status: 'soon' },
  { code: 'bg', name: 'Bulgaria', status: 'soon' },
  { code: 'hr', name: 'Croatia', status: 'soon' },
  { code: 'sk', name: 'Slovakia', status: 'soon' },
  { code: 'si', name: 'Slovenia', status: 'soon' },
  { code: 'lt', name: 'Lithuania', status: 'soon' },
  { code: 'lv', name: 'Latvia', status: 'soon' },
  { code: 'ee', name: 'Estonia', status: 'soon' },
  { code: 'rs', name: 'Serbia', status: 'soon' },
  { code: 'ba', name: 'Bosnia and Herzegovina', status: 'soon' },
  { code: 'me', name: 'Montenegro', status: 'soon' },
  { code: 'mk', name: 'North Macedonia', status: 'soon' },
  { code: 'al', name: 'Albania', status: 'soon' },
  { code: 'ge', name: 'Georgia', status: 'soon' },
  { code: 'am', name: 'Armenia', status: 'soon' },
  { code: 'az', name: 'Azerbaijan', status: 'soon' },
  { code: 'kz', name: 'Kazakhstan', status: 'soon' },
  { code: 'uz', name: 'Uzbekistan', status: 'soon' },
  { code: 'tm', name: 'Turkmenistan', status: 'soon' },
  { code: 'kg', name: 'Kyrgyzstan', status: 'soon' },
  { code: 'tj', name: 'Tajikistan', status: 'soon' },
  { code: 'mn', name: 'Mongolia', status: 'soon' },
  { code: 'af', name: 'Afghanistan', status: 'soon' },
  { code: 'ir', name: 'Iran', status: 'soon' },
  { code: 'iq', name: 'Iraq', status: 'soon' },
  { code: 'sy', name: 'Syria', status: 'soon' },
  { code: 'lb', name: 'Lebanon', status: 'soon' },
  { code: 'jo', name: 'Jordan', status: 'soon' },
  { code: 'kw', name: 'Kuwait', status: 'soon' },
  { code: 'qa', name: 'Qatar', status: 'soon' },
  { code: 'om', name: 'Oman', status: 'soon' },
  { code: 'bh', name: 'Bahrain', status: 'soon' },
  { code: 'ye', name: 'Yemen', status: 'soon' },
  { code: 'lk', name: 'Sri Lanka', status: 'soon' },
  { code: 'np', name: 'Nepal', status: 'soon' },
  { code: 'mm', name: 'Myanmar', status: 'soon' },
  { code: 'kh', name: 'Cambodia', status: 'soon' },
  { code: 'la', name: 'Laos', status: 'soon' },
  { code: 'tw', name: 'Taiwan', status: 'soon' },
  { code: 'mo', name: 'Macau', status: 'soon' },
  { code: 'bn', name: 'Brunei', status: 'soon' },
  { code: 'tl', name: 'Timor-Leste', status: 'soon' },
  { code: 'pg', name: 'Papua New Guinea', status: 'soon' },
  { code: 'fj', name: 'Fiji', status: 'soon' },
  { code: 'sb', name: 'Solomon Islands', status: 'soon' },
  { code: 'vu', name: 'Vanuatu', status: 'soon' },
  { code: 'ws', name: 'Samoa', status: 'soon' },
  { code: 'to', name: 'Tonga', status: 'soon' },
  { code: 'tv', name: 'Tuvalu', status: 'soon' },
  { code: 'ki', name: 'Kiribati', status: 'soon' },
  { code: 'nr', name: 'Nauru', status: 'soon' },
  { code: 'pw', name: 'Palau', status: 'soon' },
  { code: 'mh', name: 'Marshall Islands', status: 'soon' },
  { code: 'fm', name: 'Micronesia', status: 'soon' },
  { code: 'mp', name: 'Northern Mariana Islands', status: 'soon' },
  { code: 'gu', name: 'Guam', status: 'soon' },
  { code: 'as', name: 'American Samoa', status: 'soon' },
  { code: 'ck', name: 'Cook Islands', status: 'soon' },
  { code: 'nu', name: 'Niue', status: 'soon' },
  { code: 'tk', name: 'Tokelau', status: 'soon' },
  { code: 'wf', name: 'Wallis and Futuna', status: 'soon' },
  { code: 'pf', name: 'French Polynesia', status: 'soon' },
  { code: 'nc', name: 'New Caledonia', status: 'soon' },
  { code: 're', name: 'Réunion', status: 'soon' },
  { code: 'yt', name: 'Mayotte', status: 'soon' },
  { code: 'mg', name: 'Madagascar', status: 'soon' },
  { code: 'mu', name: 'Mauritius', status: 'soon' },
  { code: 'sc', name: 'Seychelles', status: 'soon' },
  { code: 'km', name: 'Comoros', status: 'soon' },
  { code: 'tz', name: 'Tanzania', status: 'soon' },
  { code: 'ug', name: 'Uganda', status: 'soon' },
  { code: 'zm', name: 'Zambia', status: 'soon' },
  { code: 'mw', name: 'Malawi', status: 'soon' },
  { code: 'mz', name: 'Mozambique', status: 'soon' },
  { code: 'bw', name: 'Botswana', status: 'soon' },
  { code: 'na', name: 'Namibia', status: 'soon' },
  { code: 'sz', name: 'Eswatini', status: 'soon' },
  { code: 'ls', name: 'Lesotho', status: 'soon' },
  { code: 'cv', name: 'Cape Verde', status: 'soon' },
  { code: 'gm', name: 'Gambia', status: 'soon' },
  { code: 'sl', name: 'Sierra Leone', status: 'soon' },
  { code: 'lr', name: 'Liberia', status: 'soon' },
  { code: 'ci', name: 'Ivory Coast', status: 'soon' },
  { code: 'gh', name: 'Ghana', status: 'soon' },
  { code: 'sn', name: 'Senegal', status: 'soon' },
  { code: 'ml', name: 'Mali', status: 'soon' },
  { code: 'bf', name: 'Burkina Faso', status: 'soon' },
  { code: 'ne', name: 'Niger', status: 'soon' },
  { code: 'td', name: 'Chad', status: 'soon' },
  { code: 'cf', name: 'Central African Republic', status: 'soon' },
  { code: 'cm', name: 'Cameroon', status: 'soon' },
  { code: 'ga', name: 'Gabon', status: 'soon' },
  { code: 'cg', name: 'Congo', status: 'soon' },
  { code: 'cd', name: 'Democratic Republic of the Congo', status: 'soon' },
  { code: 'ao', name: 'Angola', status: 'soon' },
  { code: 'gq', name: 'Equatorial Guinea', status: 'soon' },
  { code: 'st', name: 'Sao Tome and Principe', status: 'soon' },
  { code: 'gw', name: 'Guinea-Bissau', status: 'soon' },
  { code: 'gn', name: 'Guinea', status: 'soon' },
  { code: 'mr', name: 'Mauritania', status: 'soon' },
  { code: 'eh', name: 'Western Sahara', status: 'soon' },
  { code: 'ma', name: 'Morocco', status: 'soon' },
  { code: 'dz', name: 'Algeria', status: 'soon' },
  { code: 'tn', name: 'Tunisia', status: 'soon' },
  { code: 'ly', name: 'Libya', status: 'soon' },
  { code: 'sd', name: 'Sudan', status: 'soon' },
  { code: 'ss', name: 'South Sudan', status: 'soon' },
  { code: 'et', name: 'Ethiopia', status: 'soon' },
  { code: 'so', name: 'Somalia', status: 'soon' },
  { code: 'dj', name: 'Djibouti', status: 'soon' },
  { code: 'er', name: 'Eritrea', status: 'soon' },
  { code: 'rw', name: 'Rwanda', status: 'soon' },
  { code: 'bi', name: 'Burundi', status: 'soon' },
  { code: 'cf', name: 'Central African Republic', status: 'soon' },
  { code: 'cg', name: 'Congo', status: 'soon' },
  { code: 'td', name: 'Chad', status: 'soon' },
  { code: 'gq', name: 'Equatorial Guinea', status: 'soon' },
  { code: 'ga', name: 'Gabon', status: 'soon' },
  { code: 'cm', name: 'Cameroon', status: 'soon' },
  { code: 'cf', name: 'Central African Republic', status: 'soon' },
  { code: 'td', name: 'Chad', status: 'soon' },
  { code: 'ne', name: 'Niger', status: 'soon' },
  { code: 'ng', name: 'Nigeria', status: 'soon' },
  { code: 'bj', name: 'Benin', status: 'soon' },
  { code: 'tg', name: 'Togo', status: 'soon' },
  { code: 'bf', name: 'Burkina Faso', status: 'soon' },
  { code: 'ml', name: 'Mali', status: 'soon' },
  { code: 'sn', name: 'Senegal', status: 'soon' },
  { code: 'gm', name: 'Gambia', status: 'soon' },
  { code: 'gw', name: 'Guinea-Bissau', status: 'soon' },
  { code: 'gn', name: 'Guinea', status: 'soon' },
  { code: 'sl', name: 'Sierra Leone', status: 'soon' },
  { code: 'lr', name: 'Liberia', status: 'soon' },
  { code: 'ci', name: 'Ivory Coast', status: 'soon' },
  { code: 'gh', name: 'Ghana', status: 'soon' },
];

const ConfigurationOptions: React.FC<ConfigurationOptionsProps> = ({
  selectedColor,
  setSelectedColor,
  selectedCountry,
  setSelectedCountry,
  paymentOption,
  setPaymentOption,
  quantity,
  setQuantity,
  isProcessing,
  onAddToCart
}) => {
  const colors = [
    {
      id: 'blush-chrome',
      name: 'Blush Chrome',
      customStyle: { background: 'linear-gradient(135deg, #f7cac9 60%, #e6b7c1 100%)', border: '1.5px solid #e6b7c1' },
    },
    {
      id: 'black-mist',
      name: 'Black Mist',
      customStyle: { background: 'linear-gradient(135deg, #232323 80%, #444 100%)', border: '1.5px solid #232323' },
    },
    {
      id: 'ice-chrome',
      name: 'Ice Chrome',
      customStyle: { background: 'linear-gradient(135deg, #e0e5ec 60%, #bfc9d1 100%)', border: '1.5px solid #bfc9d1' },
    },
    {
      id: 'rose-gold',
      name: 'Rose Gold',
      customStyle: { background: 'linear-gradient(135deg, #b76e79 60%, #f7cac9 100%)', border: '1.5px solid #b76e79' },
    },
  ];

  const handleColorSelection = (colorId: string) => {
    setSelectedColor(colorId);
    console.log('Color selected:', colorId);
  };

  const handlePaymentSelection = (option: string) => {
    setPaymentOption(option);
    console.log('Payment option selected:', option);
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-2xl">
      <div className="space-y-6 sm:space-y-8">
        {/* Location */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-sm font-medium text-gray-500">01</span>
            <h3 className="text-lg font-semibold text-black">Location</h3>
          </div>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full cursor-pointer h-12 sm:h-14 text-base">
              <SelectValue>{COUNTRIES.find(c => c.code === selectedCountry)?.name || 'Select Country'}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-80 overflow-y-auto">
              {COUNTRIES.map(country => (
                <SelectItem key={country.code} value={country.code} className="flex items-center justify-between py-3">
                  <span className="text-sm sm:text-base">{country.name}</span>
                  {country.status === 'online' ? (
                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">Online</span>
                  ) : (
                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">Coming Soon</span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Finish */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-sm font-medium text-gray-500">02</span>
            <h3 className="text-lg font-semibold text-black">Finish</h3>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            {colors.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => handleColorSelection(color.id)}
                aria-label={color.name}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/40 group relative
                  ${selectedColor === color.id ? 'ring-2 ring-black/70 scale-105 bg-white/80' : 'hover:scale-102 bg-white/60'}`}
                style={{ minHeight: 48 }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-white/60 shadow"
                  style={color.customStyle}
                >
                  {selectedColor === color.id && (
                    <svg className="w-4 h-4 text-white drop-shadow" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-base font-medium text-gray-800 group-hover:text-black transition-colors">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-sm font-medium text-gray-500">03</span>
            <h3 className="text-lg font-semibold text-black">Quantity</h3>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-10 w-10 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium text-lg">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              className="h-10 w-10 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Payment */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-sm font-medium text-gray-500">04</span>
            <h3 className="text-lg font-semibold text-black">Payment</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Monthly payments starting at $172, full financing details coming soon
          </p>
          
          <RadioGroup value={paymentOption} onValueChange={handlePaymentSelection} className="space-y-4">
            <div className="border rounded-lg p-4 sm:p-6 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handlePaymentSelection('full')}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="font-semibold text-black cursor-pointer text-sm sm:text-base">
                    Full Payment
                  </Label>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-sm text-gray-500">Ships Spring 2026</span>
                  <div className="text-lg font-bold">US$600</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 ml-7 sm:ml-7">
                Priority shipping included. Cancel anytime, full refund guaranteed.
              </p>
            </div>

            <div className="border rounded-lg p-4 sm:p-6 hover:bg-gray-100 transition-colors border-blue-200 bg-blue-50 cursor-pointer" onClick={() => handlePaymentSelection('deposit')}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                  <RadioGroupItem value="deposit" id="deposit" />
                  <Label htmlFor="deposit" className="font-semibold text-black cursor-pointer text-sm sm:text-base">
                    Deposit
                  </Label>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-sm text-gray-500">Ships Spring 2026</span>
                  <div className="text-lg font-bold">US$50</div>
                </div>
              </div>
              <p className="text-sm text-gray-600 ml-7 sm:ml-7">
                Secure your spot. Financing options will be offered closer to shipment. Cancel any time for a full refund.
              </p>
            </div>
          </RadioGroup>
        </div>

        {/* Total */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-medium text-gray-500">05</span>
            <h3 className="text-lg font-semibold text-black">Total</h3>
            <div className="text-2xl font-bold">
              US${(paymentOption === 'full' ? 600 : 50) * quantity}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button 
            onClick={onAddToCart}
            disabled={isProcessing}
            className="w-full bg-black text-white hover:bg-gray-800 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-lg cursor-pointer h-14 sm:h-16"
          >
            <span className="flex items-center justify-between w-full">
              <span>{isProcessing ? 'Adding...' : 'Add to Cart'}</span>
              {!isProcessing && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationOptions;
