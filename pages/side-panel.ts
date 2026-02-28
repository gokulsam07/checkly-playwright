import { Page } from '@playwright/test'

class SidePanel {
    constructor(private readonly page: Page) { }

    async clickOnMenuItem(menuItem: string) {
        const sideBar = await this.page.getByLabel('Close sidebar').isVisible();
        if (!sideBar) {
            await this.page.getByLabel('Toggle sidebar').click();
        }
        await this.page.getByText(menuItem).first().click();
    }

}

export default SidePanel;