import React, { useState, useTransition } from "react";
import TypeBadge from "./typeBange"; // Importa el componente de los badges
import NumberBadge from "./numberBadge";
import PokeName from "./pokename";

function PokemonStatsCard({ pokemon, onClose }) {
  const [isPending, startTransition] = useTransition(); // Usamos useTransition para la transición de cierre

  // Función para manejar el cierre de la tarjeta
  const handleClose = () => {
    startTransition(() => {
      onClose(); // Llamamos a onClose con el uso de startTransition para hacerlo de manera no urgente
    });
  };

  return (
    <div
      className="card shadow mb-4"
      style={{ width: "100%", maxWidth: "50rem", margin: "0 auto" }}
    >
      <div className="row g-0">
        {/* Columna izquierda con la imagen, nombre, número y tipo */}
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center p-3">
          <img
            src={pokemon.image}
            className="card-img-top"
            alt={pokemon.name}
            style={{ height: "250px", objectFit: "contain" }}
          />
  
          <NumberBadge id={pokemon.id} />
          <PokeName name={pokemon.name} />
          <div className="d-flex justify-content-center gap-2 mt-2">
            {pokemon.types.map((type, index) => (
              <TypeBadge key={index} type={type} />
            ))}
          </div>
        </div>

        {/* Columna derecha con las estadísticas */}
        <div className="col-md-8 d-flex align-items-center">
          <div className="card-body w-100">
            <h6 className="mt-4">Estadísticas</h6>
            <ul className="list-group list-group-flush">
              {pokemon.stats.map((stat, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{stat.name}</span>
                  <span>{stat.value}</span>
                </li>
              ))}
            </ul>
            <button className="btn btn-danger mt-4" onClick={handleClose}>
              Cerrar
            </button>
            {isPending && <div className="mt-2">Cerrando...</div>} {/* Mensaje de transición */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonStatsCard;
