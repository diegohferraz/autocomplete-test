type HighlightedNameProps = {
  text: string
  searchTerm: string
}

const HighlightedName = ({ text, searchTerm }: HighlightedNameProps) => {
  if (!searchTerm) return text

  const regex = new RegExp(`(${searchTerm.trim()})`, 'gi')
  const splitedText = text.split(regex)

  return splitedText.map((part, idx) =>
    regex.test(part) ? (
      <b className="text-slate-900" key={idx}>
        {part}
      </b>
    ) : (
      part
    )
  )
}

export default HighlightedName
