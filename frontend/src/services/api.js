import axios from 'axios';
import html2canvas from 'html2canvas';

export async function fetchLogin() {
  const url = '';
  const response = await fetch(url);
  const data = await response.token;
  return data;
}

export async function loadClothesByUserName(userName) {
  const res = await axios({
    method: 'get',
    url: `http://i6b108.p.ssafy.io:8000/clothing/list/${userName}`,
  });

  return res.data.data;
}

export async function createFile(element) {
  const canvas = await html2canvas(element);
  const data = canvas.toDataURL("image/jpg");
  const response = await axios.get(data, { responseType: "blob" });
  const blob = response.data;
  return new File([blob], "filename.jpeg");
}

export async function loadCodyByUserName(userName) {
  const res = await axios.get(`http://i6b108.p.ssafy.io:8000/cody/read/${userName}`);
  return res.data;
}
