import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function SearchMovie() {
  const [movie, setMovie] = useState([]);
  const [searchMovie, setSearchMovie] = useState([]);
  const { term } = useParams();

  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${term}&page=1`
        );
        setMovie(res.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [term]);

  useEffect(() => {
    setSearchMovie(
      movie.filter((data) =>
        data?.title?.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, [term, movie]);

  return (
    <>
      <div className=" grid place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full h-full bg-gray-600 px-12 pb-10 pt-32">
        {searchMovie.map((movie) => (
          <NavLink key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard key={movie.id} items={movie} />
          </NavLink>
        ))}
      </div>
      <div>SearchMovie</div>
    </>
  );
}

export default SearchMovie;
