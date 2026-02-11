const Categories = () => {
  const categories = [
    {
      title: "Text Books",
      description: "Learning Resources",
      bgColor: "bg-white",
      textColor: "text-gray-800",
    },
    {
      title: "Thriller",
      description: "Intriguing Suspense",
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
    {
      title: "Romance",
      description: "Heartfelt Passion",
      bgColor: "bg-white",
      textColor: "text-gray-800",
    },
    {
      title: "Kids Books",
      description: "Imaginative Journeys",
      bgColor: "bg-orange-500",
      textColor: "text-white",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-orange-500">
            OUR CATEGORIES
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bgColor} ${category.textColor} p- sm:p-8 lg:p-10 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer`}
            >
              <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-2">
                {category.title}
              </h3>
              <p className="text-base sm:text-lg lg:text-md opacity-80">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
