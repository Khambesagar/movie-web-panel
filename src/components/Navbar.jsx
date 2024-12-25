import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const navigate = useNavigate();

  // Toggle button for responsive
  const [toggle, setToggle] = useState(false);

  // Search input bar state
  const [search, setSearch] = useState("");

  // For search bar function
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search-movie/${search}`);
    setSearch("");
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-gray-500 z-50">
        <div className="container mx-auto flex justify-between py-5">
          <Link to="/">
            <h1 className="text-white text-xl px-5">MovieDB</h1>
          </Link>

          {/* Menu for larger screens */}
          <ul className="hidden lg:flex text-gray-300 gap-5 px-2">
            {/* Popular Movies */}
            <Link to="/">
              <li>Popular</li>
            </Link>
            {/* Top Rated Movies */}
            <Link to="/top-rated-movies">
              <li>Top Rated</li>
            </Link>
            {/* Upcoming Movies */}
            <Link to="/upcoming-movies">
              <li>Upcoming</li>
            </Link>
            {/* Search Bar */}
            <li>
              <form onSubmit={submitHandler} className="search_bar">
                <span className="flex gap-2">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Movie Name"
                    className="rounded-sm px-2 text-black"
                  />
                  <button className="bg-gray-400 px-2 text-white rounded-sm">
                    Search
                  </button>
                </span>
              </form>
            </li>
          </ul>

          {/* Mobile Hamburger Icon */}
          <button
            className="lg:hidden text-white px-3 text-xl"
            onClick={() => setToggle(!toggle)}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu (visible when toggle is true) */}
      <div
        className={`lg:hidden ${toggle ? "block" : "hidden"} bg-gray-500 p-5`}
      >
        <ul className="flex flex-col text-gray-300 gap-5">
          {/* Popular Movies */}
          <Link to="/">
            <li>Popular</li>
          </Link>
          {/* Top Rated Movies */}
          <Link to="/top-rated-movies">
            <li>Top Rated</li>
          </Link>
          {/* Upcoming Movies */}
          <Link to="/upcoming-movies">
            <li>Upcoming</li>
          </Link>
          {/* Search Bar */}
          <li>
            <form onSubmit={submitHandler} className="search_bar">
              <span className="flex gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Movie Name"
                  className="rounded-sm px-2 text-black"
                />
                <button className="bg-gray-400 px-2 text-white rounded-sm">
                  Search
                </button>
              </span>
            </form>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
