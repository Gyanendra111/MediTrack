import { test, expect } from '@playwright/test'

test('login page renders and navigation links are visible', async ({ page }) => {
  await page.goto('/login')
  await expect(page.getByText('Welcome Back')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Create account', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Continue as Guest' })).toBeVisible()
})

test('guest flow reaches dashboard shell', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: 'Continue as Guest' }).click()
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  await expect(page.getByText('MediTrack')).toBeVisible()
})
