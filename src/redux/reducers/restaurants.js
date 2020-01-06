import { SORT, MARK_FAVORITE, SEARCH } from "../actionTypes";
import { SORT_OPTION_LIST } from '../../shared/constants';
import data from '../../dataStorage/data';
import { reArrangeRestaurants, markFavorite, getFilteredRestaurants, sortBy, updateOptionsList } from '../../shared/utils/service';

const initialState = {
  selectedSortOptions: [ SORT_OPTION_LIST[0] ],
  restaurants: sortBy(data.restaurants, [ SORT_OPTION_LIST[0] ])
};

const Restaurants = (state = initialState, action) => {
  	switch (action.type) {
		case SORT: return {
			selectedSortOptions: [ ...updateOptionsList(action.payload, state.selectedSortOptions) ],
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
