import "./Header.css";
export const Header = () => {
  return (
    <div className="header">
      <div>
        <button>Home</button>
        <button>Movies</button>
        <button>TV Shows</button>
        <button>Web Series</button>
      </div>
      <div>
        <button>Sign IN</button>
        <button>Sign UP</button>
      </div>
    </div>
  );
};
