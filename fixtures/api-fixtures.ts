import { test as base, expect, APIRequestContext } from '@playwright/test';

type APIFixtures = {
  // This holds the token string. Defaults to ENV but can be overridden.
  authToken: string;
  // This is the authenticated client
  authenticatedRequest: APIRequestContext;
};

export const test = base.extend<APIFixtures>({
  // 1. Define the default token logic
  authToken: async ({}, use) => {
    const defaultToken = process.env.AUTH_TOKEN! || '';
    await use(defaultToken);
  },

  authenticatedRequest: [async ({ playwright, authToken,baseURL }, use) => {
    const context = await playwright.request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: {
        'Authorization': `Bearer ${authToken}`,
        'X-Checkly-Account': process.env.ACC_ID!,
      },
    });

    await use(context);
    await context.dispose(); 
  }, { auto: true }] 
});

export { expect, test as apiTest };