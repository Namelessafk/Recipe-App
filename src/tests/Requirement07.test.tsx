import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { mockDrinksCards } from '../mocks/mockDrinksCards';
import { mockMealsCards } from '../mocks/mockMealsCards';

const titleId = 'page-title';
const profileId = 'profile-top-btn';
const searchIconId = 'search-top-btn';
const inputId = 'search-input';
describe('Verifica se o header é renderizado corretamente dependendo da rota', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica se a rota / não possui header', () => {
    renderWithRouter(<App />);
    expect(window.location.pathname).toBe('/');
    expect(screen.queryByTestId(titleId)).toBeNull();
  });

  test('Verifica se a rota /meals possui header, o título Meals e os botões', () => {
    const mockMeals = {
      ok: true,
      json: async () => mockMealsCards,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockMeals);

    renderWithRouter(<App />, { route: '/meals' });
    expect(window.location.pathname).toBe('/meals');
    expect(screen.getByTestId(titleId)).toBeInTheDocument();
    expect(screen.queryAllByText('Meals')).toHaveLength(1);
    expect(screen.getByTestId(profileId)).toBeInTheDocument();
    expect(screen.getByTestId(searchIconId)).toBeInTheDocument();
  });

  test('Verifica se a rota /drinks possui header, o título Drinks e os botões', () => {
    const mockDrinks = {
      ok: true,
      json: async () => mockDrinksCards,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockDrinks);

    renderWithRouter(<App />, { route: '/drinks' });
    expect(window.location.pathname).toBe('/drinks');
    expect(screen.getByTestId(titleId)).toBeInTheDocument();
    expect(screen.queryAllByText('Drinks')).toHaveLength(1);
    expect(screen.getByTestId(profileId)).toBeInTheDocument();
    expect(screen.getByTestId(searchIconId)).toBeInTheDocument();
  });

  test('Verifica se a o input aparece ou não clickando no botão', async () => {
    const mockDrinks = {
      ok: true,
      json: async () => mockDrinksCards,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockDrinks);

    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    expect(window.location.pathname).toBe('/drinks');
    expect(screen.getByTestId(searchIconId)).toBeInTheDocument();
    expect(screen.queryByTestId(inputId)).toBeNull();
    await user.click(screen.getByTestId(searchIconId));
    expect(screen.queryByTestId(inputId)).not.toBeNull();
    await user.click(screen.getByTestId(searchIconId));
    expect(screen.queryByTestId(inputId)).toBeNull();
    await user.click(screen.getByTestId(profileId));
    expect(window.location.pathname).toBe('/profile');
  });

  test('Verifica se a rota /profile possui header, o título Profile e não possui o ícone de search', () => {
    renderWithRouter(<App />, { route: '/profile' });
    expect(window.location.pathname).toBe('/profile');
    expect(screen.getByTestId(titleId)).toBeInTheDocument();
    expect(screen.queryByText('Profile')).toBeInTheDocument();
    expect(screen.getByTestId(profileId)).toBeInTheDocument();
    expect(screen.queryByTestId(searchIconId)).toBeNull();
  });
});
