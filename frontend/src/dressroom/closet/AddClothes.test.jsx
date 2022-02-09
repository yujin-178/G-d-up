/**
 * @jest-environment jsdom
 */

import React from 'react';
import AddClothes from './AddClothes.jsx';

import Modal from 'react-modal';

// jest.mock('react-modal', () => {
//   const React = require('react');
//   const TestReactModal = require('./mockReactModal');
//   return TestReactModal.default;
// });

describe('AddClothes', () => {
	const dispatch = jest.fn();
	
	it('renders react-modal', () => {
		const wrapper = render(<AddClothesContainer />);
		expect(wrapper.find(Modal)).toHaveLength(1);
	});

	it('opens modal when button is clicked', () => {
		const wrapper = render(<AddClothesContainer />);
		expect(wrapper.find(Modal).prop('IsmodalOpen')).toBe(false);

		wrapper.find('button').simulate('click');
  	expect(wrapper.find(Modal).prop('IsmodalOpen')).toBe(true);
	});

	it('closes modal clicked x', ()=> {
		const wrapper = shallow(<AddClothes />);
		expect(wrapper.find(Modal).dive().find('button')).not.toBeNull();

		expect(wrapper.find(Modal).dive().find('button')[0]).not.toBeNull();

		const CloseBtn = wrapper.find(Modal).dive().findWhere(
			node => node.type() === 'button' && node.text() === 'X'
		);
		// expect(CloseBtn.length).toEqual(1);

		// CloseBtn.simulate('click');
		// expect(wrapper.find(Modal).prop('isOpen')).toBe(false);

	})
	
});
