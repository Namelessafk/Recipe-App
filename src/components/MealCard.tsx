import { Link } from 'react-router-dom';
import { FoodType } from '../types';
import './FoodCards.css';

type MealCardProps = {
  meal: FoodType;
  index: number;
};

function MealCard({ meal, index }: MealCardProps) {
  const { idMeal, strMeal, strMealThumb, strTags } = meal;
  const tag = strTags ? strTags.split(',') : strTags;

  return (
    <Link
      className="recipe-card"
      to={ `/meals/${idMeal}` }
      data-testid={ `${index}-recipe-card` }
    >
      <div className="card-name">
        <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
        {(tag && tag.length) === 1 && (
          <h3>{tag}</h3>
        )}
        {(tag && tag.length > 1) && (
          <h3>{`${tag[0]}/${tag[1]}`}</h3>
        )}
      </div>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid={ `${index}-card-img` }
      />
    </Link>
  );
}

export default MealCard;
