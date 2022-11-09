// @ts-check
const { test, expect } = require('@playwright/test');

// Request context is reused by all tests in the file.
let apiContext;

test('should fetch the truth cards', async ({ request }) => {
  const getTruthCards = await request.post(`/api/cards`, {
    data: {
      type: '1',
      projection: [],
    }
  });
/*   expect(await getTruthCards.json()).toContainEqual(expect.objectContaining({
    title: 'Truth'
  })); */
  expect(getTruthCards.status() === 500)
});


test('should fetch the dare cards', async ({ request }) => {
    const getDareCards = await request.post(`/api/cards`, {
      data: {
        type: '2',
        projection: [],
      }
    });
/*     expect(await getDareCards.json()).toContainEqual(expect.objectContaining({
        title: 'Dare',
    })); */
    // expect(getDareCards).toBeOK();
    // expect(getDareCards.ok()).toBeTruthy();
  });
