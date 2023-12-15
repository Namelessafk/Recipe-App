import { screen, fireEvent } from '@testing-library/react';
import Profile from '../pages/Profile/Profile';
import renderWithRouter from '../renderWithRouter';

describe('Testes da Tela Perfil', () => {
  test('Verifica renderização de elementos', () => {
    renderWithRouter(<Profile />);
    // Verifica se o e-mail é renderizado
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    // Verifica se os botões são renderizados
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  test('Redireciona para a tela de receitas feitas ao clicar em Done Recipes', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const doneRecipesBtn = getByTestId('profile-done-btn');
    fireEvent.click(doneRecipesBtn);
    expect(window.location.pathname).toBe('/done-recipes');
  });

  test('Redireciona para a tela de receitas favoritas ao clicar em Favorite Recipes', () => {
    const { getByTestId } = renderWithRouter(<Profile />);
    const favoriteRecipesBtn = getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesBtn);
    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  test('Limpa localStorage e redireciona para a tela de login ao clicar em Logout', () => {
    // Simula um usuário logado com um email fictício
    localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));

    const { getByTestId } = renderWithRouter(<Profile />);
    const logoutBtn = getByTestId('profile-logout-btn');

    fireEvent.click(logoutBtn);

    expect(window.location.pathname).toBe('/');
    // Verifica se o localStorage foi limpo
    expect(localStorage.getItem('user')).toBeNull();
  });
});
