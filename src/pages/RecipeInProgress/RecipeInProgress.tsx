import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import formatRecipe from '../../utils/formatRecipeDetails';
import { FormattedRecipeInProgress, InProgressType } from '../../types';
import handleDoneRecipe from '../../utils/doneRecipes';
import shareIcon from '../../images/shareIcon.svg';
import FavoriteButton from '../../components/favoriteButton';
import findInLocalStorage from '../../utils/findInLocalStorage';
import setInProgressOnMount from '../../utils/setInProgressOnMount';
import './RecipeInProgress.css';

const INITIAL_STATE = {
  name: '',
  id: '',
  image: '',
  instructions: '',
  category: '',
  alcoholicOrNot: '',
  ingredients: [],
  measures: [],
  type: '',
  tags: [],
  doneDate: '',
  nationality: '',
};

export default function RecipeInProgress() {
  const { id } = useParams();
  const previousProgressLocalStorage = JSON.parse(localStorage
    .getItem('inProgressRecipes') || '{"meals": {}, "drinks": {}}');
  const recipeType = window.location.pathname
    .includes('/meals/') ? 'meals' : 'drinks';
  const [recipeDetails, setRecipeDetails] = useState<
  FormattedRecipeInProgress | any>(INITIAL_STATE);

  const [progress, setProgress] = useState<InProgressType>([]);

  const [isCliped, setIsCliped] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // lógica que altera o endpoint de acordo com o tipo de receita

        const request = recipeType === 'meals' ? await
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          : await
          fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        const response = await request.json();
        // formata os dados para melhor manipulação
        const formattedRecipe = formatRecipe(response, recipeType);

        const foundProgress:
        InProgressType = findInLocalStorage(formattedRecipe.id, recipeType);

        if (foundProgress) {
          setProgress(foundProgress);
        } else {
          setProgress(formattedRecipe.ingredients);
          setInProgressOnMount(formattedRecipe.id, recipeType, formattedRecipe);
        }
        setRecipeDetails(formattedRecipe);
      } catch (error: any) {
        console.log('API endpoint not found');
      }
    };
    fetchRecipe();
  }, []);

  const handleIngredientCheck = (index: number) => {
    const recipeId = `${id}`;

    const currentRecipeProgress = previousProgressLocalStorage[recipeType][recipeId];

    const updatedIngredients = currentRecipeProgress;

    updatedIngredients[index] = {
      ...updatedIngredients[index],
      isChecked: !updatedIngredients[index].isChecked,
    };

    // const newProgress = {
    //   ingredients: updatedIngredients,
    // };

    const updatedInProgress = {
      ...previousProgressLocalStorage,
      [recipeType]: {
        ...previousProgressLocalStorage[recipeType],
        [recipeId]: updatedIngredients,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(updatedInProgress));
    setProgress(updatedIngredients);
  };

  const isRecipeDone = () => {
    return progress?.every((ingredient) => ingredient.isChecked);
  };

  const handleClip = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${recipeType}/${id}`);
    setIsCliped(true);
    setTimeout(() => {
      setIsCliped(false);
    }, 2500);
  };
  return (
    <div>
      <img
        className="recipe-img"
        data-testid="recipe-photo"
        src={ recipeDetails.image }
        alt=""
      />
      <div className="title-container">
        <h2 data-testid="recipe-title">{recipeDetails?.name}</h2>
        {/* caso seja uma bebida, ao lado da categoria é mostrado se é ou não alcólica */}
        <h2 data-testid="recipe-category">
          {`( ${recipeDetails?.category} ) 
          ${recipeDetails?.alcoholicOrNot !== ''
            ? `( ${recipeDetails?.alcoholicOrNot} )` : ''}`}
        </h2>
      </div>
      <button className="share-btn" onClick={ handleClip }>
        <img
          data-testid="share-btn"
          src={ shareIcon }
          alt=""
        />
      </button>
      <FavoriteButton recipe={ recipeDetails } />
      {isCliped && <p>Link copied!</p> }

      <p
        className="instructions"
        data-testid="instructions"
      >
        {recipeDetails?.instructions}
      </p>

      <h3 className="ingredients-h3">Ingredients:</h3>
      <ul className="ingredients-list">
        {(recipeDetails && recipeDetails.ingredients)
          && recipeDetails.ingredients.map((ingredient: any, index: number) => (
            <li key={ index }>
              <label
            // o className adiciona um risco no label do checkbox, o ternário está conferindo
            // se há progresso dentro do localStorage para dar ou não a propriedade requisitada.
                className={
                   previousProgressLocalStorage[recipeType][`${id}`][index]
                     .isChecked
                     ? 'checked-ingredient' : ''
                }
                data-testid={ `${index}-ingredient-step` }
              >
                {`${ingredient.ingredient} ${recipeDetails?.measures[index]}`}
                <input
                  type="checkbox"
                // aqui a propriedade checked tem um ternário que verifica se há progresso,
                // renderizando o checkbox já marcado caso haja progresso no item em questão.
                  checked={
                    previousProgressLocalStorage[recipeType][`${id}`][index].isChecked
                  }
                  onChange={ () => handleIngredientCheck(index) }
                />
              </label>
            </li>
          ))}

      </ul>
      <button
        className="btn-start-recipe"
        data-testid="finish-recipe-btn"
        onClick={ () => {
          handleDoneRecipe(recipeDetails);

          navigate('/done-recipes');
        } }
        disabled={ !isRecipeDone() }
      >
        Finish Recipe
      </button>
    </div>
  );
}
