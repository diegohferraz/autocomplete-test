import { vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useDebounce } from './useDebounce'

vi.useFakeTimers()

describe('useDebounce()', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initialValue', 500))

    expect(result.current).toBe('initialValue')
  })

  it('should update the debounced value after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: '', delay: 500 }
      }
    )

    act(() => {
      rerender({ value: 'Pikachu', delay: 500 })
      vi.advanceTimersByTime(250)
    })

    expect(result.current).toBe('')

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('Pikachu')
  })
})
