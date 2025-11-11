import React, { useEffect, useRef, useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { Card } from "./Card";
import "./Rail.css";

export const Rail = () => {
  const { movies, loading, error } = useMovies();
  const railRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // adjust these to match .card width and .rail gap in CSS
  const CARD_WIDTH = 300;
  const GAP = 16;

  useEffect(() => {
    const el = railRef.current;
    const update = () => {
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    if (!el) return;
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
    const distance = (CARD_WIDTH + GAP) * 2; // scroll by 2 cards
    el.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const Url = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-list">
      <div className="rail-title">Popular movies...</div>

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

        <button
          className="rail-button right"
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          disabled={!canScrollRight}
        >
          ›
        </button>
      </div>
    </div>
  );
};
