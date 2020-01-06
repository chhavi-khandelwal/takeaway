import { SORT, MARK_FAVORITE, SEARCH } from "../actionTypes";
import data from '../../dataStorage/data';
import { reArrangeRestaurants, markFavorite, getFilteredRestaurants, sortBy } from '../../shared/utils/service';

const initialState = {
  selectedSortOptions: [],
  restaurants: sortBy(data.restaurants)
};

const Restaurants = (state = initialState, action) => {
  	switch (action.type) {
		case SORT: return {
			selectedSortOptions: [ ...state.selectedSortOptions, action.payload.option ],
			restaurants: [ ...reArrangeRestaurants(state, action.payload) ]
		}

		case MARK_FAVORITE: return {
			selectedSortOptions: state.selectedSortOptions,
			restaurants: [ ...markFavorite(state.restaurants, action.payload) ]
		}

		case SEARCH: return {
			selectedSortOptions: state.selectedSortOptions,
			restaurants: [ ...getFilteredRestaurants(action.payload, state.selectedSortOptions) ]
		}

		default: {
			return state;
		}
  	}
};

export default Restaurants;
