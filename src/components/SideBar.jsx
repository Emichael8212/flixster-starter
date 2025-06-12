import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SideBar() {
    return (
        <nav className='nav-bar'>
            {/* <div className='nav-buttons'> */}
            <button className='nav-bar-btn'>
                    Favorited
            </button>
            <button>
                    Watched Movies
            </button>
            {/* </div> */}
        </nav>
    )
}
