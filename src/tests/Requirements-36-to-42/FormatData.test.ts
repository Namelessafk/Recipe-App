import formatRecipe from '../../utils/formatRecipeDetails';
import nullTagDrinkData from '../../mocks/nullTagDrinkData';

describe('Verifica o comportamento da função que formata os dados num caso de tags ser null', () => {
  test('', () => {
    const data = formatRecipe(nullTagDrinkData, 'drinks');
    expect(data?.tags).toStrictEqual([]);
  });
});
