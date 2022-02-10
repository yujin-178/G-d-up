import React from 'react';
import LaundryModal from '../../components/dressroom/LaundryModal';
import { useDispatch, useSelector } from 'react-redux';

import {
	changelaundryOpen,
	changeSelectedIcon,
} from '../../slices/laundrySlice';
import { range } from 'lodash';

export default function laundryModalContainer() {
	const dispatch = useDispatch();
	const laundry = useSelector(state => state.laundrySlice);
	const { laundryOpen, selectedIcon } = laundry;

	const laundryLabel = [
		['물세탁', range(1, 8)], ['표백', range(8, 14)],
		['다림질', range(14, 21)], ['드라이클리닝', range(21, 25)],
		['건조', range(25, 33)]
	]

	function handleLaundryOpen(value) {
		dispatch(changelaundryOpen(value));
	}

	function handleSelectedIcon(num) {
		dispatch(changeSelectedIcon(num))
	}

	return (
		<div>
			<LaundryModal
				laundryOpen={laundryOpen}
				handleLaundry={handleLaundryOpen}
				iconSelect={handleSelectedIcon}
				selectedIcon={selectedIcon}
				laundryLabel={laundryLabel}
			/>
		</div>
	);
}
