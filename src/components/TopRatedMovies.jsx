import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { NavLink } from "react-router";

function TopRatedMovies() {
  const [topmovies, setTopMovies] = useState([]);
  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
        );
        setTopMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopMovies();
  }, []);

  return (
    <>
      <div>
        <div className=" grid place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full h-full bg-gray-600 px-12 pb-10 pt-32">
          {topmovies.map((movie) => (
            <NavLink key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard key={movie.id} items={movie} />
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default TopRatedMovies;
