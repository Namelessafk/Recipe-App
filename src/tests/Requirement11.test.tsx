import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { TEST_ID_EXEC_SEARCH_BTN, TEST_ID_FIRST_LETTER_RADIO, TEST_ID_INGREDIENT_RADIO, TEST_ID_NAME_RADIO, TEST_ID_SEARCH_INPUT, TEST_ID_SEARCH_TOP_BTN } from '../utils/Constants';
import { mockMealsCards } from '../mocks/mockMealsCards';

const urlFilterIngredient = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=banana';
const urlFilterName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=bread';
const urlFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=v';

describe('Verifica ao clicar em cada filtro em Meals', () => {
  beforeEach(() => {
    const mockMeals = {
      ok: true,
      json: async () => mockMealsCards,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockMeals);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica busca por Ingredient', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const ingredienteRadio = await screen.findByTestId(TEST_ID_INGREDIENT_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await act(async () => {
      await userEvent.type(searchInput, 'banana');
      await userEvent.click(ingredienteRadio);
      await userEvent.click(btnExecSearch);
    });

    expect(global.fetch).toHaveBeenCalledWith(urlFilterIngredient);
  });

  test('Verifica busca por Name', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const nameRadio = await screen.findByTestId(TEST_ID_NAME_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await act(async () => {
      await userEvent.type(searchInput, 'bread');
      await userEvent.click(nameRadio);
      await userEvent.click(btnExecSearch);
    });

    expect(global.fetch).toHaveBeenCalledWith(urlFilterName);
  });

  test('Verifica busca por First Letter', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const firstLetterRadio = await screen.findByTestId(TEST_ID_FIRST_LETTER_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await act(async () => {
      await userEvent.type(searchInput, 'v');
      await userEvent.click(firstLetterRadio);
      await userEvent.click(btnExecSearch);
    });

    expect(global.fetch).toHaveBeenCalledWith(urlFirstLetter);
  });

  test('Verifica First Letter se, com mais de um caracter, exibe o alert: "Your search must have only 1 (one) character"', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    global.alert = vi.fn();
    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const firstLetterRadio = await screen.findByTestId(TEST_ID_FIRST_LETTER_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await act(async () => {
      await userEvent.type(searchInput, 'vvv');
      await userEvent.click(firstLetterRadio);
      await userEvent.click(btnExecSearch);
    });

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});
