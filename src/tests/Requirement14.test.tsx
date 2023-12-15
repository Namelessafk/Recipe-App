import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { TEST_ID_EXEC_SEARCH_BTN, TEST_ID_NAME_RADIO, TEST_ID_SEARCH_INPUT, TEST_ID_SEARCH_TOP_BTN } from '../utils/Constants';
import { rejectMockMeal } from '../mocks/mockMealsCards';
import { rejectMockDrink } from '../mocks/mockDrinksCards';

describe('Verifica se nenhuma bebida ou comida for encontrada exibe o alerta', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Verifica na página Meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const failedMeal = {
      ok: true,
      json: async () => rejectMockMeal,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(failedMeal);
    vi.spyOn(window, 'alert');

    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    expect(window.location.pathname).toBe('/meals');

    const nameRadio = await screen.findByTestId(TEST_ID_NAME_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await userEvent.type(searchInput, 'dogão');
    await userEvent.click(nameRadio);
    await userEvent.click(btnExecSearch);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters');
    });
  });

  test('Verifica na página Drinks', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    vi.spyOn(window, 'alert');
    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    expect(window.location.pathname).toBe('/drinks');

    const failedDrink = {
      ok: true,
      json: async () => rejectMockDrink,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValue(failedDrink);

    const nameRadio = await screen.findByTestId(TEST_ID_NAME_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await userEvent.type(searchInput, 'coca');
    await userEvent.click(nameRadio);
    await userEvent.click(btnExecSearch);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Sorry, we haven't found any recipes for these filters");
    });
  });
});
