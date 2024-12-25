import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

function PopularMovies() {
  const [movies, setMovies] = useState([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // total pages
  const moviesPerPage = 8; // Display 8 movies per page

  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages); // Set the total number of pages
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [currentPage]); // Fetch new movies when the page changes

  // previous button
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Next button
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full h-full bg-gray-600 md:px-12 pt-32">
      <div className="grid place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10  ">
        {movies.slice(0, moviesPerPage).map((movie) => (
          <NavLink key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard items={movie} />
          </NavLink>
        ))}
      </div>

      {/* Pagination Component & pass props*/}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}

export default PopularMovies;
