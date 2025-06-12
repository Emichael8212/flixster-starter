import { useState } from "react";
import "./Moviecard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Moviecard({ movieElement, onClick}) {


    // const [iconClick, setClickIcon] = useState(false)
    // const [iconreaction, setIconReaction] = useState('black')

    // function iconClick(e) {
    //     e.stopPropagation()

    //     setClickIcon(!clickIcon)
    //     setIconReaction(clickIcon ? 'black': 'yellow')
    // }


    return (
        <div className="card-container" onClick={onClick}>
            <div holder="movieImageCard">
                <img className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w500${movieElement.poster_path}`}
                    alt={movieElement.title}
                />
                {/* <span onClick={(e)=>{ iconClick(e)}} className="favorited">{clickon}</span> */}
                <span onClick={(e)=>{ iconClick(e)}} className="watched">{`♾`}</span>
                <p className="movie-title">{movieElement.title}</p>
                <p className="rating">{`Rating: ${movieElement.vote_average}`}</p>
            </div>
        </div>
    )
}



/**
Use npm install @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons.
If you need brand icons, also install @fortawesome/free-brands-svg-icons.
If you plan to use Font Awesome Pro, you'll need to install the appropriate packages for solid, regular, and light styles.
2. Import FontAwesomeIcon and Icons:
In your React component, import FontAwesomeIcon from @fortawesome/react-fontawesome.
Import the specific icons you need from @fortawesome/free-solid-svg-icons, @fortawesome/free-brands-svg-icons, etc.
3. Use the FontAwesomeIcon Component:
Use the <FontAwesomeIcon> component and pass the icon prop, which should be an object representing the imported icon.
Example: <FontAwesomeIcon icon={faCoffee} />
**/
