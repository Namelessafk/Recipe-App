import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getRecipesById, fetchRecomendation } from '../../services/api';
import { FormattedRecipeFavorite } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import formatRecipe from '../../utils/formatRecipeDetails';
import FavoriteButton from '../../components/favoriteButton';
import './RecipeDetails.css';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState<
  FormattedRecipeFavorite>({} as FormattedRecipeFavorite);
  const [recommendation, setRecommendation] = useState([]);
  const [clip, setClip] = useState(false);
  const typeFood = window.location.pathname.includes('/meals') ? 'meals' : 'drinks';

  const navigate = useNavigate();

  const fetchRecommendation = async () => {
    try {
      const type = location.pathname === `/meals/${id}`
        ? '/drinks' : '/meals';
      const newRecommendation = await fetchRecomendation(type);
      setRecommendation(newRecommendation);
    } catch (error) {
      console.log('API endpoint not found');
    }
  };

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipeById = await getRecipesById(location.pathname, id as string);
        // função para formatar dinamicamente a url vinda do youtubil
        const formattedRecipeById = formatRecipe(recipeById, typeFood);

        setRecipe({ ...formattedRecipeById,
          youtube: typeFood === 'meals'
            ? recipeById.meals[0].strYoutube
              .replace('watch?v=', 'embed/')
            : '',
        });
      } catch (error) {
        console.error(error);
      }
    };
    getRecipes();
    fetchRecommendation();
  }, []);
  // console.log(recipe);

  const handleClip = () => {
    navigator.clipboard.writeText(`${window.location.href}`);
    setClip(true);
    setTimeout(() => {
      setClip(false);
    }, 2500);
  };

  const inProgressLocal = JSON.parse(localStorage
    .getItem('inProgressRecipes') || `{"${typeFood}": null}`)[typeFood];

  return (

    <div>
      <div className="title-container">
        <h2 className="rcp-title" data-testid="recipe-title">{recipe.name}</h2>
        {location.pathname === `/meals/${id}` ? (

          <h2 data-testid="recipe-category">{`( ${recipe.category} )`}</h2>

        ) : (

          <h2 data-testid="recipe-category">{`( ${recipe.alcoholicOrNot} )`}</h2>

        )}
      </div>
      <img
        className="recipe-img"
        data-testid="recipe-photo"
        src={ recipe.image }
        alt={ recipe.name }
        width="350px"
      />
      <button className="share-btn" onClick={ handleClip }>
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt=""
        />
      </button>
      <FavoriteButton recipe={ recipe } />
      {clip && <p>Link copied!</p>}
      <p className="instructions" data-testid="instructions">{recipe.instructions}</p>

      <h3 className="ingredients-h3">Ingredients:</h3>
      <ul className="ingredients-list">
        {(recipe && recipe.ingredients)
          && recipe.ingredients.map((ingredient: any, index: number) => (
            <li
              key={ `${ingredient}-${index}` }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient.ingredient} ${recipe?.measures[index]}`}
            </li>
          ))}
      </ul>
      {recipe.youtube !== '' && (
        <>
          <h2 className="ytb-h1">How you can make it</h2>
          <iframe
            data-testid="video"
            className="youtube-frame"
            src={ recipe.youtube }
            title={ recipe.name }
            allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </>
      )}
      <h2 className="carousel-title">Even better with</h2>
      <div
        className="carousel-container"
      >
        {recommendation.slice(0, 6).map((recommendation2: any, index2: number) => (
          <div
            key={ index2 }
            style={ { flex: '0 0 auto', width: '200px', margin: '0 10px' } }
          >
            <img
              data-testid={ `${index2}-recommendation-card` }
              src={ recommendation2.strDrinkThumb || recommendation2.strMealThumb }
              alt={ recommendation2.strDrink || recommendation2.strMeal }
              width="150px"
            />
            <p
              data-testid={ `${index2}-recommendation-title` }
            >
              {recommendation2.strDrink || recommendation2.strMeal}
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        id="btn-start-recipe"
        data-testid="start-recipe-btn"
        className="btn-start-recipe"
        onClick={ () => navigate(`/${typeFood}/${id}/in-progress`) }
      >
        { inProgressLocal && id && inProgressLocal[id]
          ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </div>
  );
}

export default RecipeDetails;
