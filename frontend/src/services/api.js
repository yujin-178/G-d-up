export async function fetchLogin() {
  const url = '';
  const response = await fetch(url);
  const data = await response.token;
  return data;
}
