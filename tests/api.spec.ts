import { test, expect, APIRequestContext } from '@playwright/test';
import { Utils } from './utils';

let context: APIRequestContext;
test.beforeAll(async ({ playwright }) => {
  context = await playwright.request.newContext({
    baseURL: 'https://search.wb.ru',
  });
})

test.afterAll(async ({ }) => {
  await context.dispose();
});

test.describe('Api тесты интернет магазина Wildberries', () => {
  test('Получить каталог смартфонов', async ({ }) => {
    const getParametrs = {
        'appType': 1,
        'lang': 'ru',
        'locale': 'ru',
        'page': 1,
        'resultset': 'catalog',
        'query': 'смартфон'
    }
    const res = await (await context.get('/exactmatch/ru/common/v4/search', {params: getParametrs}));
    expect(res.ok()).toBeTruthy();
    const data = JSON.parse(await res.text());
    expect(data.metadata.name === 'смартфон').toBeTruthy();
  });

  test('Получить смартфонов только фирмы Samsung', async ({ }) => {
    const getParametrs = {
        'appType': 1,
        'lang': 'ru',
        'locale': 'ru',
        'page': 1,
        'resultset': 'catalog',
        'query': 'смартфон',
        'fbrand': '5772'
    }
    const res = await (await context.get('/exactmatch/ru/common/v4/search', {params: getParametrs}));
    expect(res.ok()).toBeTruthy();
    const data = JSON.parse(await res.text());
    expect(Utils.checkBrandInResponce(data.data.products, 'Samsung')).toBeTruthy();
  });
});
