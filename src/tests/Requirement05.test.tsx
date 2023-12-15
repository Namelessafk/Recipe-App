import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const buttonTestId = 'login-submit-btn';

describe('Verifica se o email é salvo no localStorage na chave user', () => {
  test('', async () => {
    const { user } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'meuemail@hotmail.com');

    await user.type(screen.getByTestId('password-input'), '1234567');

    await user.click(screen.getByTestId(buttonTestId));
    expect(JSON.parse(window.localStorage.getItem('user') as string)).toEqual({ email: 'meuemail@hotmail.com' });
  });
});
