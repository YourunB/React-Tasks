export async function getCharactersPageApi(page: number, count: number) {
  let result;
  await fetch(`https://api.disneyapi.dev/character?page=${page}&pageSize=${count}`)
  .then((response) => result = response.json())
  .catch((err) => console.log('Sorry, something went wrong:', err));
  return result;
}

export async function searchCharactersApi(search: string, count: number) {
  let result;
  await fetch(`https://api.disneyapi.dev/character?name=${search}&pageSize=${count}`)
  .then((response) => result = response.json())
  .catch((err) => console.log('Sorry, something went wrong:', err));
  return result;
}