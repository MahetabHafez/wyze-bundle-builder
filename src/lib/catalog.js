import * as staticData from '../data/products'

export const catalog = { ...staticData }

export async function loadCatalog() {
  const apiUrl = import.meta.env.VITE_API_URL
  if (!apiUrl) return // no backend configured — keep using the bundled data

  try {
    const res = await fetch(`${apiUrl}/api/catalog`)
    if (!res.ok) throw new Error(`API responded ${res.status}`)
    const data = await res.json()
    Object.assign(catalog, data)
  } catch (err) {

    console.warn('[catalog] Falling back to local product data:', err.message)
  }
}
