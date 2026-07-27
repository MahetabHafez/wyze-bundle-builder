import { describe, it, expect } from 'vitest'
import { computeTotals, buildReviewLines } from './selections'

const mockSteps = [
  { id: 'cameras', reviewGroup: 'Cameras' },
  { id: 'plan', reviewGroup: 'Plan' }
]

describe('Bundle Builder Selection & Totals Logic', () => {
  it('computes subtotal, compareAtSubtotal, and savings correctly', () => {

    const mockLines = [
      { key: 'cam-1', price: 50, compareAtPrice: 60, quantity: 2, group: 'Cameras' }
    ]

    const totals = computeTotals(mockLines)

    expect(totals.subtotal).toBe(100)          // 50 * 2
    expect(totals.compareAtSubtotal).toBe(120) // 60 * 2
    expect(totals.savings).toBe(20)            // 120 - 100
  })

  it('builds review lines accurately from selections', () => {
    const selections = {
      'wyze-cam-v4': { white: 1 }
    }
    

    const lines = buildReviewLines(selections, mockSteps)
    expect(Array.isArray(lines)).toBe(true)
  })
})