import React from 'react';
import { Link } from 'react-router-dom';
import { FoodType } from '../types';
import './FoodCards.css';

type DrinksCardProps = {
  drink: FoodType;
  index: number;
};

function DrinksCard({ drink, index }: DrinksCardProps) {
  const { strDrink, strCategory, strAlcoholic, strDrinkThumb, idDrink } = drink;

  return (
    <Link
      className="recipe-card"
      to={ `/drinks/${idDrink}` }
      data-testid={ `${index}-recipe-card` }
    >
      <div className="card-name">
        <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
        <h3>{`${strCategory}`}</h3>
        <h3>{`( ${strAlcoholic} )`}</h3>
      </div>
      <img
        src={ strDrinkThumb }
        alt={ strDrink }
        data-testid={ `${index}-card-img` }
      />
    </Link>
  );
}

export default DrinksCard;
