import React from 'react';
import { Link } from 'react-router-dom';
import ClothesItemListContainer from './clothesList/ClothesItemListContainer.jsx';
import FilterContainer from '../FilterContainer/FilterContainer.jsx';
import AddClothesContainer from './AddClothesContainer.jsx';
import ClosetDetailContainer from './clothesDetailContainer/ClothesDetailContainer.jsx';

import {
	changemodalIsOpen
} from '../../actions.js'

export default function ClosetContainer() {

	return (
		<div css={GridContainer}>
			<h5>옷장</h5>
			<FilterContainer />
			<ClothesItemListContainer />
			<ClosetDetailContainer/>
			<button
				onClick={() => dispatch(changemodalIsOpen(true))}
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

const GridContainer = css`
	display: grid;
`;
