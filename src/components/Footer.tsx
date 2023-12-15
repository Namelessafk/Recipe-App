import { Link } from 'react-router-dom';
import drinkImg from '../images/drinkIcon.svg';
import mealsImg from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img
          src={ drinkImg }
          data-testid="drinks-bottom-btn"
          alt="drinks-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealsImg }
          alt="meals-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
