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
  return res.data.data;
}

export async function postCody(payload) {
  const { file, codyItems, content, isNotSecret, tags, userName } = payload;

  const fd = new FormData();
  fd.append('imageFile', file);

  const itemsIncody = codyItems.map(item => {
    const { clothingId, position, size } = item;
    return {
      clothingId,
      x: position.x,
      y: position.y,
      z: position.z,
      m: size.m,
    };
  });

  const data = {
    codyName: 'name',
    secret: isNotSecret ? 0 : 1,
    clothingList: itemsIncody,
    codyTag: tags.join(),
    userName,
    content
  };

  fd.append('createCody', new Blob([JSON.stringify(data)], { type: 'application/json' }));

  const config = {
    Headers: { 'Content-Type': 'multipart/form-data' },
  };

  const response = await axios.post('http://i6b108.p.ssafy.io:8000/cody/create', fd, config);
  return response;
}

export async function signIn(data) {
  const response = await axios.post(`http://i6b108.p.ssafy.io:8000/user/signup`, data);
  return response.data;
}

export async function authLogin(data) {
  const response = await axios.post(`http://i6b108.p.ssafy.io:8000/user/login`, data);
  return response.data;
}

export async function loadUsersToFollow(userName) {
  const response = await axios.get(`http://i6b108.p.ssafy.io:8000/user/find/follow/${userName}`);
  return response.data.data;
}

export async function loadFollowers(userName) {
  const response = await axios.get(`http://i6b108.p.ssafy.io:8000/user/find/follower/${userName}`);
  return response.data.data;
}

export async function loadFollowings(userName) {
  const response = await axios.get(`http://i6b108.p.ssafy.io:8000/user/find/following/${userName}`);
  return response.data.data;
}
