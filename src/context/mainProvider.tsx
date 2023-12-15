import { useState } from 'react';
import RootContext from './main';
import { FoodType } from '../types';

export function MainProvider({ children }: { children: React.ReactNode }) {
  // const [filterMealsApi, setFilterMealsApi] = useState<FoodType[]>([{}]);
  // const [filterDrinksApi, setFilterDrinksApi] = useState<FoodType[]>([{}]);
  const [mealsRecipe, setMealsRecipe] = useState<FoodType[]>([]);
  const [drinksRecipe, setDrinksRecipe] = useState<FoodType[]>([]);
  // const [categoriesMeals, setCategoriesMeal] = useState<FoodType[]>([{}]);
  // const [categoriesDrinks, setCategoriesDrink] = useState<FoodType[]>([{}]);
  // const [toogleStatus, setToogleStatus] = useState(false);
  // const [filterCategory, setFilterCategory] = useState<CategoryInputType>(
  // { category: '' },
  // );

  // const changeFilterMealsApi = (recipe: FoodType) => {
  //   if (recipe) setFilterMealsApi((prevState) => [...prevState, recipe]);
  // };

  // const changeFilterDrinksApi = (recipe: FoodType) => {
  //   if (recipe) setFilterDrinksApi((prevState) => [...prevState, recipe]);
  // };

  const changeMealsRecipe = (recipe: FoodType[] | undefined) => {
    // if (Array.isArray(recipe)) setMealsRecipe(recipe);
    if (recipe) setMealsRecipe(recipe);
  };

  const changeDrinksRecipe = (recipe: FoodType[] | undefined) => {
    if (recipe) setDrinksRecipe(recipe);
  };

  // const changeCategoriesMeals = (recipe: FoodType[]) => {
  //   setCategoriesMeal(recipe);
  // };

  // const changeCategoriesDrinks = (recipe: FoodType[]) => {
  //   setCategoriesDrink(recipe);
  // };

  // const changeToogleStatus = (status:boolean) => {
  //   setToogleStatus(status);
  // };

  return (
    <RootContext.Provider
      value={ {
        // filterMealsApi,
        // changeFilterMealsApi,
        // filterDrinksApi,
        // changeFilterDrinksApi,
        mealsRecipe,
        changeMealsRecipe,
        drinksRecipe,
        changeDrinksRecipe,
        // categoriesMeals,
        // changeCategoriesMeals,
        // categoriesDrinks,
        // changeCategoriesDrinks,
        // toogleStatus,
        // changeToogleStatus,
      } }
    >
      {children}
    </RootContext.Provider>
  );
}
