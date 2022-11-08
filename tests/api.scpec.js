test('should fetch the truth cards', async ({ request }) => {
  const getTruthCards = await request.post(`/api/cards`, {
    data: {
      type: '1',
      project: '[]',
    }
  });
  expect(await getTruthCards.json()).toContainEqual(expect.objectContaining({
    title: 'Truth'
  }));
  expect(getTruthCards.ok()).toBeTruthy();
  
});


test('should fetch the dare cards', async ({ request }) => {
    const getDareCards = await request.post(`/api/cards`, {
      data: {
        type: '2',
        project: '[]',
      }
    });
    expect(await getDareCards.json()).toContainEqual(expect.objectContaining({
      title: 'Dare'
    }));
    expect(getDareCards.ok()).toBeTruthy();
    
  });
