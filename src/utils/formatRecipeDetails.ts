import { RecipeType, FormattedRecipeInProgress } from '../types';

const formatRecipe = (apiResponse: any, type: RecipeType): FormattedRecipeInProgress => {
  const recipes = apiResponse[type];
  const date = new Date();
  const recipe = recipes[0];
  const tags = recipe.strTags === null ? [] : recipe.strTags.split(',');

  const formattedRecipe: FormattedRecipeInProgress = {
    name: recipe[`str${type === 'meals' ? 'Meal' : 'Drink'}`],
    id: recipe[`id${type === 'meals' ? 'Meal' : 'Drink'}`],
    image: recipe.strDrinkThumb || recipe.strMealThumb,
    instructions: recipe.strInstructions,
    category: recipe.strCategory,
    alcoholicOrNot: `${recipe.strAlcoholic ? recipe.strAlcoholic : ''}`,
    ingredients: [],
    measures: [],
    type: `${type === 'meals' ? 'meal' : 'drink'}`,
    tags,
    doneDate: date.toISOString(),
    nationality: `${recipe.strArea ? recipe.strArea : ''}`,
  };

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    // Verifica se ambos o ingrediente e a medida têm valores não nulos ou vazios
    if (ingredient !== null && ingredient !== '' && measure !== null && measure !== '') {
      const ingredientObject = {
        ingredient,
        isChecked: false,
      };

      formattedRecipe.ingredients.push(ingredientObject);
      formattedRecipe.measures.push(measure);
    } else {
      // Se não houver mais ingredientes, o loop para, não deixando que acrescente itens com string vazia
      break;
    }
  }

  return formattedRecipe;
};

export default formatRecipe;
