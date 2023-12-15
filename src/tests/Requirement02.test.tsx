import { screen } from '@testing-library/dom';
// import { userEvent } from '@testing-library/user-event/dist/types/setup';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa a página do Login', () => {
  test('Verifica se o input de e-mail é renderizado', async () => {
    const { user } = renderWithRouter(<App />);
    await user.type(screen.getByTestId('email-input'), 'emailteste@hotmail.com');
    expect(screen.getByTestId('email-input')).toHaveDisplayValue('emailteste@hotmail.com');
  });

  test('Verifica se o input de senha é renderizado', async () => {
    const { user } = renderWithRouter(<App />);
    await user.type(screen.getByTestId('password-input'), '123456');
    expect(screen.getByTestId('password-input')).toHaveDisplayValue('123456');
  });

  test('Verifica se o botão de login é renderizado', async () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();
  });
});
