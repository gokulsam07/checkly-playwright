import {test as base, expect } from '@playwright/test';
import LoginPage from '../pages/login-page';
import SidePanel from '../pages/side-panel';
import EnvironmentVariablePage from '../pages/env-var';



type Fixtures = {
  loginPage: LoginPage,
  sidePanel: SidePanel,
  envVar: EnvironmentVariablePage,
  autoLogin: void,
};

let test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  sidePanel: async ({ page }, use) => use(new SidePanel(page)),
  envVar: async ({ page }, use) => use(new EnvironmentVariablePage(page)),
  autoLogin: [async ({ loginPage, page,baseURL}, use, testInfo) => {
    if (testInfo.title.includes('@skipauth')) {
      await page.goto(baseURL!);
      await use();
    } else {
      await page.goto(baseURL!);
      await loginPage.login(process.env.USER_GOKUL!, process.env.GOKUL_PASSWORD!);
      await page.waitForLoadState('domcontentloaded');
      await use();
    }
  }, { auto: true }]


})

export { test, expect };