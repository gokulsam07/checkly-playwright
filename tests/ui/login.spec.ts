
import { test, expect } from '../../fixtures/page-fixture';


test('should login successfully with valid credentials', async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');
    await expect(page).toHaveURL(/.*\/accounts\/.*/);
})


test('should not login successfully with invalid credentials @skipauth', async ({ page, loginPage }) => {
    await loginPage.login(process.env.USER_GOKUL!, process.env.INCORRECT_PASSWORD!);
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('#error-element-password')).toHaveText('Wrong email or password');
})