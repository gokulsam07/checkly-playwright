import { Page } from '@playwright/test'

class LoginPage {
    constructor(private readonly page: Page) { };


    async login(username: string, password: string) {
        await this.page.fill('#username', username);
        await this.page.getByRole('button', { name: 'Log in' }).click();
        await this.page.fill('#password', password);
        await this.page.getByText('Continue').click();
    }

}



export default LoginPage;