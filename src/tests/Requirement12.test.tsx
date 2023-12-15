import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { TEST_ID_EXEC_SEARCH_BTN, TEST_ID_FIRST_LETTER_RADIO, TEST_ID_INGREDIENT_RADIO, TEST_ID_NAME_RADIO, TEST_ID_SEARCH_INPUT, TEST_ID_SEARCH_TOP_BTN } from '../utils/Constants';
import { mockDrinksCards } from '../mocks/mockDrinksCards';

const urlFilterIngredient = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin';
const urlFilterName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
const urlFirstLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

describe('Verifica ao clicar em cada filtro em Drinks', () => {
  beforeEach(() => {
    const mockDrinks = {
      ok: true,
      json: async () => mockDrinksCards,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockDrinks);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica busca por Ingredient', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const ingredienteRadio = await screen.findByTestId(TEST_ID_INGREDIENT_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await act(async () => {
      await userEvent.type(searchInput, 'Gin');
      await userEvent.click(ingredienteRadio);
      await userEvent.click(btnExecSearch);
    });

    expect(global.fetch).toHaveBeenCalledWith(urlFilterIngredient);
  });

  test('Verifica busca por Name', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const nameRadio = await screen.findByTestId(TEST_ID_NAME_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await act(async () => {
      await userEvent.type(searchInput, 'margarita');
      await userEvent.click(nameRadio);
      await userEvent.click(btnExecSearch);
    });

    expect(global.fetch).toHaveBeenCalledWith(urlFilterName);
  });

  test('Verifica busca por First Letter', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const firstLetterRadio = await screen.findByTestId(TEST_ID_FIRST_LETTER_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await act(async () => {
      await userEvent.type(searchInput, 'a');
      await userEvent.click(firstLetterRadio);
      await userEvent.click(btnExecSearch);
    });

    expect(global.fetch).toHaveBeenCalledWith(urlFirstLetter);
  });

  test('Verifica First Letter se, com mais de um caracter, exibe o alert: "Your search must have only 1 (one) character"', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    global.alert = vi.fn();
    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const firstLetterRadio = await screen.findByTestId(TEST_ID_FIRST_LETTER_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await act(async () => {
      await userEvent.type(searchInput, 'aaaa');
      await userEvent.click(firstLetterRadio);
      await userEvent.click(btnExecSearch);
    });

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});
