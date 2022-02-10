import React, { useState, useRef } from 'react';
import AddClothes from '../../components/dressroom/AddClothes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {
	changeisModalOpen,
} from '../../slices/modalSlice';

import {
	changelaundryOpen,
} from '../../slices/laundrySlice';

export default function AddClothesContainer() {
	const dispatch = useDispatch();
	const modal = useSelector(state => state.modalSlice);
	const { isModalOpen } = modal;

	const laundry = useSelector(state => state.laundrySlice);
	const { selectedIcon } = laundry;

	const [fileUrl, setFileUrl] = useState(null);
	const imgInput = useRef(null);

	function onImgChange(event) {
		const formData = new FormData();
		formData.append('imageFile', event.target.files[0]);
		const config = {
			Headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		axios.post(`http://i6b108.p.ssafy.io:8000/clothing/background`, formData, config)
			.then((res) => {
				const imgURL = res.data.data;
				setFileUrl(imgURL);
			})
			.catch((err)=>{
				console.log(err);
			});
	}

	function handleModal(value) {
		dispatch(changeisModalOpen(value));
	}

	function handleLaundry(value) {
		dispatch(changelaundryOpen(value));
	}

	return (
		<div>
			<AddClothes
				onImgChange={onImgChange}
				preview={fileUrl}
				imgInput={imgInput}
				modalToggle={handleModal}
				isModalOpen={isModalOpen}
				handleLaundry={handleLaundry}
				selectedLaundry={selectedIcon}
			/>
		</div>
	);
}
