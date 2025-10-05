import React from "react";
import { useMovies } from "../hooks/useMovies";
import { Card } from "./Card";
import "./Rail.css";

export const Rail = () => {
  const { movies, loading, error } = useMovies();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const Url = "https://image.tmdb.org/t/p/w500";
  console.log(movies);
  return (
    <div className="movie-list">
      {/* Movie cards will go here */}
      <div className="rail-title">Popular movies... </div>
      <div className="rail">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            imageUrl={`${Url}${
              movie.backdrop_path ??
              "https://image.tmdb.org/t/p/w500/mwI1OarF7BVWwn5O1Ng73UhyctP.jpg"
            }`}
            description={movie.overview}
          />
        ))}
      </div>
    </div>
  );
};
