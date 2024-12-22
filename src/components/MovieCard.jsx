import React from "react";

function MovieCard({ items }) {
  if (!items) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="w-60  ">
        <div className="rounded-md">
          <div className="cursor-pointer">
            <figure className="">
              <img
                src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`}
                alt={items.title}
                className="h-65 w-full"
              />
            </figure>
            <div className="text-white text-center">
              <h3>{items.title}</h3>
              <h3>Rating: {items.vote_average}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
