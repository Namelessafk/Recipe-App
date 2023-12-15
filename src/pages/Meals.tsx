import { useContext, useEffect, useState } from 'react';
import MealCard from '../components/MealCard';
import Recipes from './Recipes/Recipes';
import RootContext from '../context/main';
import { fetchRecipes } from '../services/api';
import { removeEmptyOrNullKeys } from '../utils/RemoveEmptyOrNullKey';
import { FoodType } from '../types';
import { mockCategoryMeal } from '../mocks/mockMealsCards';

function Meals() {
  const { mealsRecipe,
    changeMealsRecipe } = useContext(RootContext);
  // const [pageNum, setPageNum] = useState(1);
  const [filteredMeals, setFilteredMeals] = useState<FoodType[]>([]);
  const [check, setCheck] = useState('All');

  // as funções e estatos relacionados a lógica de paginação estão comentados para facilitar a lógica do projeto, após ser concluido quero implementar a lógica como um todo

  useEffect(() => {
    const getMeals = async () => {
      const dataMeals = await fetchRecipes('', 'meals');
      const filterMeals = removeEmptyOrNullKeys(dataMeals.meals);
      changeMealsRecipe(filterMeals);
      // const categoryMeal = await fecthCategories('meals') as FoodType[];
      // changeCategoriesMeals(categoryMeal);
    };
    getMeals();
  }, []);

  // função responsavel por ajustar a paginação dos meals sempre de 12 em 12 itens

  const sliceCategory = mockCategoryMeal;

  // handleChange é responsavel por filtrar os meals por categoria e garantir a renderização deles

  const handleChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const search = target.value;
    const filterMealsByCategory = await fetchRecipes(search, 'meals', 'category');
    const removeUnusualKeys = removeEmptyOrNullKeys(
      filterMealsByCategory.meals,
    ) as FoodType[];
    setFilteredMeals(removeUnusualKeys);
    setCheck(search);
  };

  const handleClick = () => {
    setCheck('All');
    setFilteredMeals(mealsRecipe);
  };

  const apiSliced = mealsRecipe.slice(0, 12);

  const filterMealsSliced = filteredMeals.slice(0, 12);
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
                // key={ index }
              data-testid={ `${category}-category-filter` }
              value={ category }
              placeholder={ category }
              checked={ check === category }
              onClick={ () => { if (check === category) handleClick(); } }
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
        {filteredMeals.length > 0 ? filterMealsSliced.map((recipe, index) => (
          <MealCard
            key={ recipe.idMeal }
            meal={ recipe }
            index={ index }
          />
        ))
          : apiSliced.map((recipe, index) => (
            <MealCard
              key={ recipe.idMeal }
              meal={ recipe }
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
    </>
  );
}

export default Meals;
