import React from "react"
import PokemonFetcher from "../components/pokemonFetcher"
import PokeAlert from "../components/pokeAlert"

function PokeVista(){
    return(
        <>
        <div className="container mt-5">
            <PokemonFetcher />
        </div>

        </>
        
    )
}

export default PokeVista