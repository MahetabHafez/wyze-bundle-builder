export default function VariantSelector({ variants, activeVariantId, onSelect }) {
  if (!variants.length) return null

  return (
    <div className="variant-selector" role="radiogroup" aria-label="Color">
      {variants.map((variant) => {
        const isActive = variant.id === activeVariantId
        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`variant-chip${isActive ? ' variant-chip--active' : ''}`}
            onClick={() => onSelect(variant.id)}
          >
            <img className="variant-chip__swatch" src={variant.image} alt={variant.name} />
            <span className="variant-chip__label">{variant.name}</span>
          </button>
        )
      })}
    </div>
  )
}