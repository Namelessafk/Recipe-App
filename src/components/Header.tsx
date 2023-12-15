import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';
import SearchBar from './SearchBar';

export default function Header() {
  function formatRouteName(route: string): string {
    return route
      .split(/[-\s]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  const location = useLocation();
  const currentRoute = location.pathname.substring(1);
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  return (
    <header className="header-container">
      <div className="header-main-bar">
        <h1 data-testid="page-title">{formatRouteName(currentRoute)}</h1>
        <button
          onClick={ () => navigate('/profile') }
          className="profile-btn"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-icon"
          />
        </button>
      </div>
      {(currentRoute === 'drinks' || currentRoute === 'meals') && (
        <button
          className="search-btn"
          onClick={ () => setShowInput(!showInput) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search-icon"
          />
        </button>
      )}
      {showInput && (
        <SearchBar />
      )}
    </header>
  );
}
