import React from "react"
import "./Modal.css"


export default function ModalComponent({title, image, content, dateReleased, rating, closeModal}) {
    // Handle clicks on the modal overlay
    const handleOutsideClick = (event) => {
        // Only close if clicking directly on the overlay, not its children
        if (event.target.className === "modal-overlay") {
            closeModal();
        }
    };

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
                        {dateReleased && <p className="date-released"><strong>Release Date: </strong>{dateReleased}</p>}
                        {rating && <p className="rating"><strong>Rating: </strong>{rating}/10</p>}
                        <p className="trailer">{content}</p>
                        <button className="close-modal" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </article>
        </div>
    )
}
