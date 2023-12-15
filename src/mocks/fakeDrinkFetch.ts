import { vi } from 'vitest';
import { drinkData } from './drinkMockDataInProgress';
// // mock de uma requisição da api por id
const drinkMockFetch = () => {
  const mockResponse = {
    json: () => Promise.resolve(drinkData),
    ok: true,
    status: 200,
  };
  global.fetch = vi.fn(() => {
    return Promise.resolve(mockResponse);
  }) as any;
};

export default drinkMockFetch;
