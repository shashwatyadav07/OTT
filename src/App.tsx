import { Header } from "./components/Header";
import { Rail } from "./components/Rail";
import { DetailsRail } from "./components/DetailsRail";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchMovieDetails,
} from "./services/tmdb";

function App() {
  // example ids for DetailsRail — replace with IDs you want to show
  const featuredIds = [550, 299534, 424]; // e.g. Fight Club, Avengers: Endgame, Schindler's List (change as needed)

  return (
    <div>
      <Header />
      <div style={{ padding: 12 }}>
        <Rail title="Popular Movies" fetcher={fetchPopularMovies} />
        <Rail title="Top Rated" fetcher={fetchTopRatedMovies} />
        <DetailsRail
          title="Featured"
          ids={featuredIds}
          fetchDetail={fetchMovieDetails}
        />
      </div>
    </div>
  );
}

export default App;
