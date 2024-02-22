import HighlightedName from 'components/HighlightedName'

type SuggestionItemProps = {
  text: string
  searchTerm: string
}

const SuggestionItem = ({ text, searchTerm }: SuggestionItemProps) => (
  <li>
    <button className="w-full px-10 py-4 text-left capitalize text-slate-500 hover:bg-slate-200">
      <HighlightedName text={text} searchTerm={searchTerm} />
    </button>
  </li>
)

export default SuggestionItem
