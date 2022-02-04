/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from "@testing-library/react";
import AddClothesContainer from './AddClothesContainer.jsx';

describe('AddClothesContainer', () => {
	it('renders AddClothesContainer', () => {


		const { getByText } = render((
			<AddClothesContainer />
		))

		expect(getByText(/옷 추가/)).not.toBeNull();
	});
});
