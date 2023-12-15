import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se é possível digitar nos inputs', () => {
  test('Digitar no input e-mail', async () => {
    const { user } = renderWithRouter(<App />);
    await user.type(screen.getByTestId('email-input'), 'email@hotmail.com');
    expect(screen.getByTestId('email-input')).toHaveValue('email@hotmail.com');
  });
  test('Digitar no input password', async () => {
    const { user } = renderWithRouter(<App />);
    await user.type(screen.getByTestId('password-input'), 'senha123');
    expect(screen.getByTestId('password-input')).toHaveValue('senha123');
  });
});
