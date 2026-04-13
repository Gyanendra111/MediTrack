import { describe, expect, it } from 'vitest'
import request from 'supertest'
import app from '../src/server.js'

describe('backend scaffold', () => {
  it('returns health payload', async () => {
    const res = await request(app).get('/health')
    expect(res.statusCode).toBe(200)
    expect(res.body.ok).toBe(true)
  })

  it('validates doctor verification payload', async () => {
    const bad = await request(app).post('/api/doctor/verify').send({ fullName: 'Dr X' })
    expect(bad.statusCode).toBe(400)

    const good = await request(app)
      .post('/api/doctor/verify')
      .send({
        fullName: 'Dr Example',
        licenseNumber: 'LIC-001',
        specialization: 'General Physician',
        idProofUrl: 'https://example.com/id',
        degreeProofUrl: 'https://example.com/degree',
        livePhotoUrl: 'https://example.com/live',
      })

    expect(good.statusCode).toBe(201)
    expect(good.body.status).toBe('submitted')
  })

  it('validates partner verification payload', async () => {
    const bad = await request(app).post('/api/partner/verify').send({ organizationName: 'Org X' })
    expect(bad.statusCode).toBe(400)

    const good = await request(app)
      .post('/api/partner/verify')
      .send({
        organizationName: 'GreenCycle Labs',
        partnerType: 'Recycle Industry Partner (Companies)',
        acceptedCategories: 'Medicine, Food Waste',
        contactName: 'Priya Sharma',
        contactEmail: 'priya@example.com',
        contactPhone: '+91-9999999999',
        businessLicenseUrl: 'https://example.com/license',
        taxDocUrl: 'https://example.com/tax',
        addressProofUrl: 'https://example.com/address',
      })

    expect(good.statusCode).toBe(201)
    expect(good.body.status).toBe('submitted')
  })
})