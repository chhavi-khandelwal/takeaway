import React from 'react';
import './dashboard.scss';
import RestaurantContainer from '../RestaurantContainer';
import SearchBar from '../SearchBar';
import FilterBox from '../FilterBox';
import { connect } from "react-redux";
import { NO_RESULT_STRING } from '../../shared/constants';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <SearchBar></SearchBar>
        <div className="dashboard__grid">
          <FilterBox></FilterBox>
          {
            !this.props.restaurants.length && <div className="no-show">{ NO_RESULT_STRING }</div>
          }
          <RestaurantContainer></RestaurantContainer>
        </div>
      </div>
    )
  }
}

//update props to re-render
const mapStateToProps = state => {
  return { restaurants: state.Restaurants.restaurants };
};

export default connect(
    mapStateToProps,
    null
)(Dashboard);
