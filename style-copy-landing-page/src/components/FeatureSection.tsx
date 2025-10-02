interface FeatureSectionProps {
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
  id?: string;
  showImage?: boolean;
  imageUrl?: string;
}

const FeatureSection = ({
  title,
  description,
  imagePosition = 'right',
  id,
  showImage = true,
  imageUrl
}: FeatureSectionProps) => {
  return (
    <section id={id} className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className={`grid ${showImage ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} items-center gap-12 lg:gap-20 ${imagePosition === 'left' && showImage ? 'lg:grid-flow-col-dense' : ''}`}>
          
          {/* Content */}
          <div className={`${showImage ? '' : 'max-w-4xl mx-auto text-center'} animate-fade-in`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
              {title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Image */}
          {showImage && (
            <div className={`animate-fade-in [animation-delay:300ms] ${imagePosition === 'left' ? 'lg:col-start-1' : ''}`}>
              <div className="relative group">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl aspect-square flex items-center justify-center transition-all duration-500 hover:scale-105 overflow-hidden shadow-lg hover:shadow-xl">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt="Atmos device" 
                      className="w-full h-full rounded-3xl object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-300 rounded-full"></div>
                  )}
                </div>
                {/* Subtle decorative element */}
                <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-gray-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;