import HighlightedName from 'components/HighlightedName'

type SuggestionItemProps = {
  text: string
  searchTerm: string
  onSelectOption: (selectedOption: string) => void
}

const SuggestionItem = ({
  text,
  searchTerm,
  onSelectOption
}: SuggestionItemProps) => (
  <li>
    <button
      onClick={() => onSelectOption(text)}
      className="w-full px-10 py-4 text-left capitalize text-slate-500 hover:bg-slate-200"
    >
      <HighlightedName text={text} searchTerm={searchTerm} />
    </button>
  </li>
)

export default SuggestionItem
