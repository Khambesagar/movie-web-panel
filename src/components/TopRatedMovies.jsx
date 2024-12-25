import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { NavLink } from "react-router";
import Pagination from "./Pagination";

function TopRatedMovies() {
  const [topmovies, setTopMovies] = useState([]);
  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Keep track of total pages
  const moviesPerPage = 8; // Display 8 movies per page

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}`
        );
        setTopMovies(response.data.results);
        setTotalPages(response.data.total_pages); // Set the total number of pages
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopMovies();
  }, [currentPage]);

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
    <>
      <div className="w-full h-full bg-gray-600  pb-10 pt-32">
        <div className=" grid place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-12">
          {topmovies.slice(0, moviesPerPage).map((movie) => (
            <NavLink key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard key={movie.id} items={movie} />
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
    </>
  );
}

export default TopRatedMovies;
