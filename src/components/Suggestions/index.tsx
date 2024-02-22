import { PokemonSearchResult } from 'services/types'
import SuggestionItem from './SuggestionItem'

type SuggestionsProps = {
  searchTerm: string
  suggestions: PokemonSearchResult[]
  onSelectOption: (selectedOption: string) => void
}

const Suggestions = ({
  searchTerm,
  suggestions,
  onSelectOption
}: SuggestionsProps) => (
  <ul className="absolute mt-4 max-h-[50vh] w-full overflow-auto">
    {suggestions.map((suggestion) => (
      <SuggestionItem
        key={suggestion.name}
        text={suggestion.name}
        searchTerm={searchTerm}
        onSelectOption={onSelectOption}
      />
    ))}
  </ul>
)

export default Suggestions
