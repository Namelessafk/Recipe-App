import { createContext } from 'react';
import { FoodType } from '../types';

type RootContextType = {
  // filterMealsApi: FoodType[];
  // changeFilterMealsApi: (recipe: FoodType) => void;
  // filterDrinksApi: FoodType[];
  // changeFilterDrinksApi: (recipe:FoodType) => void;
  mealsRecipe: FoodType[];
  changeMealsRecipe: (recipe: FoodType[] | undefined) => void;
  drinksRecipe: FoodType[];
  changeDrinksRecipe: (recipe: FoodType[] | undefined) => void;
  // categoriesMeals: FoodType[];
  // changeCategoriesMeals: (categories: FoodType[]) => void;
  // categoriesDrinks: FoodType[];
  // changeCategoriesDrinks: (categories: FoodType[]) => void;
  // toogleStatus: boolean;
  // changeToogleStatus: (status: boolean) => void;
  // filterCategory: CategoryInputType;
  // changeFilterCategory: (category: CategoryInputType) => void;
};

const RootContext = createContext<RootContextType>({} as RootContextType);

export default RootContext;
