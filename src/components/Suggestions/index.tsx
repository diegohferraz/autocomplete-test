import SuggestionItem from './SuggestionItem'

const Suggestions = () => (
  <ul className="absolute mt-4 w-full">
    <SuggestionItem text="Bulbasaur" searchTerm="" />
    <SuggestionItem text="Bulbasaur" searchTerm="bulba" />
    <SuggestionItem text="Bulbasaur" searchTerm="saur" />
    <SuggestionItem text="Bulbasaur" searchTerm="bas" />
  </ul>
)

export default Suggestions
