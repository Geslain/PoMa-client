import {test, expect} from '@playwright/test'

test('Should redirect to the login page', async ({page}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  // Find an element with the text 'About' and click on it
  await expect(page).toHaveURL('http://localhost:3000/login')
})

test('Should navigate to the login page', async ({page}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/login')

  await page.click('text=No account ? Start your journey here ! 🥳')

  // Find an element with the text 'About' and click on it
  await expect(page).toHaveURL('http://localhost:3000/sign-up')
})


test('Should display notification on successful login', async ({page}) => {
  await page.route('*/**/api/auth/callback/credentials?', async route => {
    const json = {
      url: "http://localhost:3000/projects"
    };
    await route.fulfill({json});
  });

  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/login')

  await page.getByRole('textbox', { name: 'Email' }).fill("test@test.com")
  await page.getByRole('textbox', { name: 'Password' }).fill("test" )

  await page.click('text=Login')

  // Display success notification
  await expect(page.locator("text=Welcome")).toHaveCount(1)
})

test('Should display notification on failed login', async ({page}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/login')

  await page.getByRole('textbox', { name: 'Email' }).fill("test@test.com")
  await page.getByRole('textbox', { name: 'Password' }).fill("test" )

  await page.click('text=Login')

  // Display success notification
  await expect(page.locator("text=Wrong")).toHaveCount(1)
})
