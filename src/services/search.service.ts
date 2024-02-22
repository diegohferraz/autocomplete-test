import { PokemonSearchResult } from './types'

const API_URL = import.meta.env.VITE_API_BASE_URL

export const searchPokemon = async (
  searchTerm: string
): Promise<PokemonSearchResult[]> => {
  const response = await fetch(`${API_URL}/pokemons?q=${searchTerm.trim()}`)
  const pokemons = await response.json()

  return pokemons
}
