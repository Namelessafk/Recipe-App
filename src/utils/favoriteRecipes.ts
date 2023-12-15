import { FormattedRecipeInProgress } from '../types';

const handleFavoriteRecipe = (newRecipe: FormattedRecipeInProgress, isDelete = false) => {
  const {
    name,
    image,
    // doneDate,
    nationality,
    category,
    // tags,
    alcoholicOrNot,
    type,
    id } = newRecipe;

  const formatedRecipe = {
    name,
    image,
    // doneDate,
    nationality,
    category,
    // tags,
    alcoholicOrNot,
    type,
    id,
  };
  const previousFavoriteRecipes = JSON
    .parse(localStorage
      .getItem('favoriteRecipes') as string) as FormattedRecipeInProgress[] || [];

  let updatedfavoriteRecipes:any = [];

  if (isDelete === true) {
    updatedfavoriteRecipes = previousFavoriteRecipes
      .filter((recipe) => recipe.id !== id);
  }
  if (isDelete === false) {
    updatedfavoriteRecipes = [...previousFavoriteRecipes, formatedRecipe];
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(updatedfavoriteRecipes));
};

export default handleFavoriteRecipe;
