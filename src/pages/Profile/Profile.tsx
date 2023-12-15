import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getEmail = localStorage.getItem('user');
    if (getEmail) {
      const { email } = JSON.parse(getEmail);
      setUserEmail(email);
    }
  }, []);

  const navigateDoneRecipes = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/done-recipes');
  };

  const navigateFavoriteRecipes = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/favorite-recipes');
  };

  const navigateLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <h3
        data-testid="profile-email"
        className="profile-email"
      >
        {`Email: ${userEmail}`}
      </h3>
      <div className="profile-container">

        <button
          data-testid="profile-done-btn"
          onClick={ navigateDoneRecipes }
          className="to-done-btn"
        >
          Done Recipes
        </button>

        <button
          data-testid="profile-favorite-btn"
          onClick={ navigateFavoriteRecipes }
          className="to-favorites-btn"
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          onClick={ navigateLogout }
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Profile;
