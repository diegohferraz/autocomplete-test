import { useEffect, useState } from 'react'

import Autocomplete from './Autocomplete'

import { useDebounce } from 'hooks/useDebounce'
import { searchPokemon } from 'services/search.service'
import { PokemonSearchResult } from 'services/types'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState<PokemonSearchResult[] | null>(
    null
  )
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    const getPokemons = async () => {
      setIsSearching(true)
      try {
        const pokemons = await searchPokemon(debouncedSearchTerm)
        setSuggestions(pokemons)
      } catch (error) {
        console.error('Error trying to get pokemons', error)
      } finally {
        setIsSearching(false)
      }
    }

    if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
      setSuggestions(null)
      return
    }

    getPokemons()
  }, [debouncedSearchTerm])

  const handleClearInput = () => {
    setSearchTerm('')
    setSuggestions(null)
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto max-w-5xl">
        <header>
          <h1 className="mb-2 text-6xl text-deelBlue">
            The best performing Pokémon finder.
          </h1>
          <p className="text-lg text-slate-800">
            Type the pokemon name in the input below to search for a pokemon.
          </p>
        </header>
        <Autocomplete
          searchTerm={searchTerm}
          suggestions={suggestions}
          isSearching={isSearching}
          onChange={(newTerm) => setSearchTerm(newTerm)}
          onClear={handleClearInput}
        />
      </div>
    </main>
  )
}

export default App
