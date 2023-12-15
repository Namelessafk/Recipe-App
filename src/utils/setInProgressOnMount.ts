import { FormattedRecipeInProgress } from '../types';

const setInProgressOnMount = (id: string, recipeType: 'meals'
| 'drinks', recipeDetails: FormattedRecipeInProgress) => {
  const previousProgressLocalStorage = JSON.parse(localStorage
    .getItem('inProgressRecipes') || '{"meals": {}, "drinks": {}}');

  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...previousProgressLocalStorage,
    [recipeType]: {
      ...previousProgressLocalStorage[recipeType],
      [id]: recipeDetails.ingredients,
    },
  }));
};

export default setInProgressOnMount;
