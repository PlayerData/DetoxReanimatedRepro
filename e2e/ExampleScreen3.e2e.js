describe('Example Screen Tests 3', () => {
  beforeAll(async () => {
    await device.launchApp();

    await element(by.text('Example screen')).tap();
  });

  it('should spin the button', async () => {
    for (let i = 0; i < 100; i++) {
      await element(by.id('SpinButton')).tap();
    }
  });
});
