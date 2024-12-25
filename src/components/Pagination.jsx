import React from "react";

// use Props...
const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4 mt-8 p-5">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
      >
        Prev
      </button>

      <span className="hidden md:block text-white ">
        Page {currentPage} of {totalPages}
      </span>

      <span className="text-white block sm:hidden w-8 h-8 border border-blue-500 rounded-full p-2 flex items-center justify-center ">
        {currentPage}
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
