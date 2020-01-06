import React from 'react';
import './searchBar.scss';
import { connect } from "react-redux";
import { search } from '../../redux/actions';
import { debounce } from '../../shared/utils/helpers';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
		this.searchString = '';
	}

	updateInput = value => {
		this.setState({ value });
	};

	getFilteredRestaurants = (e) => {
		e.preventDefault();
		//stop multiple re rendering
		if (this.searchString === this.state.value) { return; }
		this.props.search(this.state.value);
		this.searchString = this.state.value;
	}

	render() {
		return (
		<div className="search__bar">
			<form className="search__bar__input-wrapper">
			<input
				type="text"
				placeholder="Search Restaurants"
				onChange={ e => debounce(this.updateInput(e.target.value), 100) }
				value={ this.state.value  }/>
			<button
				type="submit"
				className="icon--search"
				onClick={ (e) => this.getFilteredRestaurants(e) }>
			</button>
			</form>
		</div>
		)
	}
}

export default connect(
	null,
	{ search }
)(SearchBar);
