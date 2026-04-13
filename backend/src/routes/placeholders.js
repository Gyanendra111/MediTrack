import { Router } from 'express'

const router = Router()

// In-memory state store for prototype mode.
const stateStore = new Map()

router.get('/app-state/:userKey', (req, res) => {
  const { userKey } = req.params
  const state = stateStore.get(userKey)
  res.json({ userKey, state: state || null })
})

router.put('/app-state/:userKey', (req, res) => {
  const { userKey } = req.params
  const { state } = req.body || {}

  if (!state || typeof state !== 'object') {
    return res.status(400).json({ message: 'Invalid payload. "state" object is required.' })
  }

  stateStore.set(userKey, state)
  return res.json({ ok: true })
})

router.post('/doctor/verify', (req, res) => {
  const requiredFields = [
    'fullName',
    'licenseNumber',
    'specialization',
    'idProofUrl',
    'degreeProofUrl',
    'livePhotoUrl',
  ]

  const missing = requiredFields.filter((field) => {
    const value = req.body?.[field]
    return typeof value !== 'string' || value.trim().length === 0
  })

  if (missing.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missing.join(', ')}`,
      missing,
    })
  }

  return res.status(201).json({
    status: 'submitted',
    ticketId: `DR-${Date.now()}`,
    reviewedBy: 'verification-queue',
  })
})

router.post('/partner/verify', (req, res) => {
  const requiredFields = [
    'organizationName',
    'partnerType',
    'acceptedCategories',
    'contactName',
    'contactEmail',
    'contactPhone',
    'businessLicenseUrl',
    'taxDocUrl',
    'addressProofUrl',
  ]

  const missing = requiredFields.filter((field) => {
    const value = req.body?.[field]
    return typeof value !== 'string' || value.trim().length === 0
  })

  if (missing.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missing.join(', ')}`,
      missing,
    })
  }

  return res.status(201).json({
    status: 'submitted',
    ticketId: `PR-${Date.now()}`,
    reviewedBy: 'partner-verification-queue',
  })
})

router.get('/placeholders', (req, res) => {
  res.json({
    message: 'Backend placeholder route is active. Replace with real integrations when ready.',
  })
})

export default router