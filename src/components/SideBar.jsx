import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';

export default function SideBar({ setActiveView, activeView }) {
    return (
        <nav className='nav-bar'>
            <button
                className={`nav-bar-btn ${activeView === 'home' ? 'active' : ''}`}
                onClick={() => setActiveView('home')}
            >
                <FontAwesomeIcon icon={faHome} /> Home
            </button>
            <button
                className={`nav-bar-btn ${activeView === 'liked' ? 'active' : ''}`}
                onClick={() => setActiveView('liked')}
            >
                <FontAwesomeIcon icon={faHeart} /> Favorited
            </button>
            <button
                className={`nav-bar-btn ${activeView === 'watched' ? 'active' : ''}`}
                onClick={() => setActiveView('watched')}
            >
                <FontAwesomeIcon icon={faEye} /> Watched Movies
            </button>
        </nav>
    )
}
