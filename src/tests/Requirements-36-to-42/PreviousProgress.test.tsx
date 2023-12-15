import { screen } from '@testing-library/dom';
import App from '../../App';
import renderWithRouter from '../../renderWithRouter';

const mockStorage = {
  meals: {
    53065: [
      {
        ingredient: 'Sushi Rice',
        isChecked: true,
      },
      {
        ingredient: 'Rice wine',
        isChecked: true,
      },
      {
        ingredient: 'Caster Sugar',
        isChecked: true,
      },
      {
        ingredient: 'Mayonnaise',
        isChecked: true,
      },
      {
        ingredient: 'Rice wine',
        isChecked: true,
      },
      {
        ingredient: 'Soy Sauce',
        isChecked: true,
      },
      {
        ingredient: 'Cucumber',
        isChecked: true,
      },
    ],
  },
  drinks: {
    17222: [
      {
        ingredient: 'Gin',
        isChecked: true,
      },
      {
        ingredient: 'Grand Marnier',
        isChecked: true,
      },
      {
        ingredient: 'Lemon Juice',
        isChecked: true,
      },
      {
        ingredient: 'Grenadine',
        isChecked: true,
      },
    ],
  },
};

describe('verifica o comportamento do app ao entrar nos detalhes de uma receita já iniciada', () => {
  test('Verifica se o título do botão é alterado ao ter a receita em questão no localStorage e se os checkboxes renderizam checkados', async () => {
    window.localStorage.setItem('inProgressRecipes', JSON.stringify(mockStorage));
    const { user } = renderWithRouter(<App />, { route: '/meals/53065' });

    const startBtnId = 'start-recipe-btn';
    const startButton = screen.getByTestId(startBtnId);

    expect(startButton).not.toHaveTextContent('Start Recipe');
    expect(startButton).toHaveTextContent('Continue Recipe');

    await user.click(startButton);

    const allCheckboxes = await screen.findAllByRole('checkbox');

    allCheckboxes.forEach((checkbox) => expect(checkbox).toBeChecked());
  });
  test('Verifica se o título do botão é alterado ao ter a receita em questão no localStorage e se os checkboxes renderizam checkados', async () => {
    window.localStorage.clear();
    const { user } = renderWithRouter(<App />, { route: '/meals/53065' });

    const startBtnId = 'start-recipe-btn';
    const startButton = screen.getByTestId(startBtnId);

    expect(startButton).toHaveTextContent('Start Recipe');
    expect(startButton).not.toHaveTextContent('Continue Recipe');

    await user.click(startButton);

    const allCheckboxes = await screen.findAllByRole('checkbox');

    allCheckboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
  });
});
