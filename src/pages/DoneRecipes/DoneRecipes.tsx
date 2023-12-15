import { useEffect, useState } from 'react';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import chef from '../../images/chef-hat-svgrepo-com.svg';
import { DoneRecipeType } from '../../types';
import DoneRecipeCard from '../../components/DoneRecipeCard/DoneRecipeCard';
import './DoneRecipes.css';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>([]);
  const [showDoneRecipes, setShowDoneRecipes] = useState<DoneRecipeType[]>([]);

  useEffect(() => {
    const recipes: DoneRecipeType[] = JSON
      .parse(localStorage.getItem('doneRecipes') as string) || [];

    setDoneRecipes(recipes);
    setShowDoneRecipes(recipes);
  }, []);

  return (
    <>
      <section className="buttons-container">

        <div>
          <h4>Meals</h4>
          <button
            className="btnMeal"
            data-testid="filter-by-meal-btn"
            onClick={ () => setShowDoneRecipes(doneRecipes
              .filter((recipe) => recipe.type === 'meal')) }
          >
            <img src={ mealIcon } alt="Meal" />
          </button>
        </div>

        <div>
          <h4>Drinks</h4>
          <button
            className="btnDrink"
            data-testid="filter-by-drink-btn"
            onClick={ () => setShowDoneRecipes(doneRecipes
              .filter((recipe) => recipe.type === 'drink')) }
          >
            <img src={ drinkIcon } alt="Drink" />
          </button>
        </div>

        <div>
          <h4>All</h4>
          <button
            className="btnAll"
            data-testid="filter-by-all-btn"
            onClick={ () => setShowDoneRecipes(doneRecipes) }
          >
            <img
              src={ chef }
              alt="All Recipes"
              style={ { width: '40px', height: '40px' } }
            />
          </button>
        </div>

      </section>
      <section className="done-container">
        {
          showDoneRecipes.map((recipe, index) => (
            <DoneRecipeCard
              key={ index }
              recipe={ recipe }
              index={ index }
            />
          ))
        }
      </section>
    </>
  );
}

export default DoneRecipes;
