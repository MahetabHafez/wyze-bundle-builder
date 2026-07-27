import { catalog } from '../lib/catalog'
import { STEP_ICONS, ChevronIcon } from './Icons'
import ProductCard from './ProductCard'
import { NO_VARIANT } from '../lib/selections'

export default function StepSection({
  step,
  nextStep,
  isOpen,
  onToggle,
  onAdvance,
  selectedCount,
  selections,
  activeVariants,
  onVariantSelect,
  onQuantityChange,
}) {
  const StepIcon = STEP_ICONS[step.icon]
  const products = catalog.PRODUCTS[step.id]
  const isOddCount = products.length % 2 === 1

  return (
    <section className={`step${isOpen ? ' step--open' : ''}`}>
      <button
        type="button"
        className="step__header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`step-panel-${step.id}`}
      >
        <span className="step__header-left">
          <span className="step__icon"><StepIcon /></span>
          <span className="step__heading">
            <span className="step__eyebrow">STEP {step.stepNumber} OF 4</span>
            <span className="step__title">{step.title}</span>
          </span>
        </span>
        <span className="step__state">
          {isOpen && <span className="step__count">{selectedCount} selected</span>}
          <ChevronIcon direction={isOpen ? 'up' : 'down'} />
        </span>
      </button>

      {/* Always mounted so the height can animate; grid-template-rows
          0fr -> 1fr is what produces the smooth open/close. */}
      <div className={`step__panel-wrap${isOpen ? ' step__panel-wrap--open' : ''}`}>
        <div className="step__panel-inner">
          <div className="step__panel" id={`step-panel-${step.id}`}>
            <div className="step__grid">
              {products.map((product, index) => {
                const variantMap = selections[product.id] || {}
                const activeVariantId =
                  (product.variants.length && activeVariants[product.id]) ||
                  product.variants[0]?.id ||
                  NO_VARIANT
                const quantity = variantMap[product.variants.length ? activeVariantId : NO_VARIANT] ?? 0
                const isLastOdd = isOddCount && index === products.length - 1

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    activeVariantId={activeVariantId}
                    onVariantSelect={onVariantSelect}
                    onQuantityChange={onQuantityChange}
                    centered={isLastOdd}
                  />
                )
              })}
            </div>

            {nextStep && (
              <button type="button" className="step__next" onClick={onAdvance}>
                Next: {nextStep.title}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
