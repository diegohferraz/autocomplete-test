import { PokemonSearchResult } from './types'

export const searchPokemon = async (
  searchTerm: string
): Promise<PokemonSearchResult[]> => {
  const response = await fetch(`http://localhost:3000/pokemons?q=${searchTerm}`)
  const pokemons = await response.json()

  return pokemons
}
