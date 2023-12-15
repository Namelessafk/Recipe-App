import { vi } from 'vitest';
import { mealData } from './mealMockDataInProgress';
// mock de uma requisição da api por id
const mealMockFetch = () => {
  const mockResponse = {
    json: () => Promise.resolve(mealData),
    ok: true,
    status: 200,
  };
  global.fetch = vi.fn(() => {
    return Promise.resolve(mockResponse);
  }) as any;
};

export default mealMockFetch;
