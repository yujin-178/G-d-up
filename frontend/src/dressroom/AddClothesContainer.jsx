import React, {useState, useRef} from 'react';
import AddClothesPage from './AddClothesPage.jsx'
import axios from 'axios';

export default function AddClothesContainer() {
    const [fileUrl, setFileUrl] = useState(null);
    const imgInput = useRef(null);

    function onImgChange(event){
      const imgFile = event.target.files[0];
      const imgURL = URL.createObjectURL(imgFile);
      setFileUrl(imgURL);

      const formData = new FormData();
      formData.append('imageFile', event.target.files[0]);
      const config = {
        Headers: {
          'content-type' : 'multipart/form-data',
        },
      };
      axios.post(``, formData, config)
      .then(res=>{
        URL.revokeObjectURL(fileUrl);
        setFileUrl("");

      })
      // axios.post(``, fromData, config);
    }

  return ( 
    <div>
      <AddClothesPage 
      onImgChange={onImgChange}
      preview={fileUrl}
      imgInput={imgInput}
      />
    </div>
  )
}
