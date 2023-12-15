import { ApiFoodType, FoodType } from '../types';

export function removeEmptyOrNullKeys(apiReturn: ApiFoodType[]) {
  if (apiReturn) {
    return apiReturn.map((recipe) => (
      Object.keys(recipe).reduce((newApiReturn, key) => {
        if (recipe[key] !== null && recipe[key] !== '') {
          newApiReturn[key] = recipe[key];
        }
        return newApiReturn;
      }, {} as FoodType)
    ));
  }
}
