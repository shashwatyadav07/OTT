import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/tmdb";
// import { Movie } from "../types/Movies";
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null; // <-- Add this line
  overview: string;
  release_date: string;
  vote_average: number;
}
export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPopularMovies()
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { movies, loading, error };
};