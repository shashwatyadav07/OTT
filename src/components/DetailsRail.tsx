import React, { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import "./Rail.css";
import type { Movie } from "../types/Movies";

interface DetailsRailProps {
  title: string;
  ids: number[]; // list of movie ids to fetch details for
  fetchDetail: (id: number) => Promise<any>;
  cardWidth?: number;
  gap?: number;
}

export const DetailsRail = ({
  title,
  ids,
  fetchDetail,
  cardWidth = 300,
  gap = 16,
}: DetailsRailProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all(ids.map((id) => fetchDetail(id)))
      .then((results) => {
        if (!mounted) return;
        // results are detail objects
        setMovies(results);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message ?? "Failed to fetch details");
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [ids, fetchDetail]);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [movies]);

  const scroll = (direction: number) => {
    const el = railRef.current;
    if (!el) return;
    const distance = (cardWidth + gap) * 2;
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  const Url = "https://image.tmdb.org/t/p/w500";

  if (loading)
    return (
      <div className="movie-list">
        <div className="rail-title">{title}</div>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="movie-list">
        <div className="rail-title">{title}</div>
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="movie-list">
      <div className="rail-title">{title}</div>
      <div className="rail-wrapper">
        {canScrollLeft && (
          <button
            className="rail-button left"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}

        <div className="rail" ref={railRef}>
          {movies.map((movie: Movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              imageUrl={
                movie.backdrop_path
                  ? `${Url}${movie.backdrop_path}`
                  : movie.poster_path
                  ? `${Url}${movie.poster_path}`
                  : "https://via.placeholder.com/500x281?text=No+Image"
              }
              description={movie.overview}
            />
          ))}
        </div>

        {canScrollRight && (
          <button
            className="rail-button right"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};
