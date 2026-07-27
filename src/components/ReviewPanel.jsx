import { useMemo, useState } from 'react'
import QuantityStepper from './QuantityStepper'
import { TruckIcon, SealBadge, STEP_ICONS } from './Icons'
import {
  buildReviewLines,
  computeTotals,
  formatCurrency,
  findProduct,
  NO_VARIANT,
} from '../lib/selections'
import { SHIPPING, GUARANTEE, FINANCING, STEPS, PRODUCTS } from '../data/products'

const GROUP_ICON = Object.fromEntries(STEPS.map((s) => [s.reviewGroup, STEP_ICONS[s.icon]]))
const REVIEW_GROUP_ORDER = ['Cameras', 'Sensors', 'Accessories', 'Plan']

function getLineImage(line) {
  if (line.group === 'Plan') return '/images/cam unlimited.png' 
  
  const allProducts = [...PRODUCTS.cameras, ...PRODUCTS.plan, ...PRODUCTS.sensors, ...PRODUCTS.accessories]
  const product = allProducts.find((p) => p.id === line.productId)
  
  if (!product) return null

  if (line.variantId && product.variants) {
    const variant = product.variants.find((v) => v.id === line.variantId)
    if (variant && variant.image) return variant.image
  }

  return product.image
}

function WyzeShieldIcon(props) {
  return (
    <svg viewBox="-3 -2 50 50" width="36" height="36" fill="none" {...props}>
      <path 
         d="M22 3.3 C22 3.3 35.8 5.58 38.56 9.42 C38.56 19.8 33.76 30.18 22 40.54 C10.24 30.18 5.44 19.8 5.44 9.42 C8.2 5.58 22 3.3 22 3.3 Z"
          stroke="#004FE4" 
          strokeWidth="1" 
          strokeLinejoin="round" 
      />
      <g fill="#004FE4" transform="translate(1, 1)">
        <path d="M10 15 L12 21 L13.5 18 L15 21 L17 15 L15.7 15 L14.5 19 L13.5 16.5 L12.5 19 L11.3 15 Z" />
        <path d="M18 15 L20 18 L22 15 L23.3 15 L20.8 18.3 L20.8 21 L19.2 21 L19.2 18.3 L16.7 15 Z" />
        <path d="M24 15 L28.2 15 L28.2 16.2 L25.5 19.8 L28.2 19.8 L28.2 21 L24 21 L24 19.8 L26.7 16.2 L24 16.2 Z" />
        <rect x="29.2" y="15" width="3.8" height="1.3" />
        <rect x="29.2" y="17.4" width="3.2" height="1.3" />
        <rect x="29.2" y="19.7" width="3.8" height="1.3" />
      </g>
    </svg>
  )
}

function LineName({ line }) {
  if (line.group === 'Plan') {
    return (
      <span className="review-line__name" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1' }}>
          <WyzeShieldIcon />
        </span>
        <span style={{ fontSize: '14.5px', fontWeight: '600' }}>
          <span style={{ color: '#111827' }}>Cam</span> <span style={{ color: '#004FE4' }}>Unlimited</span>
        </span>
      </span>
    )
  }
  return (
    <span className="review-line__name">
      {line.name}
      {line.variantName ? ` — ${line.variantName}` : ''}
    </span>
  )
}

