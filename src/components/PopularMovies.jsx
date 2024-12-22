import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import MovieCard from "./MovieCard";

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        setMovies(response.data.results); // Corrected: You need to access results here since the API returns a list of movies.
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="grid place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full h-full bg-gray-600 px-12 pt-32">
      {movies.map((movie) => (
        <NavLink key={movie.id} to={`/movie/${movie.id}`}>
          <MovieCard items={movie} />
        </NavLink>
      ))}
    </div>
  );
}

export default PopularMovies;
