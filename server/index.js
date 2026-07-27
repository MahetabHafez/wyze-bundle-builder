import express from 'express'
import cors from 'cors'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CATALOG_PATH = path.join(__dirname, 'data', 'catalog.json')
const PORT = process.env.PORT || 4000

const app = express()
app.use(cors()) 
const catalog = JSON.parse(await readFile(CATALOG_PATH, 'utf-8'))

app.get('/api/catalog', (req, res) => {
  res.json(catalog)
})

app.get('/api/steps', (req, res) => {
  res.json(catalog.STEPS)
})

app.get('/api/products/:stepId', (req, res) => {
  const products = catalog.PRODUCTS[req.params.stepId]
  if (!products) {
    return res.status(404).json({ error: `No such step: ${req.params.stepId}` })
  }
  res.json(products)
})

app.get('/health', (req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Bundle Builder API listening on http://localhost:${PORT}`)
  console.log(`  GET /api/catalog`)
  console.log(`  GET /api/steps`)
  console.log(`  GET /api/products/:stepId`)
})
