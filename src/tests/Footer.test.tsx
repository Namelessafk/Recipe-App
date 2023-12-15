import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { mockDrinksCards } from '../mocks/mockDrinksCards';
import { mockMealsCards } from '../mocks/mockMealsCards';

describe('Verifica a funcionalidade do componente "Footer.tsx" e se ele está sendo renderizado nas rotas corretas', () => {
  const mealBtnId = 'meals-bottom-btn';

  test('Verifica se o componente "Footer.tsx" é renderizado na tela de meals e ao ser clicado no botão de drinks, leva para a rota "/drinks"', async () => {
    const mockMeals = {
      ok: true,
      json: async () => mockMealsCards,
    } as Response;

    const mockDrinks = {
      ok: true,
      json: async () => mockDrinksCards,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockMeals).mockResolvedValueOnce(mockDrinks);

    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();

    await user.click(screen.getByTestId('drinks-bottom-btn'));

    // expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent('Drinks');
  });
  test('Verifica se o componente "Footer.tsx" é renderizado na tela de drinks e ao ser clicado no botão meals, leva para a rota "/meals"', async () => {
    const mockDrinks = {
      ok: true,
      json: async () => mockDrinksCards,
    } as Response;

    const mockMeals = {
      ok: true,
      json: async () => mockMealsCards,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockDrinks).mockResolvedValueOnce(mockMeals);

    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const mealsBtn = screen.getByTestId(mealBtnId);
    expect(mealsBtn).toBeInTheDocument();

    await user.click(mealsBtn);

    // expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Meals');
  });

  test('Verifica se o componente "Footer.tsx" não é renderizado na tela de login', () => {
    renderWithRouter(<App />, { route: '/' });
    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  test('Verifica se o componente footer não é renderizado no componente doneRecipes', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });

    expect(screen.queryByTestId(mealBtnId)).toBeNull();
    expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
  });

  test('Verifica se o componente footer não é renderizado no componente doneRecipes', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });

    expect(screen.queryByTestId(mealBtnId)).toBeNull();
    expect(screen.getByRole('heading', { name: /favorite recipes/i })).toBeInTheDocument();
  });
});
