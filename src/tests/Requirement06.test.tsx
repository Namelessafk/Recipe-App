import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { mockMealsCards } from '../mocks/mockMealsCards';

const buttonTestId = 'login-submit-btn';

describe('Verifica o usuário é redirecionado para outra rota', () => {
  test('', async () => {
    const mockMeals = {
      ok: true,
      json: async () => mockMealsCards,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockMeals);
    const { user } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'meuemail@hotmail.com');

    await user.type(screen.getByTestId('password-input'), '1234567');

    await user.click(screen.getByTestId(buttonTestId));
    expect(JSON.parse(window.localStorage.getItem('user') as string)).toEqual({ email: 'meuemail@hotmail.com' });
    expect(window.location.pathname).toBe('/meals');
  });
});
