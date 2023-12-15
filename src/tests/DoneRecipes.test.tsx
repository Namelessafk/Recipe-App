import { screen, waitFor } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import doneRecipesData from '../mocks/mockDoneRecipes';
import { TEST_ID_ALL_BTN, TEST_ID_DRINK_BTN, TEST_ID_MEAL_BTN } from '../utils/Constants';

const doneRecipeRoute = '/done-recipes';

describe('Testes de "DoneRecipes.tsx"', () => {
  beforeEach(() => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesData));
  });

  test('Verifica se "DoneRecipes.tsx" é renderizado sem informações do localStorage', async () => {
    window.localStorage.clear();
    renderWithRouter(<App />, { route: doneRecipeRoute });
    expect(screen.getByRole('heading', { name: /Done Recipes/i })).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_MEAL_BTN)).toBeEnabled();
    expect(screen.getByTestId(TEST_ID_DRINK_BTN)).toBeEnabled();
    expect(screen.getByTestId(TEST_ID_ALL_BTN)).toBeEnabled();
    expect(screen.queryByText(/Kir/i)).toBeNull();
    expect(screen.queryByText(/Poutine/i)).toBeNull();
  });

  test('Verifica se "DoneRecipes.tsx" é renderizado com informações do localStorage', async () => {
    renderWithRouter(<App />, { route: doneRecipeRoute });
    expect(screen.getByRole('heading', { name: /Done Recipes/i })).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_MEAL_BTN)).toBeEnabled();
    expect(screen.getByTestId(TEST_ID_DRINK_BTN)).toBeEnabled();
    expect(screen.getByTestId(TEST_ID_ALL_BTN)).toBeEnabled();
    expect(screen.getByText(/Kir/i)).toBeInTheDocument();
    expect(screen.getByText(/Poutine/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Done in/i)).toHaveLength(doneRecipesData.length);
  });

  test('Verifica se clicar no botão Meals, ele filtra apenas comidas', async () => {
    const { user } = renderWithRouter(<App />, { route: doneRecipeRoute });

    await user.click(screen.getByTestId(TEST_ID_MEAL_BTN));
    expect(await screen.findByText(/Poutine/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Done in/i)).toHaveLength(1);
    doneRecipesData[1].tags.slice(0, 2).forEach((tag) => expect(screen.getByText(tag)).toBeInTheDocument());
    expect(screen.queryByText(/Kir/i)).toBeNull();
  });

  test('Verifica se clicar no botão Drinks, ele filtra apenas bebidas', async () => {
    const { user } = renderWithRouter(<App />, { route: doneRecipeRoute });

    await user.click(screen.getByTestId(TEST_ID_DRINK_BTN));
    expect(await screen.findByText(/Kir/i)).toBeInTheDocument();
    expect(screen.getByText(/Alcoholic/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Done in/i)).toHaveLength(1);
    expect(screen.queryByText(/Poutine/i)).toBeNull();
  });

  test('Verifica se ao clicar no botão Meals e depois em All, renderiza todos do localStorage', async () => {
    const { user } = renderWithRouter(<App />, { route: doneRecipeRoute });

    await user.click(screen.getByTestId(TEST_ID_MEAL_BTN));
    expect(await screen.findByText(/Poutine/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Done in/i)).toHaveLength(1);

    await user.click(screen.getByTestId(TEST_ID_ALL_BTN));
    expect(screen.getByText(/Kir/i)).toBeInTheDocument();
    expect(screen.getByText(/Poutine/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Done in/i)).toHaveLength(doneRecipesData.length);
  });

  test('Verifica se ao clicar em compartilhar a bebida, é copiado o link para a página da receita', async () => {
    const { user } = renderWithRouter(<App />, { route: doneRecipeRoute });

    const writeTextMock = vi.fn();
    vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeTextMock);

    await user.click(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.queryByText(/Link copied!/i)).not.toBeNull();

    expect(writeTextMock).toHaveBeenCalledWith('http://localhost:3000/drinks/17203');
    await waitFor(() => expect(screen.queryByText(/Link copied!/i)).toBeNull(), { timeout: 3600 });

    expect(screen.getByText(/Kir/i)).toBeInTheDocument();
    expect(screen.getByText(/Poutine/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Done in/i)).toHaveLength(doneRecipesData.length);
  });

  test('Verifica se ao clicar em compartilhar a comida, é copiado o link para a receita', async () => {
    const { user } = renderWithRouter(<App />, { route: doneRecipeRoute });

    const writeTextMock = vi.fn();
    vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(writeTextMock);

    await user.click(screen.getByTestId('1-horizontal-share-btn'));
    expect(screen.queryByText(/Link copied!/i)).not.toBeNull();

    expect(writeTextMock).toHaveBeenCalledWith('http://localhost:3000/meals/52804');
    await waitFor(() => expect(screen.queryByText(/Link copied!/i)).toBeNull(), { timeout: 3600 });

    expect(screen.getByText(/Kir/i)).toBeInTheDocument();
    expect(screen.getByText(/Poutine/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Done in/i)).toHaveLength(doneRecipesData.length);
  });
});
