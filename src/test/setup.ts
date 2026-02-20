import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock React environment for testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock React hooks for testing environment
vi.mock('react', async () => {
  const actual = await vi.importActual<typeof React>('react')
  return {
    ...actual,
    useMemo: vi.fn((fn) => fn()),
    useCallback: vi.fn((fn) => fn),
  }
})
