import { PokemonSearchResult } from 'services/types'
import SuggestionItem from './SuggestionItem'

type SuggestionsProps = {
  searchTerm: string
  suggestions: PokemonSearchResult[]
}

const Suggestions = ({ searchTerm, suggestions }: SuggestionsProps) => (
  <ul className="absolute mt-4 max-h-[50vh] w-full overflow-auto">
    {suggestions.map((suggestion) => (
      <SuggestionItem
        key={suggestion.name}
        text={suggestion.name}
        searchTerm={searchTerm}
      />
    ))}
  </ul>
)

export default Suggestions
