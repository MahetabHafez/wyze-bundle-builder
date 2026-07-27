import { useState } from 'react'
import StepSection from './components/StepSection'
import ReviewPanel from './components/ReviewPanel'
import { catalog } from './lib/catalog'
import { setQuantity, countSelectedProducts } from './lib/selections'

const STORAGE_KEY = 'bundle-builder:saved-system:v1'

function loadSavedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

export default function App() {

  const { STEPS, SEED_SELECTIONS, SEED_ACTIVE_VARIANTS } = catalog

  const saved = loadSavedState()

  const [selections, setSelections] = useState(saved?.selections ?? SEED_SELECTIONS)
  const [activeVariants, setActiveVariants] = useState(saved?.activeVariants ?? SEED_ACTIVE_VARIANTS)
  const [openStepId, setOpenStepId] = useState(
    saved?.openStepId ?? STEPS.find((s) => s.defaultOpen)?.id ?? STEPS[0].id
  )
  const [restoredNotice, setRestoredNotice] = useState(Boolean(saved))

  function handleQuantityChange(productId, variantId, quantity) {
    setSelections((prev) => setQuantity(prev, productId, variantId, quantity))
  }

  function handleVariantSelect(productId, variantId) {
    setActiveVariants((prev) => ({ ...prev, [productId]: variantId }))
  }

  function handleToggleStep(stepId) {
    setOpenStepId((prev) => (prev === stepId ? null : stepId))
  }

  function handleAdvance(nextStepId) {
    setOpenStepId(nextStepId)
  }

  function handleSave() {
    const payload = { selections, activeVariants, openStepId }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }

  return (
    <div className="app">
      <header className="app__header">
        <span className="app__logo">Wyze Home Security</span>
        <h1 className="app__title">Let's get started!</h1>
      </header>

      {restoredNotice && (
        <div className="app__notice">
          Welcome back — we restored your saved system.
          <button type="button" onClick={() => setRestoredNotice(false)} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}

      <main className="app__layout">
        <div className="app__builder">
          {STEPS.map((step, index) => (
            <StepSection
              key={step.id}
              step={step}
              nextStep={STEPS[index + 1]}
              isOpen={openStepId === step.id}
              onToggle={() => handleToggleStep(step.id)}
              onAdvance={() => handleAdvance(STEPS[index + 1]?.id)}
              selectedCount={countSelectedProducts(selections, step.id)}
              selections={selections}
              activeVariants={activeVariants}
              onVariantSelect={handleVariantSelect}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <div className="app__review">
          <ReviewPanel
            selections={selections}
            onQuantityChange={handleQuantityChange}
            onSave={handleSave}
          />
        </div>
      </main>
    </div>
  )
}
