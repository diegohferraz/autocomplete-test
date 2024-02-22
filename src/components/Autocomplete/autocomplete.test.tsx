import { vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import Autocomplete from './index'

describe('<Autocomplete />', () => {
  it('should render Autocomplete empty with a placeholder', () => {
    const { getByPlaceholderText } = render(
      <Autocomplete
        searchTerm=""
        suggestions={null}
        isSearching={false}
        onChange={() => {}}
        onClear={() => {}}
      />
    )

    const inputElement = getByPlaceholderText('Search for a pokemon')

    expect(inputElement).toBeInTheDocument()
  })

  it('should render Autocomplete with searchTerm', () => {
    const { getByDisplayValue } = render(
      <Autocomplete
        searchTerm="Pikachu"
        suggestions={null}
        isSearching={false}
        onChange={() => {}}
        onClear={() => {}}
      />
    )

    const inputElement = getByDisplayValue('Pikachu')

    expect(inputElement).toBeInTheDocument()
  })

  it('should render loading state', () => {
    const { getByRole } = render(
      <Autocomplete
        searchTerm=""
        suggestions={null}
        isSearching={true}
        onChange={() => {}}
        onClear={() => {}}
      />
    )

    const loaderElement = getByRole('progressbar')

    expect(loaderElement).toBeInTheDocument()
  })

  it('should call onChange handler when input text changes', () => {
    const handleChange = vi.fn()
    const { getByPlaceholderText } = render(
      <Autocomplete
        searchTerm=""
        suggestions={null}
        isSearching={false}
        onChange={handleChange}
        onClear={() => {}}
      />
    )

    const inputElement = getByPlaceholderText('Search for a pokemon')
    fireEvent.input(inputElement, { target: { value: 'Pikachu' } })

    expect(handleChange).toHaveBeenCalledWith('Pikachu')
  })

  it('should call onClear handler when clear button clicked', () => {
    const handleClear = vi.fn()
    const { getByRole } = render(
      <Autocomplete
        searchTerm="Pikachu"
        suggestions={null}
        isSearching={false}
        onChange={() => {}}
        onClear={handleClear}
      />
    )

    const btnElement = getByRole('button')
    fireEvent.click(btnElement)
    expect(handleClear).toHaveBeenCalledOnce()
  })
})
