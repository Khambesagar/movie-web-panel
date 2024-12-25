import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

function SearchMovie() {
  const [movie, setMovie] = useState([]);
  const [searchMovie, setSearchMovie] = useState([]);
  const { term } = useParams();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Keep track of total pages
  const moviesPerPage = 8; // Display 8 movies per page

  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${term}&page=${currentPage}`
        );
        setMovie(res.data.results);
        setTotalPages(res.data.total_pages); // Set the total number of pages
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [term, currentPage]);

  useEffect(() => {
    setSearchMovie(
      movie.filter((data) =>
        data?.title?.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [term, movie, currentPage]);

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
      <div className="w-full h-full bg-gray-600 md:px-12 pt-32">
        <div className=" grid place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10  pb-10">
          {searchMovie.slice(0, moviesPerPage).map((movie) => (
            <NavLink key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard key={movie.id} items={movie} />
            </NavLink>
          ))}
        </div>
        <div>
          {/* Pagination Component & pass props*/}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </div>
      </div>
    </>
  );
}

export default SearchMovie;
