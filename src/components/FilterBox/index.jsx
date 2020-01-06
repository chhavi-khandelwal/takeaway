import React from 'react';
import { connect } from "react-redux";
import './filterBox.scss';
import { SORT_OPTION_LIST } from '../../shared/constants';
import { sortBy } from '../../redux/actions';

class FilterBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showFilters: false,
			checkedFilters: []
		};
	}

	onChangeHandler(e, option, index) {
		this.props.sortBy(option, e.target.checked);
		const checkedFilters = this.state.checkedFilters;
		checkedFilters[index] = e.target.checked;
		this.setState({'checkedFilters': checkedFilters});
	}

	applyFilters() {
		this.setState({'showFilters': false});
	}

	openFilters() {
		this.setState({'showFilters': true});
	}

	render() {
		return (
		<div>
			<div title="Show Filters" className="icon--mob-filter" onClick={ this.openFilters.bind(this) }></div>
			<div className={`filter__shim ${ this.state.showFilters ? '' : 'hide'}`}></div>
			<div className={`filter__box ${ this.state.showFilters ? 'show' : ''}`}>
			<div className="filter__heading">FILTERS</div>
			{
				SORT_OPTION_LIST.map((option, index) => (
					<label htmlFor={ `filter-${option.id}` } key={ `filter-${option.id}` } className="filter__label">
						<input type="checkbox"
							id={ `filter-${option.id}` }
							onChange={ (e) => this.onChangeHandler(e, option, index) }
							checked={ this.state.checkedFilters[index] || false } />
						<div className="filter__option__name">{ option.name }</div>
					</label>
				))
			}
			<button type="button" className="filter__box__button" onClick={ this.applyFilters.bind(this) }>APPLY</button>
			</div>
		</div>
		)
	}
}

export default connect(
	null,
	{ sortBy }
)(FilterBox);
