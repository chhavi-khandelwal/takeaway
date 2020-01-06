## Description

A react & redux based searching User Interface to sort & search from an array of objects i.e restaurants in this case

## Setup

 - `yarn install`
To install dependencies

 - `yarn start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test`
To run tests (I have currently written end to end test case of my App component)

- `yarn build`
To build a production level build

## Directory Tree

- App (Starting Point)
  - Components
    - Dashboard (The main component displaying the interface)
    - Searchbar (The component showing the search box)
    - RestaurantContainer (The component containing list of Restaurants)
    - Restaurant (The component showing individual restaurant tile)
    - FilterBox (The component showing all the list of sort options)

## How to use

- There are default sort options which gets applied to the restaurants when they are loaded. 1st priority is of favorite restaurant marked. 2nd is status[open, order ahead, closed]. If 2 restaurants are marked favorite, they are then sorted on the basis of restaurant.
This logic works for other sort filters too.
For example: if `bestmatch` sort option is selected:
First restaurants are sorted based on favorites. if both restaurants are favourites, they are sorted on the basis of status; again if status of 2 restaurants is equal, they are sorted on the basis of default sort filter selected,i.e. bestmatch; if bestmatch for both are equal, then they are sorted on the basis of ids.
- One an mark the restaurant unfavorite or deselect the sort options; and restaurants get sorted accordingly.
- Search works on enter or clicking on serach icon near text box.
- Search works on sorted options and vice-versa.
- If no result is found, `Sorry! No results found.` is shown.
- Enter your search text in the input.To see results corresponding to your search text, there are 3 ways:

 1. Press enter : It shows all the results associated with the string.
 2. Click the search icon button: It shows all the results associated with the string.
 3. To get back to initial state, clear the input text or refresh the page.

- Mobile Mode:
It shows a hamburger icon for the filters on mobile with apply button. clicking on hamburger icon opens the filter menu and clicking on apply btn applies the selected filters and shows the list of restaurants.

## Assumptions

- Latest browser version compatibilty.

## Technology choice

- Built in react+redux as it is easier to manage data flow in multiple components with central store for states.
- Used SCSS for CSS which allowed to use common variables/mixins/placeholders and maintain css architecture.
- Use BEM for styling.
- Animations are added using pure CSS(no UI library used)
- Added e2e Test cases for basic search scenarios. There are 2 test files App.test.js & Sort.test.js
- App is mobile/desktop/tablet compatible

## Future improvements and features

- Can maintain a tag list associated with each restaurant, which contains list of all search strings that were entered by the customer who bought that restaurant in the past. (Improves search experience)
- Search/sort History for user using localStorage/cookies
