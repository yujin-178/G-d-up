export async function fetchLogin() {
  const url = '';
  const response = await fetch(url);
  const data = await response.token;
  return data;
}

export async function loadClothesByUserName(userName) {
  const url = `http://i6b108.p.ssafy.io:8000/clothing/list/${userName}`;
  const response = await fetch(url);
  const data = await response.data.data;
  return data;
}
