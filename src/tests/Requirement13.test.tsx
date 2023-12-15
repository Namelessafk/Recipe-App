import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { TEST_ID_EXEC_SEARCH_BTN, TEST_ID_NAME_RADIO, TEST_ID_SEARCH_INPUT, TEST_ID_SEARCH_TOP_BTN } from '../utils/Constants';
import { singleMeal } from '../mocks/mockMealsCards';
import { singleDrink } from '../mocks/mockDrinksCards';

describe('Verifica se ao retornar apenas um valor, já é direcionado para a página de detalhes', () => {
  test('Verifica na página Meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const MOCKMEAL = {
      ok: true,
      json: async () => singleMeal,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCKMEAL);

    expect(window.location.pathname).toBe('/meals');

    const nameRadio = await screen.findByTestId(TEST_ID_NAME_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await userEvent.type(searchInput, 'lime');
    await userEvent.click(nameRadio);
    await userEvent.click(btnExecSearch);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/meals/52859');
    });
  });

  test('Verifica na página Drinks', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });
    const searchIcon = screen.getByTestId(TEST_ID_SEARCH_TOP_BTN);
    await user.click(searchIcon);

    const MOCKDRINK = {
      ok: true,
      json: async () => singleDrink,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCKDRINK);
    expect(window.location.pathname).toBe('/drinks');

    const nameRadio = await screen.findByTestId(TEST_ID_NAME_RADIO);
    const btnExecSearch = screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN);
    const searchInput = screen.getByTestId(TEST_ID_SEARCH_INPUT);
    await userEvent.type(searchInput, 'dog');
    await userEvent.click(nameRadio);
    await userEvent.click(btnExecSearch);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/drinks/12107');
    });
  });
});
