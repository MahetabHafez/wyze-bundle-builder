import { catalog } from './catalog'

export const NO_VARIANT = '_'

export function findProduct(productId) {
  return Object.values(catalog.PRODUCTS).flat().find((p) => p.id === productId)
}

export function getQuantity(selections, productId, variantId = NO_VARIANT) {
  return selections[productId]?.[variantId] ?? 0
}

export function setQuantity(selections, productId, variantId, quantity) {
  const next = { ...selections }
  const productSelections = { ...(next[productId] || {}) }

  if (quantity <= 0) {
    delete productSelections[variantId]
  } else {
    productSelections[variantId] = quantity
  }

  if (Object.keys(productSelections).length === 0) {
    delete next[productId]
  } else {
    next[productId] = productSelections
  }

  return next
}

export function countSelectedProducts(selections, stepId) {
  const ids = new Set(catalog.PRODUCTS[stepId].map((p) => p.id))
  let count = 0
  for (const id of ids) {
    const variantMap = selections[id]
    if (variantMap && Object.values(variantMap).some((qty) => qty > 0)) {
      count += 1
    }
  }
  return count
}

export function buildReviewLines(selections, steps) {
  const lines = []
  for (const step of steps) {
    for (const product of catalog.PRODUCTS[step.id]) {
      const variantMap = selections[product.id]
      if (!variantMap) continue

      const variantEntries = product.variants.length
        ? product.variants
        : [{ id: NO_VARIANT, name: null, swatch: null }]

      for (const variant of variantEntries) {
        const qty = variantMap[variant.id] ?? 0
        if (qty <= 0) continue
        lines.push({
          key: `${product.id}__${variant.id}`,
          productId: product.id,
          variantId: variant.id,
          variantName: variant.name,
          name: product.name,
          image: product.image,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          unit: product.unit || '',
          quantity: qty,
          group: step.reviewGroup,
        })
      }
    }
  }
  return lines
}

export function computeTotals(lines) {
  let subtotal = 0
  let compareAtSubtotal = 0
  for (const line of lines) {
    subtotal += line.price * line.quantity
    const compareAt = line.compareAtPrice ?? line.price
    compareAtSubtotal += compareAt * line.quantity
  }
  const savings = Math.max(0, compareAtSubtotal - subtotal)
  return { subtotal, compareAtSubtotal, savings }
}

export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`
}
