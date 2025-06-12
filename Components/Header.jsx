import "./Header.css"
import "/movie.png"
import SortComponent from "./Sorting"
import Search from "./Search"

export default function Header({ handleSearch, searchQuery, clearSearch, sortHandlers, currentMovies, fetchNowPlayingMovies, movies, setMovies }) {
  return (
    <header className="header-container">
      <div className="banner">
        <img className="header-img" src="./public/movie.png" alt="video icon" />
        <h2 className="header-title">Jarvis Flixster</h2>
        <img className="header-img2" src="./public/movie.png" alt="video icon" />
      </div>
      <div className="search-sort-container">
        <Search
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          clearSearch={clearSearch}
          fetchNowPlayingMovies={fetchNowPlayingMovies}
          movies={movies}
          setMovies={setMovies}
        />
        <SortComponent
          moviesToSort={currentMovies}
          onSortSelectChange={sortHandlers}
        />
      </div>
    </header>
  )
}
