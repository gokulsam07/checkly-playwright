import { test, expect } from "../../fixtures/api-fixtures";


test.describe.serial('Environment Variable API Tests', () => {
    test('create a new env variable', async ({ authenticatedRequest }) => {
        const envData = require('./data/env-var.json');
        for (const item of envData) {
            var response = await authenticatedRequest.post('variables', {
                data: item
            });
            const result = await response.json();
            console.log(result);
            expect(response.status()).toBe(201);
        }
    });

    test('update existing env variable', async ({ authenticatedRequest }) => {
        const envData = require('./data/env-var.json');
        const response = await authenticatedRequest.put(`variables/${envData[0].key}`, {
            data: {
                "key": envData[0].key,
                "value": envData[0].value,
                "locked": true,
                "secret": true
            }
        });
        const result = await response.json();
        console.log(result);
        expect(response.status()).toBe(200);
    });

    test('get env variable by key', async ({ authenticatedRequest }) => {
        const envData = require('./data/updated-var.json');
        const response = await authenticatedRequest.get(`variables/${envData[0].key}`);
        const result = await response.json();
        console.log(result);
        expect(result.key).toBe(envData[0].key);
        expect(result.value).toBe(null);
        expect(result.locked).toBe(envData[0].locked);
        expect(result.secret).toBe(envData[0].secret);
    });


    test('get all available variables', async ({ authenticatedRequest }) => {
        const envData = require('./data/updated-full-var.json');
        const response = await authenticatedRequest.get('variables');
        const result = await response.json();
        console.log(result);
        expect(response.status()).toBe(200);
        expect(result).toEqual(expect.arrayContaining(envData));

    });

    test('delete env variable by key', async ({ authenticatedRequest }) => {
        const envData = require('./data/env-var.json');
        for (const item of envData) {
            const response = await authenticatedRequest.delete(`variables/${item.key}`);
            console.log(response.status());
            expect(response.status()).toBe(204);
        }
    });

});