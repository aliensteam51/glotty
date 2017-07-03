const assert = require('assert');
const app = require('../../src/app');

describe('\'entries\' service', () => {
  it('registered the service', () => {
    const service = app.service('entries');

    assert.ok(service, 'Registered the service');
  });
});
