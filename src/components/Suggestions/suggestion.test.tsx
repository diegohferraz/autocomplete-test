import { render, screen } from '@testing-library/react'
import Suggestions from './index'

describe('<Suggestions />', () => {
  it('should render suggestion list', async () => {
    const suggestions = [
      { name: 'Pikachu' },
      { name: 'Charmander' },
      { name: 'Bulbasaur' }
    ]

    render(<Suggestions searchTerm="" suggestions={suggestions} />)

    expect(screen.getAllByRole('button').length).toBe(suggestions.length)
    for (const suggestion of suggestions) {
      expect(screen.getByText(suggestion.name)).toBeTruthy()
    }
  })
})
