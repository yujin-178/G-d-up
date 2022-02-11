import React, { useRef, useState } from 'react';
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
	const [ imgForm, setImg ] = useState(null);

	const config = {
		Headers: {
			'Content-Type': 'multipart/form-data',
		},
	};

	function onImgChange(event) {
		const formData = new FormData();
		formData.append('imageFile', event.target.files[0]);
		setImg(event.target.files[0]);
		
		axios.post(`http://i6b108.p.ssafy.io:8000/clothing/background`, formData, config)
			.then((res) => {
				dispatch(setImgURL(res.data.data));
			})
			.catch((err) => {
				console.log(err);
			});
		axios.post(`http://i6b108.p.ssafy.io:8000/clothing/tag`, formData, config)
			.then((res) => {
				const userName = 'admin';
				const data = res.data.data;
				dispatch(changeTagInfo({data,userName}));
			})
	}

	function saveClothes() {
		const config = {
			Headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const formData = new FormData();
		formData.append('imageFile', imgForm);
		formData.append('clothing', new Blob([JSON.stringify(tagInfo)], {type: 'application/json'}));
		formData.append('hashtag', tagGroup.join(' '));
		formData.append('washing', selectedIcon.join(' '));

		axios.post(`http://i6b108.p.ssafy.io:8000/clothing/save`, formData ,config)
		.then((res)=> {
			// 성공 모달 창 출력
			console.log(res);
		})
		.catch((err)=>{
			console.log(err);
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
