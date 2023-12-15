import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { mockMealsCards } from '../mocks/mockMealsCards';

test('Verifica se o ícone do perfil redireciona o usuário para a rota /profile e o header é modificado', async () => {
  const mockMeals = {
    ok: true,
    json: async () => mockMealsCards,
  } as Response;

  vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockMeals);

  const { user } = renderWithRouter(<App />, { route: '/meals' });

  expect(screen.getAllByText('Meals')).toHaveLength(1);

  await user.click(screen.getByTestId('profile-top-btn'));

  expect(window.location.pathname).toBe('/profile');

  expect(screen.getByText('Profile')).toBeInTheDocument();
  expect(screen.queryByText('Meals')).not.toBeInTheDocument();
});