export default function ReviewPanel({ selections, onQuantityChange, onSave }) {
  const [saveStatus, setSaveStatus] = useState('idle')
  const [checkoutMsg, setCheckoutMsg] = useState(false)

  const lines = useMemo(() => buildReviewLines(selections, STEPS), [selections])
  const { subtotal, compareAtSubtotal, savings } = useMemo(() => computeTotals(lines), [lines])

  const groups = useMemo(() => {
    const byGroup = {}
    for (const line of lines) {
      byGroup[line.group] = byGroup[line.group] || []
      byGroup[line.group].push(line)
    }
    return REVIEW_GROUP_ORDER.filter((g) => byGroup[g]?.length).map((g) => ({ name: g, lines: byGroup[g] }))
  }, [lines])

  function handleSave() {
    onSave()
    setSaveStatus('saved')
    window.setTimeout(() => setSaveStatus('idle'), 2200)
  }

  function handleCheckoutClick() {
    setCheckoutMsg(true)
    window.setTimeout(() => setCheckoutMsg(false), 3000)
  }

  return (
    <aside className="review" aria-label="Your security system">
      <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', color: '#6b7280', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>
        Review
      </span>

      <h2 className="review__title">Your security system</h2>
      <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>Review your personalized protection system designed to keep what matters most safe.</p>

      {lines.length === 0 && (
        <p className="review__empty">Add products from the builder to see them here.</p>
      )}

      <div className="review__groups">
        {groups.map((group) => {
          const isPlan = group.name === 'Plan'
          return (
            <div 
              className="review__group" 
              key={group.name}
              style={{
                borderBottom: isPlan ? 'none' : '1px solid #e5e7eb',
                paddingBottom: isPlan ? '0' : '12px',
                marginBottom: isPlan ? '0' : '12px'
              }}
            >
              <h3 className="review__group-title">{group.name}</h3>
              {group.lines.map((line, lineIndex) => {
                const product = findProduct(line.productId)
                const hasDiscount = line.compareAtPrice && line.compareAtPrice > line.price
                const lineImage = getLineImage(line)
                const isNotLastLine = lineIndex < group.lines.length - 1

                return (
                  <div 
                    className="review-line" 
                    key={line.key} 
                    style={{ 
                      padding: '8px 0', 
                      borderBottom: isNotLastLine ? '1px solid #f0f2f5' : 'none' 
                    }}
                  >
                    {group.name !== 'Plan' && (
                      <span className="review-line__icon-tile" style={{ padding: '2px', background: '#fff', border: '1px solid #e5e7eb' }}>
                        {lineImage ? (
                          <img src={lineImage} alt={line.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : null}
                      </span>
                    )}
                    <div className="review-line__info" style={{ width: group.name === 'Plan' ? '100%' : 'auto' }}>
                      <LineName line={line} />
                    </div>
                    {group.name !== 'Plan' && (
                      <QuantityStepper
                        size="sm"
                        quantity={line.quantity}
                        max={product?.maxQuantity ?? 10}
                        disabled={Boolean(product?.locked)}
                        label={`${line.name} quantity`}
                        onChange={(nextQty) =>
                          onQuantityChange(line.productId, line.variantId ?? NO_VARIANT, nextQty)
                        }
                      />
                    )}
                    <div className="review-line__price-stack">
                      {hasDiscount && (
                        <span className="price price--compare">{formatCurrency(line.compareAtPrice)}</span>
                      )}
                      <span className="price price--active">
                        {line.price === 0 ? 'FREE' : formatCurrency(line.price)}
                        {line.unit && <span className="price__unit">{line.unit}</span>}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Fast Shipping مع خط فاصل من فوق وخط من تحت */}
      <div className="review__perk" style={{ borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '12px 0', marginBottom: '16px', marginTop: '0' }}>
        <span className="review__perk-tile"><TruckIcon /></span>
        <div className="review-line__info">
          <span className="review__perk-label">{SHIPPING.label}</span>
        </div>
        <div className="review-line__price-stack">
          <span className="price price--compare">{formatCurrency(SHIPPING.compareAtPrice)}</span>
          <span className="price price--free">FREE</span>
        </div>
      </div>

      <div className="review__guarantee" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
        <SealBadge />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ background: '#004FE4', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '4px', marginBottom: '6px' }}>
            {FINANCING.label}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            {compareAtSubtotal > subtotal && (
              <span style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '15px' }}>
                {formatCurrency(compareAtSubtotal)}
              </span>
            )}
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#004FE4' }}>
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>
      </div>

      {savings > 0 && (
        <div className="review__savings" style={{ marginTop: '12px', textAlign: 'center', color: '#059669', fontSize: '13px', fontWeight: '600' }}>
          Congrats! You're saving {formatCurrency(savings)} on your security bundle!
        </div>
      )}

      <button type="button" className="review__checkout" style={{ marginTop: '16px', width: '100%', background: '#004FE4', color: '#fff', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', border: 'none', cursor: 'pointer' }} onClick={handleCheckoutClick}>
        Checkout
      </button>

      {checkoutMsg && (
        <div style={{ marginTop: '8px', padding: '8px', background: '#e0e7ff', color: '#3730a3', fontSize: '12px', textAlign: 'center', borderRadius: '6px', fontWeight: '500' }}>
          Prototype mode: Checkout gateway is not wired up yet!
        </div>
      )}

      <button type="button" className="review__save" onClick={handleSave} style={{ width: '100%', background: 'transparent', border: 'none', color: '#4b5563', textDecoration: 'underline', marginTop: '10px', cursor: 'pointer', fontSize: '13px' }}>
        {saveStatus === 'saved' ? 'Saved ✓' : 'Save my system for later'}
      </button>
    </aside>
  )
}