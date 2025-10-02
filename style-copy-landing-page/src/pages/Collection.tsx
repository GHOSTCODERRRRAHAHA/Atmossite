import Header from "@/components/Header";
import { Link } from "react-router-dom";

const Collection = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <section className="flex flex-col items-center justify-center min-h-[80vh] pt-16 sm:pt-24 px-4 sm:px-6">
        <img
          src="/collection-bg.png"
          alt="Collection bands"
          className="w-full max-w-2xl sm:max-w-3xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl mb-6 sm:mb-10 object-cover"
          style={{ aspectRatio: '16/9' }}
        />
        <Link to="/purchase" className="bg-white/90 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl px-6 sm:px-8 py-8 sm:py-12 max-w-lg sm:max-w-2xl w-full flex flex-col items-center transition hover:shadow-2xl hover:bg-gray-100 cursor-pointer">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 text-center animate-fade-in">
            V1 Collection
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 text-center animate-fade-in [animation-delay:200ms] leading-relaxed">
            The future of wearable AI, reimagined
          </p>
          <p className="text-base sm:text-lg text-gray-500 text-center animate-fade-in [animation-delay:400ms] leading-relaxed">
            Experience the perfect blend of technology and design
          </p>
        </Link>
      </section>
    </div>
  );
};

export default Collection;
