import { FormattedRecipeInProgress } from '../types';

const upDateInProgress = (recipe: FormattedRecipeInProgress) => {
  const previousProgressLocalStorage = JSON.parse(localStorage
    .getItem('inProgressRecipes') || '{"meals": {}, "drinks": {}}');

  localStorage.setItem('inProgressRecipes', JSON.stringify({

    ...previousProgressLocalStorage,
    [`${recipe.type}s`]: {
      ...previousProgressLocalStorage[`${recipe.type}s`],
      [recipe.id]: {
        ...previousProgressLocalStorage[`${recipe.type}s`][recipe.id],

      },
    },

  }));
};

export default upDateInProgress;
