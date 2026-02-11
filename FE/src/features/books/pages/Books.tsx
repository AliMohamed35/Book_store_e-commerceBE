import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getAllBooks } from "../booksSlice";
import { addOrder } from "../../orders/ordersSlice";

const BooksPage = () => {
  const dispatch = useAppDispatch();
  const { books, isLoading, error } = useAppSelector((state) => state.book);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const handleAddToCart = (bookId: number) => {
    dispatch(addOrder([{ bookId, quantity: 1 }]));
  };

  return (
    <>
      {/* <div className="bg-[url(/public/library.jpg)] bg-center bg-no-repeat w-full min-h-120 bg-red-500 relative">
        
        <div className="absolute w-full bg-[#000000ab] z-10 h-full">
          <div className="text-white text-center">
            <h1>Hello</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
              blanditiis, nemo accusamus labore cupiditate recusandae incidunt
              atque earum magni consectetur illo tenetur maiores quam, quisquam
              dignissimos! Recusandae sit hic dolore?
            </p>
          </div>
        </div>
      </div> */}

      {/* BOOKS */}
      <section className="max-w-7xl mx-auto mt-16 px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Our Collection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of books across all genres
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books?.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Book Cover Placeholder */}
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-6xl">📚</span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {b.book_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {b.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-600">
                      ${b.price}
                    </span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${b.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {b.stock > 0 ? `${b.stock} in stock` : "Out of stock"}
                    </span>
                  </div>

                  <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={b.stock === 0}
                    onClick={() => handleAddToCart(b.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {books?.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">📖</span>
            <p className="text-gray-600 text-lg">
              No books available at the moment
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default BooksPage;
