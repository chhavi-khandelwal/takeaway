export const NO_RESULT_STRING = 'Sorry! No results found.';

export const DEFAULT_SORT_OPTIONS = {
    FAVORITE: 'isFavorite',
    STATUS: 'status' 
};

export const OPENING_STATE_PRIORITY = {
    'open': 1,
    'order ahead': 2,
    'closed': 3
};

export const SORT_OPTION_LIST = [
    {
        id: 201,
        name: 'best match',
        type: 'bestMatch',
        ascOrder: false
    },
    {
        id: 202,
        name: 'newest',
        type: 'newest',
        ascOrder: true
    },
    {
        id: 203,
        name: 'rating average',
        type: 'ratingAverage',
        ascOrder: false
    },
    {
        id: 204,
        name: 'distance',
        type: 'distance',
        ascOrder: true
    },
    {
        id: 205,
        name: 'popularity',
        type: 'popularity',
        ascOrder: false
    },
    {
        id: 206,
        name: 'average product price',
        type: 'averageProductPrice',
        ascOrder: true
    },
    {
        id: 207,
        name: 'delivery costs',
        type: 'deliveryCosts',
        ascOrder: true
    },
    {
        id: 208,
        name: 'minimum costs',
        type: 'minCost',
        ascOrder: true
    }
];
