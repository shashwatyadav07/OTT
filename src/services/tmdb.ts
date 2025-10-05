// src/services/tmdb.ts
const API_KEY = "50dc32b02747ce05f29bcd62cb5925de";
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  return res.json();
};

export const fetchTopRatedMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch top rated movies");
  return res.json();
};

export const fetchMovieDetails = async (id: number) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
};
