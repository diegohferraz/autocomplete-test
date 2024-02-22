import { vi } from 'vitest'
import { render, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

const MOCK_SUGGESTION = [{ name: 'Pikachu' }, { name: 'Charmander' }]

vi.mock('hooks/useDebounce', () => ({
  useDebounce: (value: string) => value
}))

vi.mock('services/search.service', () => ({
  searchPokemon: vi
    .fn()
    .mockResolvedValue([{ name: 'Pikachu' }, { name: 'Charmander' }])
}))

describe('<App />', () => {
  it('should render App', async () => {
    const { getByText, getByPlaceholderText } = render(<App />)

    expect(getByText('The best performing Pokémon finder.')).toBeInTheDocument()
    expect(
      getByText(
        'Type the pokemon name in the input below to search for a pokemon.'
      )
    ).toBeInTheDocument()
    const inputElement = getByPlaceholderText('Search for a pokemon')
    expect(inputElement).toBeInTheDocument()
  })

  it('should search for Pokemon when user types in the input', async () => {
    const { getByPlaceholderText, getByTitle, getByText } = render(<App />)

    const inputElement = getByPlaceholderText('Search for a pokemon')
    fireEvent.input(inputElement, { target: { value: 'Pikachu' } })

    await waitFor(() => {
      expect(document.querySelectorAll('li')).toHaveLength(2)
      expect(getByTitle('Clear search')).toBeInTheDocument()
      expect(getByText(MOCK_SUGGESTION[0].name)).toBeInTheDocument()
      expect(getByText(MOCK_SUGGESTION[1].name)).toBeInTheDocument()
    })
  })

  it('should clear suggestions and input when user clicks clear button', async () => {
    const { getByPlaceholderText, getByTitle } = render(<App />)

    const inputElement = getByPlaceholderText('Search for a pokemon')
    fireEvent.input(inputElement, { target: { value: 'Pikachu' } })

    await waitFor(() => {
      expect(document.querySelectorAll('li')).toHaveLength(2)
    })

    const clearButton = getByTitle('Clear search')
    fireEvent.click(clearButton)

    await waitFor(() => {
      expect(inputElement).toHaveValue('')
      expect(document.querySelectorAll('li')).toHaveLength(0)
    })
  })
})
