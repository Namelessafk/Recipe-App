import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchRecipes } from '../services/api';
import './SearchBar.css';

const INITIAL_STATE = {
  searchInput: '',
  filter: '',
};

function SearchBar() {
  const [search, setSearch] = useState(INITIAL_STATE);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { filter, searchInput } = search;
  const currentRoute = pathname.substring(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ((searchInput.length > 1 || searchInput === ' ') && filter === 'firstLetter') {
      alert('Your search must have only 1 (one) character');
      setSearch(INITIAL_STATE);
      return;
    }

    const data = await fetchRecipes(searchInput, currentRoute, filter);

    const { meals, drinks } = data;
    if ((!meals && currentRoute === 'meals') || (!drinks && currentRoute === 'drinks')) {
      alert("Sorry, we haven't found any recipes for these filters");

      setSearch(INITIAL_STATE);
      return;
    }

    if (currentRoute === 'meals') {
      if (meals.length === 1) navigate(`/${currentRoute}/${meals[0].idMeal}`);
      setSearch(INITIAL_STATE);
      // return meals; // usa o retorno
    }
    if (currentRoute === 'drinks') {
      if (drinks.length === 1) navigate(`/${currentRoute}/${drinks[0].idDrink}`);
      setSearch(INITIAL_STATE);
      // return drinks; // usa o retorno
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search"
          name="searchInput"
          value={ searchInput }
          onChange={ handleChange }
        />
        <div className="options-container">
          <label htmlFor="ingredient-radio">
            <input
              type="radio"
              value="ingredient"
              name="filter"
              id="ingredient-radio"
              checked={ filter === 'ingredient' }
              onChange={ handleChange }
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>
          <label htmlFor="name-radio">
            <input
              type="radio"
              value="name"
              name="filter"
              id="name-radio"
              checked={ filter === 'name' }
              onChange={ handleChange }
              data-testid="name-search-radio"
            />
            Name
          </label>
          <label htmlFor="first-letter-radio">
            <input
              type="radio"
              value="firstLetter"
              name="filter"
              id="first-letter-radio"
              checked={ filter === 'firstLetter' }
              onChange={ handleChange }
              data-testid="first-letter-search-radio"
            />
            First Letter
          </label>
        </div>
        <button
          type="submit"
          data-testid="exec-search-btn"
          disabled={ filter === '' || searchInput === '' }
        >
          Search

        </button>
      </form>

    </div>
  );
}

export default SearchBar;
