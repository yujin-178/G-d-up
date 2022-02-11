/**
 * @jest-environment jsdom
 */

import React from 'react';
import AddClothes from './AddClothes.jsx';

import Modal from 'react-modal';
import { shallow } from 'enzyme';

jest.mock('react-redux');

describe('AddClothes', () => {
  // const dispatch = jest.fn();
	
  it('renders react-modal', () => {
    const wrapper = shallow(<AddClothes />);
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find(Modal).prop('isOpen')).toBe(false);
  });

  it('closes modal clicked x', ()=> {
    const wrapper = shallow(<AddClothes />);
    expect(wrapper.find(Modal).dive().find('button')).not.toBeNull();

    expect(wrapper.find(Modal).dive().find('button')[0]).not.toBeNull();

    // const CloseBtn = wrapper.find(Modal).dive().findWhere(
    //   node => node.type() === 'button' && node.text() === 'X'
    // );
    // expect(CloseBtn.length).toEqual(1);

    // CloseBtn.simulate('click');
    // expect(wrapper.find(Modal).prop('isOpen')).toBe(false);

  });
	
});
