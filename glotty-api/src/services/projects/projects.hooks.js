const { populate } = require('feathers-hooks-common');

const organizationSchema = {
  include: {
    service: 'organizations',
    nameAs: 'organization',
    parentField: 'organizationId',
    childField: '_id',
  }
};

const addPlatform = require('../../hooks/add-platform');

const addLocale = require('../../hooks/add-locale');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [addPlatform(), addLocale()],
    patch: [addPlatform(), addLocale()],
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
