import { ApiReturnType } from '../types';

const mealBaseUrl = 'https://www.themealdb.com/api/json/v1/1';
const drinkBaseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';
// const mealCategoriesUrl = `${mealBaseUrl}/list.php?c=list`;
// const drinkCategoriesUrl = `${drinkBaseUrl}/list.php?c=list`;

// A busca por nome do input no default pode chamar a API apenas
// com "" como parâmetro e retornar todas as receitas

// Luiz Henrique: Implementando tambem a funcionalidade de fazer a filtragem de acordo com os filtros de categorias de comidas e bebidas conforme for informado

export const buildURL = (search: string, route: string, filter?: string) => {
  switch (filter) {
    case 'ingredient':
      return `${route === 'meals' ? mealBaseUrl : drinkBaseUrl}/filter.php?i=${search}`;
    case 'firstLetter':
      return `${route === 'meals' ? mealBaseUrl : drinkBaseUrl}/search.php?f=${search}`;
    case 'category':
      return `${route === 'meals' ? mealBaseUrl : drinkBaseUrl}/filter.php?c=${search}`;
    default:
      return `${route === 'meals' ? mealBaseUrl : drinkBaseUrl}/search.php?s=${search}`;
  }
};

export const fetchRecipes = async (search: string, route: string, filter?: string) => {
  const url = buildURL(search, route, filter);
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error requesting ${route} API`);

    const data = await response.json() as ApiReturnType;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecipesById = async (path: string, id: string) => {
  if (path.includes('meals')) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();

    return data;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data;
};

export const fetchRecomendation = async (path: any) => {
  if (path === '/meals') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data.meals;
  }
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
};

// função responsável por fazer a requisição das categorias de comidas e bebidas, de acordo com o que for informado

// export async function fecthCategories(type:'meals' | 'drinks') {
//   const url = type === 'meals' ? mealCategoriesUrl : drinkCategoriesUrl;
//   const response = await fetch(url);
//   const data = await response.json();
//   return data[type];
// }

// export function fetchRecipesByCategories() {}
