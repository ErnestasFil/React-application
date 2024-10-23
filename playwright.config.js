import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 2,
    reporter: 'html',
});