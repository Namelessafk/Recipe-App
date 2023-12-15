import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { mockMealsCards } from '../mocks/mockMealsCards';

const passwordTestId = 'password-input';
const buttonTestId = 'login-submit-btn';
//

describe('Verifica se o botão só pode ser clickado quando o formulário for válido', () => {
  test('Verifica o estado do botão ao digitar um formulário inválido', async () => {
    const { user } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'email@');
    expect(emailInput).toHaveValue('email@');

    expect(screen.getByTestId(buttonTestId)).toBeDisabled();

    await user.clear(emailInput);

    await user.type(emailInput, 'meuemail@hotmail.com');
    expect(emailInput).toHaveValue('meuemail@hotmail.com');

    await user.type(screen.getByTestId(passwordTestId), 'senha');
    expect(screen.getByTestId(passwordTestId)).toHaveValue('senha');

    expect(screen.getByTestId(buttonTestId)).toBeDisabled();
  });

  test('Verifica o estado do botão ao digitar um formulário válido', async () => {
    const mockMeals = {
      ok: true,
      json: async () => mockMealsCards,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockMeals);

    const { user } = renderWithRouter(<App />);
    expect(window.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'emailteste@hotmail.com');
    expect(screen.getByTestId(buttonTestId)).toBeDisabled();

    await user.type(screen.getByTestId(passwordTestId), 'senha12356');
    expect(screen.getByTestId(buttonTestId)).not.toBeDisabled();
    await user.click(screen.getByTestId(buttonTestId));
    expect(window.location.pathname).toBe('/meals');
  });
});
