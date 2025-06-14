import React, { useState, useEffect } from "react";
import TypeBadge from "./typeBange"; // Importa el componente de los badges
import PokemonStatsCard from "./pokeAlert"; // Importar el componente para las estadísticas
import NumberBadge from "./numberBadge";
import PokeName from "./pokename";

function Pokecard({ pokemon, loading }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para el Pokémon seleccionado

  // Leer del localStorage al cargar el componente
  useEffect(() => {
    const savedPokemon = localStorage.getItem("selectedPokemon");
    if (savedPokemon) {
      setSelectedPokemon(JSON.parse(savedPokemon));
    }
  }, []);

  // Función para manejar la selección del Pokémon
  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon); // Actualiza el estado
    localStorage.setItem("selectedPokemon", JSON.stringify(pokemon)); // Guarda en localStorage
  };

  // Función para cerrar el panel y limpiar el localStorage
  const handleClose = () => {
    setSelectedPokemon(null);
    localStorage.removeItem("selectedPokemon"); // Eliminar de localStorage
  };

  if (loading) {
    return <div className="text-center mt-5">Cargando Pokémon...</div>;
  }

  return (
    <div className="container mt-5" style={{ paddingBottom: "50px" }}>
      <h1 className="text-center mb-4">Pokédex</h1>

      {/* Panel destacado para mostrar las estadísticas del Pokémon seleccionado */}
      {selectedPokemon && (
        <div className="mb-4">
          <PokemonStatsCard pokemon={selectedPokemon} onClose={handleClose} />
        </div>
      )}

      {/* Lista de Pokémon */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {pokemon.map((pokemon) => (
          <div className="col" key={pokemon.id}>
            <div className="card pokecard h-100 shadow">
              <img
                src={pokemon.image}
                className="card-img-top mx-auto d-block mt-3"
                alt={pokemon.name}
                style={{ width: "120px", height: "120px" }}
              />
              <div className="card-body text-center">
                <NumberBadge id={pokemon.id} />
                <PokeName name={pokemon.name} />
                <div className="d-flex justify-content-center gap-2">
                  {pokemon.types.map((type, index) => (
                    <TypeBadge key={index} type={type} />
                  ))}
                </div>
                <button
                  className="btn btn-outline-secondary btn-sm mt-3"
                  onClick={() => handleSelectPokemon(pokemon)} // Seleccionar el Pokémon
                >
                  Ver más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokecard;
