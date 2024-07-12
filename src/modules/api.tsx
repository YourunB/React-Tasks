const url = 'https://api.disneyapi.dev/character';

export async function getCharactersPageApi(page: number, count: number) {
  let result;
  await fetch(`${url}?page=${page}&pageSize=${count}`)
    .then((response) => (result = response.json()))
    .catch((err) => console.log('Sorry, something went wrong:', err));
  return result;
}

export async function searchCharactersApi(search: string, page: number, count: number) {
  let result;
  await fetch(`${url}?name=${search}&pageSize=${count}&page=${page}`)
    .then((response) => (result = response.json()))
    .catch((err) => console.log('Sorry, something went wrong:', err));
  return result;
}
