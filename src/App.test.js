import React from 'react';
import App from './App';
import data from './dataStorage/data.js';
import { NO_RESULT_STRING } from './shared/constants';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { expect } from 'chai';

configure({adapter: new Adapter()});
describe('Restaurants displayed on dashboard based on search', () => {
  const wrapper = mount(<App/>);
  
  it('shows all restaurants if no search made', () => {
    const wrapper = mount(<App/>);
    expect(wrapper.find('.tile')).to.have.lengthOf(data.restaurants.length);
  });

  it('shows all restaurants when blanks entered', () => {
    const searchTerm = '   ';
    wrapper.find('.search__bar input').simulate('change', { target: { value: searchTerm } });
    wrapper.find('.icon--search').simulate('click');
    expect(wrapper.find('.tile')).to.have.lengthOf(19);
  });

  it('shows filtered results when search made', () => {
    const searchTerm = 'sushi';
    wrapper.find('.search__bar input').simulate('change', { target: { value: searchTerm } });
    wrapper.find('.icon--search').simulate('click');
    expect(wrapper.find('.tile')).to.have.lengthOf(4);
  });

  it('shows no result string when match is found', () => {
    const searchTerm = 'shdkshkshdk';
    wrapper.find('.search__bar input').simulate('change', { target: { value: searchTerm } });
    wrapper.find('.icon--search').simulate('click');
    expect(wrapper.find('.tile')).to.have.lengthOf(0);
    expect(wrapper.find('.no-show').text()).to.equal(NO_RESULT_STRING);
  });

  it('shows filtered results and does not show No Result String', () => {
    const searchTerm = 'indian';
    wrapper.find('.search__bar input').simulate('change', { target: { value: searchTerm } });
    wrapper.find('.icon--search').simulate('click');
    expect(wrapper.find('.tile')).to.have.lengthOf(1);
    expect(wrapper.find('no-show').exists()).to.equal(false);
  });
});
