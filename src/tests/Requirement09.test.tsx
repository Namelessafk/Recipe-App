import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { mockMealsCards } from '../mocks/mockMealsCards';

test('Verifica se o ícone de busca altera a visibilidade do input de busca', async () => {
  const mockMeals = {
    ok: true,
    json: async () => mockMealsCards,
  } as Response;

  vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockMeals);

  const { user } = renderWithRouter(<App />, { route: '/meals' });

  const searchIcon = screen.getByTestId('search-top-btn');
  await user.click(searchIcon);

  const searchInput = await screen.findByTestId('search-input');
  expect(searchInput).toBeInTheDocument();

  await user.click(searchIcon);
  expect(searchInput).not.toBeInTheDocument();
});
