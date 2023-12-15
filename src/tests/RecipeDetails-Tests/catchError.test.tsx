import { vi } from 'vitest';
import App from '../../App';
import renderWithRouter from '../../renderWithRouter';

test('verifica o comportamento da aplicação caso a api não responda', async () => {
  global.fetch = vi.fn(() => Promise.reject(new Error('API endpoint not found')));

  renderWithRouter(<App />, { route: '/drinks/11dsa007' });
});
