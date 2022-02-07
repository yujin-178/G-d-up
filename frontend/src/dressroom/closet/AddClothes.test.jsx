/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import AddClothesContainer from './AddClothesContainer.jsx';

import Modal from 'react-modal';

// jest.mock('react-modal', () => {
//   const React = require('react');
//   const TestReactModal = require('./mockReactModal');
//   return TestReactModal.default;
// });



describe('AddClothesContainer', () => {
	it('renders AddClothesContainer', () => {

		const { getByText } = render((
			<AddClothesContainer />
		))
		// if (process.env.NODE_ENV !== 'test') {
		// 	ReactModal.setAppElement('#app');
		// }

		expect(getByText(/옷 추가/)).not.toBeNull();
	});

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
	
});
