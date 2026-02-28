import { defineConfig, devices } from "@playwright/test";
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
    fullyParallel: true,
    reporter: [['html'], ['list']],
    projects: [
        {
            name: 'api',
            workers: 1,
            testDir: './tests/api',
            use: {
                baseURL: 'https://api.checklyhq.com/v1/',
                screenshot: 'off',
                video: 'off',
                extraHTTPHeaders: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            timeout: 30000,
            expect: { timeout: 5000 },
        },
        {
            name: 'chrome',
            testDir: './tests/ui',
            workers: 2,
            use: {
                baseURL: 'https://app.checklyhq.com/',
                viewport: { width: 1280, height: 720 },
                actionTimeout: 15000,
                video: "off",
                screenshot: "only-on-failure",
            },
            timeout: 60000,
            expect: { timeout: 10000 },
        }
    ],

    use: {
        video: 'off',
        headless: process.env.CI ? true : false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        actionTimeout: 10000,
    },
});