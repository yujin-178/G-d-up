import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	'selectedIcon': [],
	'laundryOpen': false,
};

export const laundrySlice = createSlice({
	name: 'laundry',
	initialState,
	reducers: {
		changeSelectedIcon(state, action) {
			const { selectedIcon } = state;
			const num = action.payload;
			if (selectedIcon.includes(num)) {
				selectedIcon.splice(selectedIcon.indexOf(num), 1);
			}
			else {
				selectedIcon.push(num);
			}
		},
		changelaundryOpen(state, action) {
			const laundryOpen = action.payload;
			return {
				...state,
				laundryOpen
			};
		},
	},
});

export const {
	changeSelectedIcon,
	changelaundryOpen,
} = laundrySlice.actions;

export default laundrySlice.reducer;