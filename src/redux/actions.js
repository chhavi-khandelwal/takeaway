import { SORT, MARK_FAVORITE, SEARCH } from './actionTypes';

export const sortBy = (option, isChecked) => ({
  type: SORT,
  payload: {
    option,
    isChecked
  }
});

export const markFavorite = (isFavorite, id) => ({
  type: MARK_FAVORITE,
  payload: {
    isFavorite,
    id
  }
});

export const search = (searchString) => ({
  type: SEARCH,
  payload: searchString
});
