const findInLocalStorage = (id: string, recipeType: 'meals' | 'drinks') => {
  const previousProgressLocalStorage = JSON.parse(localStorage
    .getItem('inProgressRecipes') || '{"meals": {}, "drinks": {}}')[recipeType];

  const inProgressKeys = Object.keys(previousProgressLocalStorage);

  const foundRecipe = inProgressKeys.find((recipe) => recipe === id);

  return previousProgressLocalStorage[`${foundRecipe}`];
};

export default findInLocalStorage;
