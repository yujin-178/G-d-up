import React from 'react';
import { Link } from 'react-router-dom';
import ClothesItemListContainer from './clothesList/ClothesItemListContainer.jsx';
import FilterContainer from '../FilterContainer/FilterContainer.jsx';
import AddClothesContainer from './AddClothesContainer.jsx';
import { useDispatch } from 'react-redux';

import {
  changeIsmodalOpen
} from '../../modalSlice';

export default function ClosetContainer() {
	const dispatch = useDispatch();

	return (
		<div>
			<h5>옷장</h5>
			<FilterContainer />
			<ClothesItemListContainer />
			<button
				onClick={() => dispatch(changeIsmodalOpen(true))}
			>
				옷 추가
			</button>
			<AddClothesContainer
			/>
			<Link to='/dressroom'>
				<button>
					뒤로
				</button>
			</Link>
		</div>
	);
}
