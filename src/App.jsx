import { useState, useCallback } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import MovieList from './components/MovieList.jsx'
import Footer from './components/Footer.jsx'
import SideBar from './components/SideBar.jsx'

export default function App() {

  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Sorting states
  const [sortState, setSortState] = useState(false)
  const [currentMovies, setCurrentMovies] = useState([])
  const [movies, setMovies] = useState([])
  const [isClearing] = useState(false)

  // Liked and watched movies states
  const [likedMovies, setLikedMovies] = useState([])
  const [watchedMovies, setWatchedMovies] = useState([])
  const [activeView, setActiveView] = useState('home') // for my 'home', 'liked', or 'watched'

  // API options with authorization
  const VITE_READ_TOKEN = import.meta.env.VITE_API_KEY
  const apiOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        `Bearer ${VITE_READ_TOKEN}`
    }
  }
  // Initiating the fetch for now playing movies
  const fetchNowPlayingMovies = async(pageNum = 1)=> {
    try {
      const apiData = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${pageNum}`, apiOptions)
      const data = await apiData.json()

      // If I'm clearing, don't spread the existing movies array
      const newMovies = pageNum === 1 ? [...data.results] : [...movies, ...data.results];
      setMovies(newMovies);

      // Update currentMovies for sorting in Header
      if (!sortState) {
        setCurrentMovies(newMovies);
      }
    } catch (error) {
      console.log("Fetch failed: ", error)
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setIsSearching(false)
    setSortState(false)
    setCurrentMovies([])

    // First set movies to empty array
    setMovies([])

    // Then fetch the first page of now playing movies
    fetchNowPlayingMovies(1)
  }

  // My Sorting functions by different orders
  const byAlphabeticOrder = (a, b) => {
    return a.title.localeCompare(b.title)
  }

  const byNewest = (a, b) => {
    return new Date((b).release_date) - new Date((a).release_date)
  }

  const byVoteRating = (a, b) => {
    return (b.vote_average - a.vote_average)
  }

  const byMostRecent = (a, b) => {
    return (b.popularity - a.popularity)
  }

  // Sorting handler functions
  const displayAlphabetic = useCallback((movies) => {
    const sortedMovies = [...movies]
    sortedMovies.sort(byAlphabeticOrder)
    setSortState(true)
    setCurrentMovies(sortedMovies)
    return sortedMovies
  }, [])

  const displayNewest = useCallback((movies) => {
    const sortedMovies = [...movies]
    sortedMovies.sort(byNewest)
    setSortState(true)
    setCurrentMovies(sortedMovies)
    return sortedMovies
  }, [])

  const displayByRating = useCallback((movies) => {
    const sortedMovies = [...movies]
    sortedMovies.sort(byVoteRating)
    setSortState(true)
    setCurrentMovies(sortedMovies)
    return sortedMovies
  }, [])

  const displayMostRecent = useCallback((movies) => {
    const sortedMovies = [...movies]
    sortedMovies.sort(byMostRecent)
    setSortState(true)
    setCurrentMovies(sortedMovies)
    return sortedMovies
  }, [])

  const sortHandlers = {
    displayAlphabetic,
    displayNewest,
    displayByRating,
    displayMostRecent
  }

  return (
    <>
      <Header
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        clearSearch={clearSearch}
        sortHandlers={sortHandlers}
        setCurrentMovies={setCurrentMovies}
        currentMovies={currentMovies}
        movies={movies}
        setMovies={setMovies}
      />
      <div className='wrapper'>
        <div className='sidebar'>
          <SideBar
            setActiveView={setActiveView}
            activeView={activeView}
          />
        </div>
        <MovieList
          searchQuery={searchQuery}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          sortState={sortState}
          currentMovies={currentMovies}
          setCurrentMovies={setCurrentMovies}
          movies={movies}
          setMovies={setMovies}
          isClearing={isClearing}
          likedMovies={likedMovies}
          setLikedMovies={setLikedMovies}
          watchedMovies={watchedMovies}
          setWatchedMovies={setWatchedMovies}
          activeView={activeView}
          />
      </div>
      <Footer />
    </>
  )
}
