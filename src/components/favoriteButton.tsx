import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import emptyHeart from '../images/whiteHeartIcon.svg';
import handleFavoriteRecipe from '../utils/favoriteRecipes';
import { FormattedRecipeFavorite } from '../types';
import fullHeart from '../images/blackHeartIcon.svg';

type ButtonProps = {
  recipe: FormattedRecipeFavorite
};

function FavoriteButton({ recipe }: ButtonProps) {
  const { id } = useParams();
  const favoriteLocal:FormattedRecipeFavorite[] = (JSON
    .parse(localStorage
      .getItem('favoriteRecipes') || '[]'));

  const isFavorite = favoriteLocal.some((recipeFood) => recipeFood.id === id);
  const [btnFavorite, setBtnFavorite] = useState(isFavorite);

  const handleFavorite = () => {
    setBtnFavorite(!btnFavorite);
    handleFavoriteRecipe(recipe, btnFavorite);
  };

  return (
    <button
      onClick={ handleFavorite }
      className="favorite-btn"
    >
      <img
        src={ isFavorite ? fullHeart : emptyHeart }
        data-testid="favorite-btn"
        alt=""
      />
    </button>
  );
}

export default FavoriteButton;
