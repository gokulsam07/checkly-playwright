import { Page } from '@playwright/test'
import { env } from 'node:process';

class EnvironmentVariablePage {
    constructor(private readonly page: Page) { };

    async createEnvVar(key: string, value: string, lock?: boolean) {
        const keyName = this.page.getByLabel('Add a new environment variable').getByRole('textbox', { name: 'New environment variable' });
        await keyName.fill(key);
        const valueName = this.page.getByLabel('Add a new environment variable').getByRole('textbox', { name: 'Environment variable value' });
        await valueName.fill(value);
        if (lock) {
            await this.page.locator('[data-octicon-name="unlock"]').click();
        }
        const add = this.page.getByLabel('Add a new environment variable').getByText('Add').first();
        await add.click();
    }

    async updateEnvVar(key: string, value: string, lock?: boolean) {
        await this.page.getByTestId('environment-variable-row').filter({ hasText: key }).getByLabel('Edit environment variable').click();
        const keyName = this.page.getByTestId('environment-variable-row').getByRole('textbox', { name: 'Environment variable key' });
        await keyName.fill(key);
        if (lock) {
            await this.page.locator('[data-octicon-name="unlock"]').click();
        }else{
            await this.page.locator('[data-octicon-name="lock"]').click();
        }
        const valueName = this.page.getByTestId('environment-variable-row').getByRole('textbox', { name: 'Environment variable value' });
        await valueName.fill('');
        await valueName.fill(value);
        await this.page.getByRole('button', { name: 'Save changes' }).click();
    }

    async validateEnvVar(key: string, value: string, lock?: boolean):Promise<boolean> {
        const row = this.page.getByTestId('environment-variable-row').filter({ hasText: key });
        const expectedText = lock ? '••••••••••••••••' : value;
        return await row.getByText(expectedText).isVisible();
    }

    async deleteEnvVar(key: string) {
        await this.page.getByTestId('environment-variable-row').filter({ hasText: key }).getByLabel('Open actions menu').click();
        await this.page.getByText('Delete').click();
        await this.page.getByText('Delete environment variable', { exact: true }).click();
    }



}

export default EnvironmentVariablePage;
