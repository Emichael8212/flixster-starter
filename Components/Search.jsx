import { useState, useEffect } from "react"
import "./Search.css"

export default function Search({ handleSearch, searchQuery, clearSearch }) {
  // Add local state to track input value
  const [inputValue, setInputValue] = useState(searchQuery)

  // Update local state only, don't trigger search
  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  // Only trigger search when form is submitted
  const handleSubmit = (event) => {
    event.preventDefault()
    handleSearch(inputValue)
  }

  // Update local input value when searchQuery changes (for clear button)
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])



  return (
    <form className="search-clear" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Hey Jarvis some movie"
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
      <button type="button" onClick={()=>{ clearSearch()}}>Clear</button>
    </form>
  )
}
