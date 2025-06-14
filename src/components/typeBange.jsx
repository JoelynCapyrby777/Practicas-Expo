import React from 'react';

// Función para obtener el color según el tipo
function getTypeColor(type) {
    const typeColors = {
    grass: "#78C850",
    fire: "#F08030",
    water: "#6890F0",
    bug: "#A8B820",
    normal: "#A8A878",
    poison: "#A040A0",
    electric: "#F8D030",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#F85888",
    rock: "#B8A038",
    ghost: "#705898",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    flying: "#A890F0",
  };
  return typeColors[type] || "#68A090"; // Color por defecto
}

const TypeBadge = ({ type }) => {
  const backgroundColor = getTypeColor(type); // Obtener el color basado en el tipo

  return (
    <span style={{ backgroundColor: getTypeColor(type) }}  className="badge text-white">
        

      {type}
    </span>
  );
};

export default TypeBadge;
