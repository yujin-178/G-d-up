import React from 'react';

// function request() {
//   const axios = require('axios');
//   const FormData = require('form-data');
//   const fs = require('fs');
//   const path = require('path');
  
//   const inputPath = '/path/to/file.jpg';
//   const formData = new FormData();
//   formData.append('size', 'auto');
//   formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
  
//   axios({
//     method: 'post',
//     url: 'https://api.remove.bg/v1.0/removebg',
//     data: formData,
//     responseType: 'arraybuffer',
//     headers: {
//       ...formData.getHeaders(),
//       'X-Api-Key': 'd2EjLSrKA4s4ZLdEe33oQ2Mo',
//     },
//     encoding: null
//   })
//   .then((response) => {
//     if(response.status != 200) return console.error('Error:', response.status, response.statusText);
//     fs.writeFileSync("no-bg.png", response.data);
//   })
//   .catch((error) => {
//       return console.error('Request failed:', error);
//   });
// }

// request()

export default function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <button onClick={() => { window.location.pathname = '/signup' } }>회원가입</button>
      <button onClick={() => { window.location.pathname = '/login' } }>로그인</button>
      <h5>이미지</h5>
      <input type="file" />
    </div>
  );
}
