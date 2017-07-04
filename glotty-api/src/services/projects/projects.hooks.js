const { populate } = require('feathers-hooks-common');

const organizationSchema = {
  include: {
    service: 'organizations',
    nameAs: 'organization',
    parentField: 'organizationId',
    childField: '_id',
  }
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      populate({ schema: organizationSchema }),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
