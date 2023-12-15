import { useContext, useEffect, useState } from 'react';
import Recipes from './Recipes/Recipes';
import RootContext from '../context/main';
import DrinksCard from '../components/DrinksCard';
import { fetchRecipes } from '../services/api';
import { removeEmptyOrNullKeys } from '../utils/RemoveEmptyOrNullKey';
import { FoodType } from '../types';
import { mockCategoryDrinks } from '../mocks/mockDrinksCards';
import '../components/FoodCards.css';

export default function Meals() {
  const { drinksRecipe,
    changeDrinksRecipe } = useContext(RootContext);
  // const [pageNum, setPageNum] = useState(1);
  const [filteredDrinks, setFilteredDrinks] = useState<FoodType[]>([]);
  const [check, setCheck] = useState('All');

  useEffect(() => {
    const getDrinks = async () => {
      const dataDrinks = await fetchRecipes('', 'drinks');

      const filterDrinks = removeEmptyOrNullKeys(dataDrinks.drinks);
      // const categoryDrink = await fecthCategories('drinks') as FoodType[];
      changeDrinksRecipe(filterDrinks);
      // changeCategoriesDrinks(categoryDrink);
    };
    getDrinks();
  }, []);

  // const sliceDrinks = () => {
  //   switch (pageNum) {
  //     case 1:
  //       return drinksRecipe.slice(0, 12);
  //     case 2:
  //       return drinksRecipe.slice(12, 24);
  //     default:
  //       return drinksRecipe;
  //   }
  // };

  // const sliceCategory = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown', 'Cocoa'];
  const sliceCategory = mockCategoryDrinks;

  // const drinksRecipeSliced = sliceDrinks();

  const handleChange = async (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const search = target.value;
    const filterDrinksByCategory = await fetchRecipes(search, 'drinks', 'category');
    const removeUnusualKeys = removeEmptyOrNullKeys(
      filterDrinksByCategory.drinks,
    ) as FoodType[];
    setFilteredDrinks(removeUnusualKeys);
    setCheck(search);
  };

  const handleClick = () => {
    setCheck('All');
    setFilteredDrinks(drinksRecipe);
  };

  const apiSliced = drinksRecipe.slice(0, 12);
  const filterDrinksSliced = filteredDrinks.slice(0, 12);

  return (
    <>
      <h2 className="categories-title">Categories</h2>
      <div className="categories-container">
        {sliceCategory.map((category, index) => (
          <label key={ index }>
            {category}
            <input
              type="radio"
              id={ category }
              name="category"
              data-testid={ `${category}-category-filter` }
              value={ category }
              placeholder={ category }
              onClick={ () => { if (check === category) handleClick(); } }
              checked={ check === category }
              onChange={ (event) => handleChange(event) }
            />
          </label>
        ))}
        <label>
          All
          <input
            type="radio"
            id="All"
            data-testid="All-category-filter"
            onClick={ () => handleClick() }
            checked={ check === 'All' }
          />
        </label>
      </div>
      <Recipes>
        {filteredDrinks.length > 0 ? filterDrinksSliced.map((recipe, index) => (
          <DrinksCard
            key={ recipe.idDrink }
            drink={ recipe }
            index={ index }
          />
        ))
          : apiSliced.map((recipe, index) => (
            <DrinksCard
              key={ recipe.idDrink }
              drink={ recipe }
              index={ index }
            />
          ))}
        {/* {pageNum > 1 && (
          <button
            onClick={ () => setPageNum((prevPageNum) => prevPageNum - 1) }
          >
            Página anterior
          </button>)}
        {pageNum < 2 && (
          <button
            onClick={ () => setPageNum((prevPageNum) => prevPageNum + 1) }
          >
            Próxima página
          </button>)} */}
      </Recipes>
      {/* <Footer /> */}
    </>
  );
}
