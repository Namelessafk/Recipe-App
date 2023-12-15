import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../../App';
import renderWithRouter from '../../renderWithRouter';
import { drinkData } from '../../mocks/drinkMockDataInProgress';
import { mockMealsCards } from '../../mocks/mockMealsCards';
import { mealData } from '../../mocks/mealMockDataInProgress';
import { mockDrinksCards } from '../../mocks/mockDrinksCards';

describe('Verifica a presença ou não de um vídeo do youtube em diferentes tipos de receita', () => {
  const mockResponse = (mock: any) => ({
    ok: true,
    json: async () => mock,
  } as Response);
  test('Verifica a presença numa rota de meals', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse(mealData))
      .mockResolvedValueOnce(mockResponse(mockDrinksCards));
    renderWithRouter(<App />, { route: '/meals/52772' });

    await screen.findByText('A1');

    const firstRecomendationTitle = screen.getByTestId('0-recommendation-title');
    const firstRecomendationImage = screen.getByTestId('0-recommendation-card');

    expect(screen.queryByTestId('video')).toBeInTheDocument();
    expect(firstRecomendationTitle).toHaveTextContent('A1');
    expect(firstRecomendationImage).toHaveAttribute('src', mockDrinksCards.drinks[0].strDrinkThumb);
  });
  test('Verifica a presença numa rota de drinks', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(mockResponse(drinkData))
      .mockResolvedValueOnce(mockResponse(mockMealsCards));

    renderWithRouter(<App />, { route: '/drinks/11007' });

    await screen.findByText('Margarita');
    expect(screen.queryByTestId('video')).not.toBeInTheDocument();
    const firstRecomendationTitle = screen.getByTestId('0-recommendation-title');
    const firstRecomendationImage = screen.getByTestId('0-recommendation-card');

    expect(firstRecomendationTitle).toHaveTextContent('Corba');
    expect(firstRecomendationImage).toHaveAttribute('src', mockMealsCards.meals[0].strMealThumb);
  });
});
