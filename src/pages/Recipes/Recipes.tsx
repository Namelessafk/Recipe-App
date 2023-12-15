import './Recipes.css';

function Recipes({ children }: { children: React.ReactNode }) {
  return (
    <div className="recipes-container" data-testid="recipe-page">
      {children}
    </div>
  );
}

export default Recipes;
