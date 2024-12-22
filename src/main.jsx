import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import react slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import Layout from "./layout/Layout";
import MovieCard from "./components/MovieCard";
import PopularMovies from "./components/PopularMovies";
import TopRatedMovies from "./components/TopRatedMovies";
import UpcomingMovies from "./components/UpcomingMovies";
import MovieDetail from "./components/MovieDetail";
import SearchMovie from "./components/SearchMovie";

//Routing
const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <PopularMovies />,
      },

      {
        path: "/movie-card",
        element: <MovieCard />,
      },
      {
        path: "/top-rated-movies",
        element: <TopRatedMovies />,
      },
      {
        path: "/upcoming-movies",
        element: <UpcomingMovies />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/search-movie/:term",
        element: <SearchMovie />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </StrictMode>
);
