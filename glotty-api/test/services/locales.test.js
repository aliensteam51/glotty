const assert = require('assert');
const app = require('../../src/app');

describe('\'locales\' service', () => {
  it('registered the service', () => {
    const service = app.service('locales');

    assert.ok(service, 'Registered the service');
  });
});
