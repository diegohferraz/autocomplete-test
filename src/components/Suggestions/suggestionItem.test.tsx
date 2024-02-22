import { render } from '@testing-library/react'
import SuggestionItem from './SuggestionItem'

describe('<SuggestionItem />', () => {
  it('shuold render suggestion with highlighted text', () => {
    const { getByText } = render(<SuggestionItem text="Deel" searchTerm="De" />)

    const highlightedText = getByText('De')
    expect(highlightedText.tagName).toBe('B')
  })

  it('should render suggestion item without highlighted text when searchTerm is empty', () => {
    const { getByText } = render(<SuggestionItem text="Deel" searchTerm="" />)

    expect(getByText('Deel')).toBeInTheDocument()
    expect(getByText('Deel').tagName).not.toBe('B')
  })
})
