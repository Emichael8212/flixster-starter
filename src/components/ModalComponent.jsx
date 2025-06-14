import React from "react";
import "./Modal.css";

export default function ModalComponent({ title, image, content, dateReleased,
  rating, closeModal, movieDetails }) {

  // Handle clicks function for the modal overlay
  const handleOutsideClick = (event) => {
    if (event.target.className === "modal-overlay") {
      closeModal();
    }
  };

  // I initatied this function to format the runtime to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Get trailer from videos if available
  const getTrailer = () => {
    if (!movieDetails || !movieDetails.videos || !movieDetails.videos.results) {
      return null;
    }

    // return the first trailer seen
    const trailer = movieDetails.videos.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    ) || movieDetails.videos.results[0];
    return trailer;
  };

  const trailer = getTrailer();
  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <article className="modal-card">
        <div className="modal-title">
          <h1>{title}</h1>
        </div>
        <div className="modal-content">
          <div className="modal-image">
            <img src={image} alt={title} />
          </div>
          <div className="modal-info">
            {dateReleased && (
              <p className="date-released">
                <strong>Release Date: </strong>
                {dateReleased}
              </p>
            )}
            {rating && (
              <p className="rating">
                <strong>Rating: </strong>
                {rating}/10
              </p>
            )}

            {movieDetails && movieDetails.runtime && (
              <p className="runtime">
                <strong>Runtime: </strong>
                {formatRuntime(movieDetails.runtime)}
              </p>
            )}

            {movieDetails && movieDetails.genres && (
              <p className="genres">
                <strong>Genres: </strong>
                {movieDetails.genres.map(genre => genre.name).join(", ")}
              </p>
            )}
            <p className="overview">{content}</p>
            {trailer && (
              <div className="trailer-container">
                <h3>Trailer</h3>
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`${title} Trailer`}
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            <button className="close-modal" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
