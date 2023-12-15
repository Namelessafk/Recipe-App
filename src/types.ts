export type FoodType = { [x:string]: string };

export type ApiFoodType = { [x:string]: string };

export type ApiReturnType = { [y:string]: ApiFoodType[] };

export type CategoryInputType = { category: string };

export type RecipeType = 'meals' | 'drinks';

export type FormattedRecipeInProgress = {
  name: string;
  image: string;
  id: string;
  instructions: string;
  category: string
  alcoholicOrNot: string
  ingredients: {
    ingredient: string
    isChecked: boolean
  }[];
  measures: string[];
  // poderia usar RecipeType se ele fosse no singular mas teria que mudar a lógica em RecipeDetails para funcionar.
  type: 'meal' | 'drink';
  tags:[]
  nationality: string
  doneDate: any;
};

export type FormattedRecipeFavorite = {
  name: string;
  image: string;
  id: string;
  instructions: string;
  category?: string
  alcoholicOrNot: string
  ingredients: {
    ingredient: string
    isChecked: boolean
  }[];
  measures: string[];
  type: 'meal' | 'drink' // mesma coisa aqui
  tags?:[]
  nationality: string
  doneDate: any;
  youtube:string
};

export type MealInProgress = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strInstructions: string;
  ingredients: string[];
  measures: string[]
};

export type DrinkInProgress = {
  idDrink: string;
  strDrink: string
  strCategory: string;
  strAlcoholic: string;
  strDrinkThumb: string
  strInstructions: string;
  ingredients: string[];
  measures: string[]
};

export type FavoriteRecipeType = {
  id: string
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string
};

export type InProgressType = {
  ingredient: string;
  isChecked: boolean
}[];

export type DoneRecipeType = {
  id: string;
  type: 'meal' | 'drink'; // mesma coisa aqui
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
};
