import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import * as api from '../services/api';

const TEST_ID_INGREDIENT_RADIO = 'ingredient-search-radio';
const TEST_ID_NAME_RADIO = 'name-search-radio';
const TEST_ID_FIRST_LETTER_RADIO = 'first-letter-search-radio';
const TEST_ID_EXEC_SEARCH_BTN = 'exec-search-btn';

test('Verifica se os elementos da barra de busca renderizam ao clicar em buscar', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });

  const searchIcon = screen.getByTestId('search-top-btn');
  await user.click(searchIcon);

  expect(await screen.findByTestId('search-input')).toBeEmptyDOMElement();

  expect(screen.getByTestId(TEST_ID_NAME_RADIO)).not.toBeChecked();
  expect(screen.getByTestId(TEST_ID_FIRST_LETTER_RADIO)).not.toBeChecked();
  expect(screen.getByTestId(TEST_ID_INGREDIENT_RADIO)).not.toBeChecked();
  expect(screen.getByTestId(TEST_ID_EXEC_SEARCH_BTN)).toBeDisabled();
});

test('Verifica se lança erro ao passar url incorreta', async () => {
  renderWithRouter(<App />, { route: '/meals' });
  vi.spyOn(api, 'fetchRecipes');
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ error: 'Error requesting route API' }),
  });

  try {
    await api.fetchRecipes('lime', 'route', 'name');
  } catch (error: any) {
    expect(error.message).toBe('Error requesting route API');
  }
});
