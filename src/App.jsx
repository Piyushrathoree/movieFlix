import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import Card from "./components/Card.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [debounceTerms, setDebounceTerms] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  //   const fetchMovies = async () => {
  //     try {
  //       const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  //       const response = await fetch(endpoint, API_OPTIONS);
  //       if (!response.ok) {
  //         throw new Error("failed to fetch movies ");
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  useDebounce(() => setDebounceTerms(searchTerm), 500, [searchTerm]);
  useEffect(() => {
    document.body.style.overflowX = "hidden";
  }, []);
  const fetchMovies = async (query = "") => {
    setLoading(true);
    const url =
      "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : url;
      const response = await fetch(endpoint, options);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      if (data.response == "False") {
        setMovieList([]);
        return;
      }
      setMovieList(data.results);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [debounceTerms]);
  useEffect(() => {
    loadTrendingMovies();
  }, []);
  return (
    <>
      <main>
        <div className="pattern font-dm-sans" />

        <div className="wrapper">
          <header>
            <img src="hero-img.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without the Hassle
            </h1>
          </header>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {trendingMovies.length > 0 ? (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie ,index)=>(
                  <li key={movie.$id}>
                    <p>{index+1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <section className="all-movies ">
            <h2>All Movies</h2>
            {loading ? (
              <Spinner />
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <Card key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
