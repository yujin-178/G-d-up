import React, { useRef } from 'react';
import AddClothes from '../../components/dressroom/AddClothes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { season } from '../../constants/filter';

import {
	changeisModalOpen,
} from '../../slices/modalSlice';

import {
	changelaundryOpen,
} from '../../slices/laundrySlice';

import {
	changeTagInfo,
	setImgURL,
	selectSeason
} from '../../slices/clothesSlice';

export default function AddClothesContainer() {
	const dispatch = useDispatch();
	const modal = useSelector(state => state.modalSlice);
	const { isModalOpen } = modal;

	const laundry = useSelector(state => state.laundrySlice);
	const { selectedIcon } = laundry;

	const clothes = useSelector(state => state.clothesSlice);
	const { imgURL, tagInfo, tagGroup } = clothes;

	const imgInput = useRef(null);

	function onImgChange(event) {
		const formData = new FormData();
		formData.append('imageFile', event.target.files[0]);
		const config = {
			Headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		// axios.post(`http://i6b108.p.ssafy.io:8000/clothing/background`, formData, config)
		// 	.then((res) => {
		// 		dispatch(setImgURL(res.data.data));
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		axios.post(`http://i6b108.p.ssafy.io:8000/clothing/tag`, formData, config)
			.then((res) => {
				dispatch(changeTagInfo(res.data.data));
			})
	}

	function handleModal(value) {
		dispatch(changeisModalOpen(value));
	}

	function handleLaundry(value) {
		dispatch(changelaundryOpen(value));
	}

	function handleSeason(value) {
		dispatch(selectSeason(value));
	}

	function saveClothes() {
		// 백엔드 axios 요청
	}

	return (
		<div>
			<AddClothes
				onImgChange={onImgChange}
				preview={imgURL}
				imgInput={imgInput}
				modalToggle={handleModal}
				isModalOpen={isModalOpen}
				handleLaundry={handleLaundry}
				selectedLaundry={selectedIcon}
				tagInfo={tagInfo}
				allSeason={season}
				tagGroup={tagGroup}
				selectSeason={handleSeason}
				saveClothes={saveClothes}
			/>
		</div>
	);
}
