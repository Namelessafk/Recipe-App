import { DoneRecipeType, FormattedRecipeInProgress } from '../types';

const handleDoneRecipe = (newRecipe: FormattedRecipeInProgress) => {
  const {
    name,
    image,
    doneDate,
    nationality,
    category,
    tags,
    alcoholicOrNot,
    type,
    id } = newRecipe;

  const formatedRecipe: DoneRecipeType = {
    name,
    image,
    doneDate,
    nationality,
    category,
    tags,
    alcoholicOrNot,
    type,
    id,
  };
  const previousDoneRecipes: DoneRecipeType[] = JSON
    .parse(localStorage.getItem('doneRecipes') as string) || [];
  const updatedDoneRecipes = [...previousDoneRecipes, formatedRecipe];
  localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));
};

export default handleDoneRecipe;
