import React from 'react';
import Restaurant from '../Restaurant';
import { connect } from "react-redux";
import './restaurantContainer.scss';

class RestaurantContainer extends React.Component {
  render() {
    return (
      	<ul className="tile__container">
			{
				this.props.restaurants.map((restaurant) => <Restaurant detail={ restaurant } isFavorite={restaurant.isFavorite} key={`tile_${restaurant.id}`}></Restaurant>)
			}
      	</ul>
    )
  }
};

//update props to re-render
const mapStateToProps = (state) => {
  return { restaurants: state.Restaurants.restaurants  };
};

export default connect(
    mapStateToProps,
    null
)(RestaurantContainer);
