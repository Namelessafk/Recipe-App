import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareicon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import chef from '../../images/chef-hat-svgrepo-com.svg';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import { FavoriteRecipeType } from '../../types';
import './FavoriteRecipe.css';

export default function FavoriteRecipes() {
  const [listFavorites, setListFavorites] = useState<FavoriteRecipeType[]>([]);
  const [favorites, setFavorites] = useState<FavoriteRecipeType[]>([]);
  const [copyIndex, setCopyIndex] = useState<number | null>(null);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavorites(storage);
    setListFavorites(storage);
  }, []);

  const handleFavorite = (id: string) => {
    setListFavorites(listFavorites.filter((list) => list.id !== id)); //
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      listFavorites.filter((list) => list.id !== id),
    ));
  };

  const handleClick = (
    id: string,
    type: string,
    index: number,
  ) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`)
      .then(() => {
        setCopyIndex(index);
        setTimeout(() => {
          setCopyIndex(null);
        }, 3000);
      });
  };

  return (
    <>
      <section className="buttons-container">

        <div>
          <h4>Meals</h4>
          <button
            data-testid="filter-by-meal-btn"
            className="btnMeal"
            onClick={ () => setListFavorites(
              favorites.filter((list) => list.type === 'meal'),
            ) }
          >
            <img src={ mealIcon } alt="Drink" />
          </button>

        </div>

        <div>
          <h4>Drinks</h4>
          <button
            data-testid="filter-by-drink-btn"
            className="btnDrink"
            onClick={ () => setListFavorites(
              favorites.filter((list) => list.type !== 'meal'),
            ) }
          >
            <img src={ drinkIcon } alt="Drink" />
          </button>
        </div>

        <div>
          <h4>All</h4>
          <button
            data-testid="filter-by-all-btn"
            className="btnAll"
            onClick={ () => setListFavorites(favorites) }
          >
            <img
              src={ chef }
              alt="All Recipes"
              style={ { width: '40px', height: '40px' } }
            />
          </button>

        </div>

      </section>
      <div>
        { listFavorites.length > 0 ? (
          <>
            { listFavorites.map((list, index) => (
              <div className="favorite-container favorite-card" key={ list.id }>
                <Link
                  to={ list.type === 'meal' ? `http://localhost:3000/meals/${list.id}`
                    : `http://localhost:3000/drinks/${list.id}` }
                >
                  <div>
                    <h4
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {list.name}
                    </h4>

                    <h5
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { list.type === 'meal' ? `${list.nationality} - ${list.category} `
                        : `${list.alcoholicOrNot}`}
                    </h5>
                  </div>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    className="favorite-img"
                    src={ list.image }
                    alt={ list.name }
                  />
                </Link>
                <div className="fav-btn-container">
                  <button
                    data-testid={ `btn-Copy${index}` }
                    onClick={ () => handleClick(list.id, list.type, index) }
                    className="fav-share-btn"
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ shareicon }
                      alt="copiar"
                    />
                  </button>
                  <button
                    data-testid={ `btn-favorite${index}` }
                    onClick={ () => handleFavorite(list.id) }
                    className="fav-btn"
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ blackHeartIcon }
                      alt="heart-black"
                    />
                  </button>

                </div>
                { copyIndex === index && <h5>Link copied!</h5>}
              </div>
            ))}
          </>) : <p className="not-found">Nenhuma receita favorita.</p> }
      </div>
    </>
  );
}
