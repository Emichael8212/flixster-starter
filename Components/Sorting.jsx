import { useState } from "react"

export default function SortComponent({moviesToSort, onSortSelectChange}) {

    const [applySort, setApplySort] = useState('')

    const handleChange = (event) => {
        const sortType = event.target.value
        setApplySort(sortType)

        if (sortType === 'alphabetic, A-Z') {
            onSortSelectChange.displayAlphabetic(moviesToSort)
        }   else if (sortType === 'release date') {
            onSortSelectChange.displayNewest(moviesToSort)
        }   else if (sortType === 'popularity') {
            onSortSelectChange.displayMostRecent(moviesToSort)
        }   else if (sortType === 'vote average') {
            onSortSelectChange.displayByRating(moviesToSort)
        }
    }

    return (
        <select name="sortFeature" id="sortComponent" value={applySort} onChange={handleChange}>
            <option value="alphabetic, A-Z">alphabetic, A-Z</option>
            <option value="release date">release date</option>
            <option value="vote average">vote average</option>
            <option value="popularity">popularity</option>
        </select>
    )
}
