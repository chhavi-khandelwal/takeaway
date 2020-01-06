import React from 'react';
import './restaurant.scss';
import { getRating } from '../../shared/utils/helpers';
import { connect } from "react-redux";
import { sortBy, markFavorite } from '../../redux/actions';

class Restaurant extends React.Component {

    updateFavourites(isFavorite, id) {
        this.props.markFavorite(isFavorite, id);
    }

    render () {
        const restaurant = this.props.detail;
        const ratings = getRating(Number(restaurant.sortingValues.ratingAverage));
        const imagePath = '/images/' + restaurant.image;
    
        return (
            <li className="tile" title={ `${ restaurant.name }_${ restaurant.id }` }>
                <a href="/" onClick={ (e) => e.preventDefault() }>
                    <div className="tile__image">
                        <picture>
                        <source srcSet={ imagePath } media="(min-width: 250px)"/>
                        <source srcSet={ imagePath } media="(min-width: 250px)"/>
                        <img srcSet={ imagePath } alt={ restaurant.image } width="250px" height="150px"/>
                        </picture>
                    </div>
                    <span className="tile__offer">{ restaurant.status }</span>
                    <div className="tile__info">
                        <div className="tile__club">
                            <div className="tile__title" dangerouslySetInnerHTML={{__html: restaurant.name}}></div>
                            {/* <img src={ like } alt="Mark Favorite" width="20" height="20" className={ this.props.isFavorite ? 'love' : ''} onClick={ this.updateFavourites.bind(this, !this.props.isFavorite, restaurant.id) } /> */}
                            <div className={ `icon--favorite-container ${this.props.isFavorite ? 'love' : ''}`}
                                onClick={ this.updateFavourites.bind(this, !this.props.isFavorite, restaurant.id) }>
                                <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 51.997 51.997">
                                    <g>
                                        <path style={{fill: '#fff' }} stroke="#000" d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543
                                        c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503
                                        c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="tile__info__bottom-bar">
                            <div className="tile__info__bottom-bar__rating">
                                {
                                    ratings.map((rating, index) => 
                                        <span
                                            key={ index }
                                            className={(rating === 1 ? 'rating__star--golden ' : (rating > 0 ? ' rating__star-half' : ' rating__star'))}>
                                        </span>)
                                }
                                {
                                    <span className="rating__text">{ ratings.length ? restaurant.sortingValues.ratingAverage : '' }</span>
                                }
                            </div>

                        </div>
                        <div className="tile__info__bottom-bar">
                            <div className="selected__sort__options">
                                {
                                    this.props.sortOptions.map((option, index) =>
                                        option.id !== 203 && <span className="sort__tag" key={index}>{ `${option.name}:${restaurant.sortingValues[option.type]}` }</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        )
    }
}

//update props to re-render
const mapStateToProps = state => {
    return { sortOptions: state.Restaurants.selectedSortOptions };
};

export default connect(
    mapStateToProps,
    { sortBy, markFavorite }
)(Restaurant);
