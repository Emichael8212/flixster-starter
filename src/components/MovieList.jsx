import { useState, useEffect } from "react"
import "./MovieList.css"
import Moviecard from "./Moviecard"
import ModalComponent from "./ModalComponent"

export default function MovieList({ searchQuery, isSearching, setIsSearching, sortState,
  currentMovies, setCurrentMovies, movies, setMovies, isClearing, likedMovies,
  setLikedMovies, watchedMovies, setWatchedMovies, activeView }) {
  const [searchResults, setSearchResults] = useState([])
  const [page, setPage] = useState(1)

  // the state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [movieDetails, setMovieDetails] = useState(null)


  // API options
  const VITE_READ_TOKEN = import.meta.env.VITE_API_KEY
  const apiOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${VITE_READ_TOKEN}`,
  }}


  // Modal functions
  async function openModal(movie) {
    setModalData(movie)
    setIsModalOpen(true)

    // Fetch additional movie details when modal is opened
    try {
      const movieId = movie.id;
      await fetchMovieDetails(movieId);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  // Fetch movie details including trailer, runtime, and genres
  async function fetchMovieDetails(movieId) {
    try {
      // Fetch movie details
      const detailsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos`,
        apiOptions
      );
      const details = await detailsResponse.json();
      setMovieDetails(details);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  // Fetch now playing movies
  async function fetchNowPlayingMovies(pageNum) {
    try {
      const apiData = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${pageNum}`, apiOptions)
      const data = await apiData.json()

      const newMovies = [...movies, ...data.results];
      setMovies(newMovies);

      // Update currentMovies for sorting in Header
      if (!sortState) {
        setCurrentMovies(newMovies);
      }
    } catch (error) {
      console.log("Fetch failed: ", error)
    }
  }

  // Fetch search results
  async function fetchSearchResults(query) {
    if (!query.trim()) {
      setIsSearching(false)
      return
    }

    try {
      console.log("Searching for:", query);
      console.log("API options:", apiOptions);

      const apiData = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
        apiOptions
      );

      const data = await apiData.json();
      if (data.results && Array.isArray(data.results)) {
        setSearchResults(data.results);
        setIsSearching(true);
        setCurrentMovies(data.results);
      } else {
        console.error("Invalid search results format:", data);
        setSearchResults([]);
        setIsSearching(true);
        setCurrentMovies([]);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
      setIsSearching(true);
      setCurrentMovies([]);
    }
  }

  // Load more movies (pagination)
  const loadMore = () => {
    setPage(page + 1)
  }

  // Fetch now playing movies when page changes
  useEffect(() => {
    if (!isClearing){
    fetchNowPlayingMovies(page)}
  }, [page])

  // Fetch search results when search query changes
  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery)
    }
  }, [searchQuery])

  // Update currentMovies when movies change to sort dynamically
  useEffect(() => {
    if (!sortState && currentMovies.length === 0) {
      setCurrentMovies(isSearching ? searchResults : movies);
    }
  }, [isSearching, movies, searchResults, sortState, currentMovies.length, setCurrentMovies]);

  // Determine which movies to display based on activeView
  const getDisplayMovies = () => {
    if (activeView === 'liked') {
      return likedMovies;
    } else if (activeView === 'watched') {
      return watchedMovies;
    } else {

      return sortState ? currentMovies : (isSearching ? searchResults : movies);
    }
  };

  // dynmamic rendering of the movie card elements
  const displayMovies = getDisplayMovies();

  const movieCardElements = displayMovies?.map((movie, index) => {
    return <Moviecard
              key={index}
              movieElement={movie}
              onClick={() => openModal(movie)}
              likedMovies={likedMovies}
              setLikedMovies={setLikedMovies}
              watchedMovies={watchedMovies}
              setWatchedMovies={setWatchedMovies}
              />
  })

  return (
    <main className="hold">
      <div className="cardsList-container">
      {activeView === 'liked' && likedMovies.length === 0 && (
        <div className="empty-state">{<img src="movie.png" />}</div>
      )}

      {activeView === 'watched' && watchedMovies.length === 0 && (
        <div className="empty-state">{<img src="movie.png" />}</div>
      )}

      {movieCardElements}

      {isModalOpen && modalData && (
        <ModalComponent
          title={modalData.title}
          image={`https://image.tmdb.org/t/p/w500${modalData.backdrop_path}`}
          content={modalData.overview}
          rating={modalData.vote_average}
          dateReleased={modalData.release_date}
          closeModal={closeModal}
          movieDetails={movieDetails}
        />
      )}
      </div>
        {activeView === 'home' && !isSearching && page < 15 && (
          <button onClick={loadMore} className="loadMore">Load More</button>
        )}
      <div></div>
    </main>
  )
}
