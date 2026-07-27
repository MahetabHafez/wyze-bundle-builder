import { MinusIcon, PlusIcon } from './Icons'

export default function QuantityStepper({ quantity, onChange, max = 10, min = 0, size = 'md', label, disabled = false }) {
  const canDecrement = !disabled && quantity > min
  const canIncrement = !disabled && quantity < max

  return (
    <div className={`stepper stepper--${size}`} role="group" aria-label={label || 'Quantity'}>
      <button
        type="button"
        className="stepper__btn"
        onClick={() => canDecrement && onChange(quantity - 1)}
        disabled={!canDecrement}
        aria-label="Decrease quantity"
      >
        <MinusIcon />
      </button>
      <span className="stepper__value" aria-live="polite">{quantity}</span>
      <button
        type="button"
        className="stepper__btn"
        onClick={() => canIncrement && onChange(quantity + 1)}
        disabled={!canIncrement}
        aria-label="Increase quantity"
      >
        <PlusIcon />
      </button>
    </div>
  )
}
