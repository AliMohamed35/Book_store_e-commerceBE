import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { getBookId } from "../booksSlice";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { book, isLoading, error } = useAppSelector((state) => state.book);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getBookId(Number(id)));
    }
  }, [dispatch, id]);

  const incrementQuantity = () => {
    if (book && quantity < book.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-red-500 text-lg sm:text-xl mb-4 text-center">
          Error: {error}
        </p>
        <button
          onClick={() => navigate("/books")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Books
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-500 text-center">No book data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm sm:text-base">Back to Books</span>
        </button>

        {/* MAIN CONTENT */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          {/* CARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
            {/* IMAGE */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg sm:rounded-xl p-4">
              <img
                src="https://placehold.co/400x500"
                alt="Book cover"
                className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[400px] h-auto max-h-[350px] sm:max-h-[450px] lg:max-h-[500px] object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>

            {/* DETAILS */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {book?.book_name || "Loading..."}
                </h1>
                <div className="flex flex-wrap items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="text-gray-500 text-xs sm:text-sm ml-2">
                    (4.8) · 156 reviews
                  </span>
                </div>
              </div>

              {/* PRICE */}
              <div className="border-t border-b border-gray-200 py-3 sm:py-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600">
                  ${book?.price ? Number(book.price).toFixed(2) : "0.00"}
                </span>
              </div>

              {/* STOCK */}
              <div className="flex items-center space-x-2">
                {book && book.stock > 0 ? (
                  <>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-medium text-sm sm:text-base">
                      In Stock ({book.stock} available)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
                    <span className="text-red-600 font-medium text-sm sm:text-base">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>

              {/* QUANTITY SELECT */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-3 sm:px-4 py-2 font-medium border-x border-gray-300 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={book && quantity >= book.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ADD TO CART */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  disabled={!book || book.stock === 0}
                  className="flex-1 bg-black text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold
                    hover:bg-gray-700 transition-colors duration-300 disabled:bg-gray-400 
                    disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>Add to Cart</span>
                </button>
                <button className="p-2.5 sm:p-3 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* DESCRIPTION */}
              <div className="pt-4 sm:pt-6 border-t border-gray-200">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {book?.description ||
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
