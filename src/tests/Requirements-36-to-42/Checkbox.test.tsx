import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../../App';
import renderWithRouter from '../../renderWithRouter';

const checkedStyle = 'text-decoration: line-through solid black';

test('Verifica se os checkbox salvam o progresso no localStorage', async () => {
  // drinkMockFetch();

  const { user } = renderWithRouter(<App />, { route: '/drinks/178319/in-progress' });
  const firstLabel = await screen.findByTestId('0-ingredient-step');
  const secondLabel = await screen.findByTestId('1-ingredient-step');

  await user.click(firstLabel);
  await user.click(secondLabel);
  expect(firstLabel).toHaveStyle(checkedStyle);
  expect(secondLabel).toHaveStyle(checkedStyle);

  await user.click(firstLabel);
  await user.click(secondLabel);
  expect(firstLabel).not.toHaveStyle(checkedStyle);
  expect(secondLabel).not.toHaveStyle(checkedStyle);

  vi.clearAllMocks();
});
