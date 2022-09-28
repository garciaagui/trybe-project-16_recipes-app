import { GET_RECIPES } from './types';

export default function filterSearchBar(state, pathname) {
  const { searchInput, searchFilter } = state;
  let recipeDB;
  let fetchURL;

  if (pathname === '/meals') recipeDB = 'themealdb';
  if (pathname === '/drinks') recipeDB = 'thecocktaildb';
  if (searchFilter === 'ingredient') {
    fetchURL = `https://www.${recipeDB}.com/api/json/v1/1/filter.php?i=${searchInput}`;
  }
  if (searchFilter === 'name-search') {
    fetchURL = `https://www.${recipeDB}.com/api/json/v1/1/search.php?s=${searchInput}`;
  }
  if (searchFilter === 'first-letter-search') {
    if (searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    fetchURL = `https://www.${recipeDB}.com/api/json/v1/1/search.php?f=${searchInput}`;
  }

  return async (dispatch) => {
    try {
      const response = await fetch(fetchURL);
      const data = await response.json();
      dispatch({
        type: GET_RECIPES,
        payload: {
          data,
        },
      });
    } catch (e) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };
}
