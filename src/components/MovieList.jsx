import { useState, useEffect } from "react"
import "./MovieList.css"
import Moviecard from "./Moviecard"
import ModalComponent from "./ModalComponent"

function MovieList(
  { searchQuery, isSearching, setIsSearching, sortState, currentMovies, setCurrentMovies, movies, setMovies, isClearing }) {
  // const [movies, setMovies] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [page, setPage] = useState(1)



  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)


  // API options with authorization
  const VITE_API_READ_ACCESS_TOKEN = import.meta.env.VITE_API_READ_ACCESS_TOKEN
  const apiOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${VITE_API_READ_ACCESS_TOKEN}`
    }
  }


  // Modal functions
  function openModal(movie) {
    setModalData(movie)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }


  console.log('movies from movielist', movies)
  // Fetch now playing movies
  async function fetchNowPlayingMovies(pageNum) {
    try {
      const apiData = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${pageNum}`, apiOptions)
      const data = await apiData.json()
      console.log('data from movielist', data)

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
console.log(movies)
    try {
      const apiData = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, apiOptions)
      const data = await apiData.json()
      const results = data.results;
      setSearchResults(results);
      setIsSearching(true);

      // Always update currentMovies with search results
      setCurrentMovies(results);
    } catch (error) {
      console.log("Search failed: ", error)
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

  // Determine which movies to display
  const displayedMovies = sortState
    ? currentMovies
    : (isSearching ? searchResults : movies)

  // Update currentMovies when displayed movies change
  // This ensures sorting always applies to the currently displayed movies
  useEffect(() => {
    if (!sortState && currentMovies.length === 0) {
      setCurrentMovies(isSearching ? searchResults : movies);
    }
  }, [isSearching, movies, searchResults, sortState, currentMovies.length, setCurrentMovies]);

  // Create movie card elements

  const movieCardElements = movies &&  displayedMovies?.map((movie, index) => {
    return <Moviecard
              key={index}
              movieElement={movie}
              onClick={() => openModal(movie)}
              />
  })

  return (
    <main className="cardsList-container">
      {movieCardElements}


      {isModalOpen && modalData && (
        <ModalComponent
          title={modalData.title}
          image={`https://image.tmdb.org/t/p/w500${modalData.backdrop_path}`}
          content={modalData.overview}
          rating={modalData.vote_average}
          dateReleased={modalData.release_date}
          closeModal={closeModal}
        />
      )}
      {!isSearching && page < 15 && (
        <button onClick={loadMore} className="loadMore">Load More</button>
      )}
    </main>
  )
}
// export the Movielist so I can use it on another component
export default MovieList


// to import the movie trailers hook the movie youtube id and calll to the nextor
