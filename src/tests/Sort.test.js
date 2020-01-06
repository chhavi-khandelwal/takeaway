import React from 'react';
import App from '../App';
import data from '../dataStorage/data.js';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { expect } from 'chai';

configure({adapter: new Adapter()});

let wrapper = mount(<App/>);

describe('Restaurants displayed on dashboard based on default sort options', () => {
  it('shows all restaurants sorted by status by default', () => {
    expect(wrapper.find('.tile')).to.have.lengthOf(data.restaurants.length);

    const expectedTileIds = ['119', '117', '113', '112', '106', '105', '104', '101', '118', '116', '115', '109', '108', '107', '103', '114', '111', '110', '102'];
    const tiles = wrapper.find('.tile');
    tiles.forEach((tile, i) => {
      expect(tile.props().title.indexOf(expectedTileIds[i]) > -1).to.eql(true);
    });
  });

  it('shows all restaurants if only one sort option is selected', () => {
    let checkbox = wrapper.find('#filter-202');
    checkbox.simulate('change', { target: { checked: true } });
    expect(wrapper.find('#filter-202').props().checked).to.equal(true);
    expect(wrapper.find('.tile')).to.have.lengthOf(data.restaurants.length);

    const tiles = wrapper.find('.tile');
    const expectedTileIds = ['119', '117', '113', '112', '106', '105', '104', '101', '118', '116', '115', '109', '108', '107', '103', '114', '111', '110', '102'];
    tiles.forEach((tile, i) => {
      expect(tile.props().title.indexOf(expectedTileIds[i]) > -1).to.eql(true);
    });
  });

  it('shows all restaurants if sort option is deselected', () => {
    let checkbox201 = wrapper.find('#filter-201');
    let checkbox202 = wrapper.find('#filter-202');
    expect(checkbox201.props().checked).to.equal(true);
    checkbox201.simulate('change', { target: { checked: false } });
    checkbox202.simulate('change', { target: { checked: false } });

    expect(wrapper.find('.tile')).to.have.lengthOf(data.restaurants.length);

    const tiles = wrapper.find('.tile');
    const expectedTileIds = ['101', '104', '105', '106', '112', '113', '117', '119', '103', '107', '108', '109', '115', '116', '118', '102', '110', '111', '114'];
    tiles.forEach((tile, i) => {
      expect(tile.props().title.indexOf(expectedTileIds[i]) > -1).to.eql(true);
    });
  });

  it('shows all restaurants if a sort option is selected after a valid search string', () => {
    const searchTerm = 'sushi';
    wrapper.find('.search__bar input').simulate('change', { target: { value: searchTerm } });
    wrapper.find('.icon--search').simulate('click');
    expect(wrapper.find('.tile')).to.have.lengthOf(4);

    let checkbox = wrapper.find('#filter-201');
    checkbox.simulate('change', { target: { checked: true } });
    expect(wrapper.find('#filter-201').props().checked).to.equal(true);
    const tiles = wrapper.find('.tile');
    expect(tiles).to.have.lengthOf(4);
    const expectedTiles = ['Sushi One_104', 'Tanoshii Sushi_101', 'Zenzai Sushi_114', 'Daily Sushi_110'];
    tiles.forEach((tile, i) => {
      expect(tile.props().title).to.eql(expectedTiles[i]);
    });
  });

  it('show favorite restaurants on top when sort option is selected', () => {
    const searchTerm = '', clickedItem = 18;
    wrapper.find('.search__bar input').simulate('change', { target: { value: searchTerm } });
    wrapper.find('.icon--search').simulate('click');
    wrapper.find('.tile .icon--favorite-container').at(clickedItem).simulate('click');

    let checkbox = wrapper.find('#filter-201');
    checkbox.simulate('change', { target: { checked: true } });
    expect(wrapper.find('#filter-201').props().checked).to.equal(true);

    const tiles = wrapper.find('.tile');
    expect(tiles.at(0).props().title).to.eql('Tandoori Express_102');
  });

  it('shows all restaurants if a sort option is selected after a valid search string', () => {
    let searchTerm = 'sushi';
    wrapper.find('.search__bar input').simulate('change', { target: { value: searchTerm } });
    wrapper.find('.icon--search').simulate('click');
    expect(wrapper.find('.tile')).to.have.lengthOf(4);

    searchTerm = 'r';
    wrapper.find('.search__bar input').simulate('change', { target: { value: searchTerm } });
    wrapper.find('.icon--search').simulate('click');
    expect(wrapper.find('.tile')).to.have.lengthOf(9);
  });
});
