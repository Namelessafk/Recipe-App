import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { mockBeefMeals, mockMealsCards } from '../mocks/mockMealsCards';
import { mockCocktails, mockDrinksCards } from '../mocks/mockDrinksCards';

describe('Verifica a funcionalidade do componente "Recipes.tsx"', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test('Verifica se o componente "Recipes.tsx" é renderizado', async () => {
    const passwordTestId = 'password-input';
    const buttonTestId = 'login-submit-btn';

    const mockMeals = {
      ok: true,
      json: async () => mockMealsCards,
    } as Response;

    const mealsNames = ['Corba', 'Sushi', 'Burek', 'Bistek'];

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockMeals);
    const { user } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'emailteste@hotmail.com');
    expect(screen.getByTestId(buttonTestId)).toBeDisabled();

    await user.type(screen.getByTestId(passwordTestId), 'senha12356');
    expect(screen.getByTestId(buttonTestId)).not.toBeDisabled();
    await user.click(screen.getByTestId(buttonTestId));
    expect(window.location.pathname).toBe('/meals');

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(8);

    mealsNames.forEach((mealName, index) => {
      expect(screen.getByTestId(`${index}-card-name`)).toHaveTextContent(mealName);
    });

    expect(await screen.findByTestId('1-card-name')).toHaveTextContent('Sushi');

    expect(await screen.findByTestId('1-recipe-card')).toBeInTheDocument();
  });
  test('Verifica a ação dos radio buttons na tela meals', async () => {
    const mockMeals = {
      ok: true,
      json: async () => mockMealsCards,
    } as Response;

    const mockBeef = {
      ok: true,
      json: async () => mockBeefMeals,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(mockMeals).mockResolvedValueOnce(mockBeef);
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const allCategory = 'All-category-filter';

    expect(screen.getByTestId(allCategory)).toBeChecked();

    await user.click(screen.getByTestId('Beef-category-filter'));

    expect(screen.getByTestId(allCategory)).not.toBeChecked();

    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(8);
    expect(await screen.findByTestId('2-card-name')).toHaveTextContent('Burek');

    await user.click(screen.getByTestId('Beef-category-filter'));

    // expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(4);
    // expect(await screen.findByTestId('3-card-name')).toHaveTextContent('Bistek');

    await user.click(screen.getByTestId(allCategory));
  });
  test('Verifica se o componente "Recipes.tsx" renderiza a página de drinks de maneira correta', async () => {
    const mockMeals = {
      ok: true,
      json: async () => mockMealsCards,
    } as Response;

    const mockDrinksCard = {
      ok: true,
      json: async () => mockDrinksCards,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockMeals).mockResolvedValueOnce(mockDrinksCard);
    const { user } = renderWithRouter(<App />);

    const passwordTestId = 'password-input';
    const buttonTestId = 'login-submit-btn';

    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'emailteste@hotmail.com');
    expect(screen.getByTestId(buttonTestId)).toBeDisabled();

    await user.type(screen.getByTestId(passwordTestId), 'senha12356');
    expect(screen.getByTestId(buttonTestId)).not.toBeDisabled();
    await user.click(screen.getByTestId(buttonTestId));
    expect(window.location.pathname).toBe('/meals');

    await user.click(screen.getByTestId('drinks-bottom-btn'));

    expect(window.location.pathname).toBe('/drinks');

    const drinksNames = ['A1', 'GG', 'ABC', 'ACE'];

    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(18);

    await waitFor(() => {
      expect(screen.getByTestId('0-card-name')).toBeInTheDocument();
      drinksNames.forEach((drinkName, index) => {
        expect(screen.getByTestId(`${index}-card-name`)).toHaveTextContent(drinkName);
      });
    });
  });
  test('Verifica a ação dos radio buttons na tela drinks', async () => {
    const cocktailId = 'Cocktail-category-filter';

    const mockDrinks = {
      ok: true,
      json: async () => mockDrinksCards,
    } as Response;

    const mockCocktailDrinks = {
      ok: true,
      json: async () => mockCocktails,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockDrinks).mockResolvedValueOnce(mockCocktailDrinks);

    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    // expect(screen.getByTestId('All-category-filter')).toBeChecked();
    // expect(screen.getByTestId('Cocktail-category-filter')).not.toBeChecked();

    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(18);

    await user.click(screen.getByTestId(cocktailId));

    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(9);
    expect(await screen.findByTestId('2-card-name')).toHaveTextContent('50/50');

    await user.click(screen.getByTestId(cocktailId));
    await user.click(screen.getByTestId('All-category-filter'));
  });
});
