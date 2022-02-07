import React, { useState, useRef } from 'react';
import AddClothes from './AddClothes.jsx'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeIsmodalOpen
} from '../../modalSlice';


export default function AddClothesContainer() {
	const dispatch = useDispatch();
	const {IsmodalOpen} = useSelector(state => state.modalSlice);

	const [fileUrl, setFileUrl] = useState(null);
	const imgInput = useRef(null);

	function onImgChange(event) {
		const imgFile = event.target.files[0];
		const imgURL = URL.createObjectURL(imgFile);
		setFileUrl(imgURL);

		const formData = new FormData();
		formData.append('imageFile', event.target.files[0]);
		const config = {
			Headers: {
				'content-type': 'multipart/form-data',
			},
		};
		axios.post(``, formData, config)
			.then(res => {
				URL.revokeObjectURL(fileUrl);
				setFileUrl("");

			})
	}

	function handleModal(value) {
		dispatch(changeIsmodalOpen(value))
	}

	return (
		<div>
			<AddClothes
				onImgChange={onImgChange}
				preview={fileUrl}
				imgInput={imgInput}
				modalToggle={handleModal}
				IsmodalOpen={IsmodalOpen}
			/>
		</div>
	)
}
