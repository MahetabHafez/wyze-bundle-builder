import VariantSelector from './VariantSelector'
import QuantityStepper from './QuantityStepper'
import { NO_VARIANT, formatCurrency } from '../lib/selections'

export default function ProductCard({
  product,
  quantity,
  activeVariantId,
  onVariantSelect,
  onQuantityChange,
  centered = false,
}) {
  const hasVariants = product.variants.length > 0
  const isSelected = quantity > 0
  const activeVariant = hasVariants
    ? product.variants.find((v) => v.id === activeVariantId) || product.variants[0]
    : null

  const currentImage = activeVariant?.image || product.image

  return (
    <div
      className={`product-card${isSelected ? ' product-card--selected' : ''}${
        centered ? ' product-card--centered' : ''
      }`}
    >
      {product.badge && <span className="product-card__badge">{product.badge}</span>}

      <div className="product-card__image-wrap" style={{ marginTop: '20px' }}>
        <img className="product-card__image" src={currentImage} alt={product.name} loading="lazy" />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <a className="product-card__link" href={product.learnMoreUrl} onClick={(e) => e.preventDefault()}>
          Learn more
        </a>

        {hasVariants && (
          <VariantSelector
            variants={product.variants}
            activeVariantId={activeVariant?.id}
            onSelect={(variantId) => onVariantSelect(product.id, variantId)}
          />
        )}

        <div className="product-card__footer">
          <div>
            <QuantityStepper
              quantity={quantity}
              max={product.maxQuantity ?? 10}
              disabled={Boolean(product.locked)}
              label={`${product.name} quantity`}
              onChange={(nextQty) =>
                onQuantityChange(product.id, hasVariants ? activeVariant.id : NO_VARIANT, nextQty)
              }
            />
            {product.locked && <span className="product-card__required">Included free</span>}
          </div>

          <div className="product-card__pricing">
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="price price--compare">{formatCurrency(product.compareAtPrice)}</span>
            )}
            <span className="price price--active">
              {formatCurrency(product.price)}
              {product.unit && <span className="price__unit">{product.unit}</span>}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}