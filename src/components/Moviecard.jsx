import { useState, useEffect } from "react";
import "./Moviecard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons';

export default function Moviecard({
    movieElement,
    onClick,
    likedMovies,
    setLikedMovies,
    watchedMovies,
    setWatchedMovies
}) {
    const [isLiked, setIsLiked] = useState(false);
    const [isWatched, setIsWatched] = useState(false);

    // Check if movie is in liked or watched arrays on component mount
    useEffect(() => {
        if (likedMovies) {
            const movieIsLiked = likedMovies.some(movie => movie.id === movieElement.id);
            setIsLiked(movieIsLiked);
        }

        if (watchedMovies) {
            const movieIsWatched = watchedMovies.some(movie => movie.id === movieElement.id);
            setIsWatched(movieIsWatched);
        }
    }, [likedMovies, watchedMovies, movieElement.id]);

    // Toggle like status
    function toggleLike(e) {
        e.stopPropagation();

        if (isLiked) {
            // Remove from liked movies
            setLikedMovies(prev => prev.filter(movie => movie.id !== movieElement.id));
        } else {
            // Add to liked movies
            setLikedMovies(prev => [...prev, movieElement]);
        }

        setIsLiked(!isLiked); }


    // Toggle watched status
    function toggleWatched(e) {
        e.stopPropagation();

        if (isWatched) {
            // Remove from watched movies
            setWatchedMovies(prev => prev.filter(movie => movie.id !== movieElement.id));
        } else {
            // Add to watched movies
            setWatchedMovies(prev => [...prev, movieElement]);
        }

        setIsWatched(!isWatched);
    }

    return (
        <div className="card-container" onClick={onClick}>
            <div className="movieImageCard">
                <img className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w500${movieElement.poster_path}`}
                    alt={movieElement.title}
                />
                <span
                    onClick={toggleLike}
                    className={`favorited ${isLiked ? 'active' : ''}`}
                >
                    <FontAwesomeIcon icon={faHeart} />
                </span>
                <span
                    onClick={toggleWatched}
                    className={`watched ${isWatched ? 'active' : ''}`}
                >
                    <FontAwesomeIcon icon={faEye} />
                </span>
                <p className="movie-title">{movieElement.title}</p>
                <p className="rating">{`Rating: ${movieElement.vote_average}`}</p>
            </div>
        </div>
    )
}
