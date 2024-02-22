import { useEffect, useRef } from 'react'
import { FiLoader, FiSearch, FiX } from 'react-icons/fi'

import { PokemonSearchResult } from 'services/types'

import Suggestions from 'components/Suggestions'

type AutocompleteProps = {
  searchTerm: string
  suggestions: PokemonSearchResult[] | null
  isSearching: boolean
  onChange: (newTerm: string) => void
  onSelectOption: (selectedOption: string) => void
  onClear: () => void
}

const Autocomplete = ({
  searchTerm,
  suggestions,
  isSearching,
  onChange,
  onSelectOption,
  onClear
}: AutocompleteProps) => {
  const iptRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    iptRef.current?.focus()
  }, [])

  return (
    <div className="relative">
      <div className="relative mt-8 flex items-center justify-between">
        <FiSearch className="size-10 stroke-slate-400" />
        <input
          ref={iptRef}
          maxLength={20}
          value={searchTerm}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for a pokemon"
          className="absolute z-10 w-full bg-transparent px-12 text-5xl text-slate-800 caret-slate-700 outline-none placeholder:text-slate-400 placeholder:text-opacity-15"
        />
        {searchTerm.length > 0 && !isSearching && (
          <button
            onClick={onClear}
            className="group relative z-20"
            title="Clear search"
          >
            <FiX className="size-10 stroke-slate-600 transition-colors group-hover:stroke-slate-900" />
          </button>
        )}
        {isSearching && (
          <FiLoader
            role="progressbar"
            className="size-10 animate-spin stroke-slate-300"
          />
        )}
      </div>
      {searchTerm.length == 1 && (
        <span className="mt-4 inline-block text-sm text-slate-700">
          Type at least 2 characteres.
        </span>
      )}
      {searchTerm.length > 2 && suggestions?.length === 0 && (
        <span className="mt-4 inline-block text-sm text-yellow-700">
          No Pokemon were found with the name <b>{searchTerm}</b>
        </span>
      )}
      {suggestions && searchTerm.length >= 2 && (
        <Suggestions
          searchTerm={searchTerm}
          suggestions={suggestions}
          onSelectOption={onSelectOption}
        />
      )}
    </div>
  )
}
export default Autocomplete
