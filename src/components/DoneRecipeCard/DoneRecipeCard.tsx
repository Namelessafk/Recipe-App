import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DoneRecipeType } from '../../types';
import shareIcon from '../../images/shareIcon.svg';
import './DoneRecipeCard.css';

type DoneRecipeProps = {
  recipe: DoneRecipeType;
  index: number;
};

function DoneRecipeCard({ recipe, index }: DoneRecipeProps) {
  const { type, nationality, category, name, tags, image, doneDate } = recipe;
  const [copied, setCopied] = useState(false);

  const urlDetails = `${window.location.origin}/${type}s/${recipe.id}`;

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="done-card">
      <h4 data-testid={ `${index}-horizontal-done-date` }>
        {`Done in: ${doneDate.split('T')[0].split('-').reverse().join('/')}`}
      </h4>
      <Link to={ urlDetails }>
        <div className="done-title-container">
          <h3
            className="done-title"
            data-testid={ `${index}-horizontal-name` }
          >
            {name}

          </h3>
          <h4 data-testid={ `${index}-horizontal-top-text` }>
            {type === 'meal' ? `( ${nationality} - ${category} )`
              : `( ${recipe.alcoholicOrNot} )`}
          </h4>

        </div>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          className="done-img"
        />
      </Link>
      {type === 'meal' && (
        <div>
          {
              tags?.slice(0, 2).map((tag, i) => (
                <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </p>
              ))
            }
        </div>
      )}
      <button
        className="done-share-btn"
        aria-label="Compartilhar"
        onClick={ () => copyToClipboard(urlDetails) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Compartilhar"
        />
      </button>
      {copied && <span>Link copied!</span>}
    </div>
  );
}

export default DoneRecipeCard;
