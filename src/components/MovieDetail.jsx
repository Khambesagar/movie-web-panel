import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// react-slick
import Slider from "react-slick";

function MovieDetail() {
  const { id } = useParams();

  const [movieDetail, setMovieDetail] = useState(null);
  const [cast, setCast] = useState([]);
  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setMovieDetail(movieDetails.data);

        // Movie cast (actors)
        const movieCast = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
        );
        setCast(movieCast.data.cast);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movieDetail) return <div>Loading...</div>;

  // Carousel pagination
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="bg-gray-600 pt-24 md:pt-32 md:p-10 p-2">
        <div className="md:h-96 grid md:grid-cols-[1fr_1fr] gap-5 bg-slate-900 text-white rounded-md">
          <div className="md:p-6 overflow-hidden">
            <div className="md:grid md:grid-cols-[1fr_1fr] gap-5 p-2">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`}
                  alt={movieDetail.title}
                />
              </div>
              <div className="grid gap-1">
                <h1 className="md:text-xl lg:text-2xl">{movieDetail.title}</h1>
                <p className="text-blue-300 md:text-xl">
                  Rating: {movieDetail.vote_average}
                </p>

                {/* add genres*/}
                <p className="text-gray-400">
                  {movieDetail.genres.map((genre) => genre.name).join(", ")}
                </p>

                <p className="text-gray-400">
                  Release Date : {movieDetail.release_date}
                </p>
              </div>
            </div>
            {/* Overview section */}
            <div className="p-2 sm:text-md">
              <p className="md:text-xl">Overview</p>
              <p className="text-gray-400 pb-2">{movieDetail.overview}</p>
            </div>
          </div>

          {/* Poster Image */}
          <div className="hidden md:block md:flex justify-end">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
              alt={movieDetail.title}
              className=" md:h-96 md:w-96 p-2 rounded-r-lg"
            />
          </div>
        </div>

        {/* Cast Data */}
        <div className="mt-2 p-5">
          <h1 className="text-2xl font-bold text-white py-2">Cast</h1>
          <div className="mt-2">
            <Slider {...settings}>
              {cast.map((actor) => (
                <div key={actor.id} className="cast-item px-2">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-auto"
                  />
                  <h3 className="text-gray-200">{actor.name}</h3>
                  <p className="text-gray-200">Character: {actor.character}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
