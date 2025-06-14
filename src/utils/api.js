export async function fetchFn(endpoint) {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return response.json();
  }
  
  export async function fetchAllPokemon({ pageParam } = {}) {
    const response = await fetch(
      pageParam || 'https://pokeapi.co/api/v2/pokemon/'
    );
    if (!response.ok) {
      throw new Error('Error fetching Pokémon list');
    }
    return response.json();
  }
  