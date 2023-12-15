import { screen } from '@testing-library/dom';
import App from '../../App';
import renderWithRouter from '../../renderWithRouter';

const finishBtnID = 'finish-recipe-btn';
const recipeName = 'Teriyaki Chicken Casserole';
describe('Verifica se a receita é salva corretamente no localStorage', () => {
  test('', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals/52772/in-progress' });

    await screen.findByText(recipeName);
    await user.click(await screen.findByTestId('0-ingredient-step'));
    await user.click(await screen.findByTestId('1-ingredient-step'));
    await user.click(await screen.findByTestId('2-ingredient-step'));
    await user.click(await screen.findByTestId('3-ingredient-step'));
    expect(JSON.parse(window.localStorage.getItem('inProgressRecipes') as string).meals[52772]).toHaveLength(9);
    expect(screen.getByTestId(finishBtnID)).toBeDisabled();
    await user.click(await screen.findByTestId('4-ingredient-step'));
    await user.click(await screen.findByTestId('5-ingredient-step'));
    await user.click(await screen.findByTestId('6-ingredient-step'));
    await user.click(await screen.findByTestId('7-ingredient-step'));
    await user.click(await screen.findByTestId('8-ingredient-step'));
    expect(screen.getByTestId(finishBtnID)).not.toBeDisabled();
    await user.click(screen.getByTestId(finishBtnID));
    expect(JSON.parse(window.localStorage.getItem('doneRecipes') as string)[0].name).toContain(recipeName);
    expect(window.location.pathname).toBe('/done-recipes');
  });
});
