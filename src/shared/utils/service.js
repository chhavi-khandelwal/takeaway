import data from '../../dataStorage/data';
import { DEFAULT_SORT_OPTIONS, OPENING_STATE_PRIORITY } from '../../shared/constants';

const RestaurantService = {
    removeFromList: (option, list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === option.id) {
                list.splice(i, 1);
                break;
            }
        }
        return list;
    },

    updateOptionsList: ({option, isChecked}, sortList) => {
        return isChecked ? sortList.push(option) && sortList : RestaurantService.removeFromList(option, sortList);
    },

    reArrangeRestaurants: (state, payload) => {
        let sortList = [];
        if (payload.option) {
            sortList = RestaurantService.updateOptionsList(payload, state.selectedSortOptions);
        }
        return RestaurantService.sortBy(state.restaurants, sortList);
    },

    sortBy: (restaurants, sortList=[]) => {

        return restaurants.sort((r1, r2) => {
            const favorite = DEFAULT_SORT_OPTIONS.FAVORITE;
            const status = DEFAULT_SORT_OPTIONS.STATUS;
            
            if (r1[favorite] === r2[favorite]) {
                const r1Comparator = OPENING_STATE_PRIORITY[r1[status]];
                const r2Comparator = OPENING_STATE_PRIORITY[r2[status]];
                if (r1Comparator > r2Comparator) {
                    return 1;
                }
    
                if (r1Comparator < r2Comparator) {
                    return -1;
                }
    
                if (r1Comparator === r2Comparator) {
                    for (let i = 0; i < sortList.length; i++) {
                        const sortOption = sortList[i];
                        const r1SortType = r1.sortingValues[sortOption.type];
                        const r2SortType = r2.sortingValues[sortOption.type]
                        if (r1SortType === r2SortType) {
                            if (i === sortList.length - 1) {
                                return 0;
                            }
                            continue;
                        }
                        if (r1SortType > r2SortType) { return sortOption.ascOrder ? 1 : -1; }
                        if (r1SortType < r2SortType) { return sortOption.ascOrder ? -1 : 1; }
                    }
                    return r1.id > r2.id ? 1 : -1;
                }
            }
            if (r1[favorite]) {
                return -1;
            }
            return 1;
        });
    },
    
    markFavorite: (restaurants, args) => {
        const { isFavorite, id } = args;
        for (let i = 0; i < restaurants.length; i++) {
            const restaurant = restaurants[i];
            if (restaurant.id === id) {
                restaurant.isFavorite = isFavorite;
                break;
            }
        }
        return restaurants;
    },

    searchBy: (searchString, restaurants) => {
        if (!searchString.trim()) { return RestaurantService.sortBy(data.restaurants); }
        return restaurants.filter((restaurant) => {
            if (restaurant.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1) {
                return restaurant;
            }
            return false;
        });
    },

    getFilteredRestaurants: (searchString, selectedSortOptions) => {
        let selectedRestaurants = RestaurantService.searchBy(searchString, data.restaurants);
        return RestaurantService.sortBy(selectedRestaurants, selectedSortOptions);
    }
};

export const {
    markFavorite,
    reArrangeRestaurants,
    getFilteredRestaurants,
    sortBy
} = RestaurantService;
