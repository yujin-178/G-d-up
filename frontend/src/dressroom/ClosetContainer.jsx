import React from 'react';
import { Link } from 'react-router-dom';
import ClosetItemListContainer from './ClosetItemListContainer.jsx';
import AddClothesContainer from './AddClothesContainer.jsx';
import { useDispatch } from 'react-redux';

import {
  changemodalIsOpen
} from '../actions.js'


export default function ClosetContainer() {
  const dispatch = useDispatch();

  return (
    <div>
      <h5>옷장</h5>
      <ClosetItemListContainer />
      <div>
      <button
      onClick={()=> dispatch(changemodalIsOpen(true))}
      >옷 추가</button>
      <AddClothesContainer 
      />
      </div>
      <Link to='/dressroom'>
        <button>
          뒤로
        </button>
      </Link>
    </div>

  )
}
