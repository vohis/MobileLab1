const { device, element, by } = require('detox');

describe('Home Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should add and delete tasks correctly', async () => {
    await element(by.id('taskInput')).typeText('Test Task');
    await element(by.id('addButton')).tap();
    await expect(element(by.text('Test Task'))).toBeVisible();

    await element(by.text('Delete')).tap();
    await expect(element(by.text('Test Task'))).not.toBeVisible();
  });
});
