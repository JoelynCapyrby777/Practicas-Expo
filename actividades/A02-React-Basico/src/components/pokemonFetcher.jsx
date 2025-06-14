import React, { useState, useEffect } from "react";
import axios from "axios";
import Pokecard from "./pokeCard"; // Importar el componente que renderiza los Pokémon

function PokemonFetcher() {
  const [pokemon, setPokemon] = useState([]); // Estado para almacenar los datos del Pokémon
  const [loading, setLoading] = useState(true); // Estado para manejar la carga



  useEffect(() => {
    // Función para obtener los datos de la API

    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=18"
        );
        const pokemonResults = response.data.results;

        // Obtener información detallada de cada Pokémon
        const detailedPokemon = await Promise.all(
          pokemonResults.map(async (poke) => {
            const pokeDetails = await axios.get(poke.url);
            return {
              id: pokeDetails.data.id,
              name: pokeDetails.data.name,
              image: pokeDetails.data.sprites.other["official-artwork"].front_default || "URL_IMAGEN_POR_DEFECTO",
              types: pokeDetails.data.types.map((type) => type.type.name),
              stats: pokeDetails.data.stats.map((stat) => ({
                name: stat.stat.name,
                value: stat.base_stat,
              })),
            };
          })
        );

        setPokemon(detailedPokemon); // Actualizar estado con los datos
        setLoading(false); // Marcar como cargado
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchPokemon(); // Llamar a la función
  }, []);

  return <Pokecard pokemon={pokemon} loading={loading} />; // Pasar los datos al componente de tarjeta
}

export default PokemonFetcher;
