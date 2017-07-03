const assert = require('assert');
const app = require('../../src/app');

describe('\'platforms\' service', () => {
  it('registered the service', () => {
    const service = app.service('platforms');

    assert.ok(service, 'Registered the service');
  });
});
