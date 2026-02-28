import { test, expect } from '../../fixtures/page-fixture';

test.describe.serial('Environment Variable Tests', () => {
test('create a new environment variable', async ({ page,sidePanel,envVar }) => {
    await page.waitForLoadState('domcontentloaded');
    await sidePanel.clickOnMenuItem('Environment variables');
    await envVar.createEnvVar('TEST_KEY', 'TEST_VALUE',true);
    await page.waitForTimeout(2000);
    expect(await envVar.validateEnvVar('TEST_KEY', 'TEST_VALUE',true)).toBeTruthy();
});

test('update an environment variable', async ({ page,sidePanel,envVar }) => {
    await page.waitForLoadState('domcontentloaded');
    await sidePanel.clickOnMenuItem('Environment variables');   
    await envVar.updateEnvVar('TEST_KEY', 'UPDATED_VALUE');
    expect(await envVar.validateEnvVar('TEST_KEY', 'UPDATED_VALUE')).toBeTruthy();
});

test('delete an environment variable', async ({ page,sidePanel,envVar }) => {
    await page.waitForLoadState('domcontentloaded');
    await sidePanel.clickOnMenuItem('Environment variables');   
    await envVar.deleteEnvVar('TEST_KEY');
    await page.waitForTimeout(2000);
    expect(await page.getByText('“TEST_KEY” deleted successfully').isVisible()).toBeTruthy();
});

});