import { render } from '@testing-library/react'

import HighlightedName from './index'

describe('<HighlightedName >', () => {
  it('should render just text if no search term is provided', () => {
    const { container } = render(<HighlightedName text="Deel" searchTerm="" />)

    expect(container.textContent).toBe('Deel')
  })

  it('should render search term highlighted in a b tag', () => {
    const { container } = render(
      <HighlightedName text="Deel" searchTerm="De" />
    )
    const highlightedText = container.querySelector('b')

    expect(highlightedText).toBeInTheDocument()
    expect(highlightedText?.textContent).toBe('De')
  })

  it('should render multiple occurrences of highlighted searchTerm', () => {
    const { container } = render(
      <HighlightedName text="Work at Deel, Deel Test, Deel" searchTerm="Deel" />
    )
    const highlightedTexts = container.querySelectorAll('b')

    expect(highlightedTexts.length).toBe(3)
  })

  it('should not renders text with highlighting if searchTerm is not found', () => {
    const { container } = render(
      <HighlightedName text="Foo Bar" searchTerm="Deel" />
    )
    expect(container.textContent).toBe('Foo Bar')
  })
})
