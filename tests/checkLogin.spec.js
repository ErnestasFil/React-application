import {expect, test} from '@playwright/test';

test('test login page with wrong credentials', async ({page}) => {
    await page.goto('http://localhost/');
    await page.getByRole('link', {name: 'Log in'}).click();
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill('testtest@test.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('test123456');
    await page.getByRole('button', {name: 'Sign in'}).click();
    await expect(page.locator('form')).toContainText('Invalid email or password');
});

test('test login page with correct credentials', async ({page}) => {
    await page.goto('http://localhost/');
    await page.getByRole('link', {name: 'Log in'}).click();
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill('test@test.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('test123456');
    await page.getByRole('button', {name: 'Sign in'}).click();
    await expect(page.getByRole('link', {name: 'Log out'})).toBeVisible();
});