/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import AddClothes from './AddClothes.jsx';

import { mount, shallow } from 'enzyme';
import Modal from 'react-modal';

jest.mock('react-redux');

describe('AddClothes', () => {
	const dispatch = jest.fn();

	it('renders react-modal', () => {
		const wrapper = shallow(<AddClothes />);
		expect(wrapper.find(Modal)).toHaveLength(1);
		expect(wrapper.find(Modal).prop('isOpen')).toBe(false);
	});
	
});
