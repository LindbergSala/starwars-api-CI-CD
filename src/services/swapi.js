export async function searchPeople(query) {
  const res = await fetch(`https://swapi.dev/api/people/?search=${query}`);
  const data = await res.json();
  return data.results;
}

export async function searchPlanets(query) {
  const res = await fetch(`https://swapi.dev/api/planets/?search=${query}`);
  const data = await res.json();
  return data.results;
}
