const Hero = () => {
  return (
    <section className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center shadow-xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12  bg-[url(/public/library.jpg)] relative">
      <div className="absolute w-full bg-[#000000ab] z-10 h-full">
          
        </div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 z-20">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 text-white leading-tight">
            DISCOVER OUR LATEST BOOK COLLECTIONS
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-xl text-white max-w-2xl mx-auto lg:mx-0">
            Unveiling Ancient Narratives and Forgotten Tales: Rediscover
            History's Rich Tapestry through the Lens of World and Wonder.
          </p>

          <button className="shadow-xl mt-6 sm:mt-8 lg:mt-10 bg-orange-500 px-8 sm:px-12 lg:px-16 xl:px-20 py-3 sm:py-4 lg:py-5 rounded-lg text-white font-bold text-base sm:text-lg lg:text-xl hover:bg-orange-400 active:bg-orange-600 transition-colors">
            Explore All
          </button>
        </div>

        {/* Book Image */}
        {/* <div className="flex-shrink-0 w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]">
          <img
            src="/book2.jpg"
            alt="Book cover"
            className="w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
