import { useEffect, useRef, useState } from 'react'

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

  const isOptionSelection = useRef(false)

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

    if (isOptionSelection.current) {
      isOptionSelection.current = false
      return
    }
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
      setSuggestions(null)
      return
    }

    getPokemons()
  }, [debouncedSearchTerm])

  const handleSearchChange = (newTerm: string) => {
    //TODO: Improve to maybe use regex, time is short for the home task.
    if (
      newTerm[newTerm.length - 1] === ' ' &&
      newTerm[newTerm.length - 2] === ' '
    ) {
      return
    } else {
      setSearchTerm(newTerm)
    }
  }

  const handleClearInput = () => {
    setSearchTerm('')
    setSuggestions(null)
  }

  const handleSelectOption = (option: string) => {
    isOptionSelection.current = true
    setSearchTerm(option)
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
          onChange={handleSearchChange}
          onClear={handleClearInput}
          onSelectOption={handleSelectOption}
        />
      </div>
    </main>
  )
}

export default App
