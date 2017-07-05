const { populate } = require('feathers-hooks-common');

const organizationSchema = {
  include: {
    service: 'organizations',
    nameAs: 'organization',
    parentField: 'organizationId',
    childField: '_id',
  }
};

const localeSchema = {
  include: {
    service: 'locales',
    nameAs: 'locales',
    asArray: true,
    parentField: 'localeCodes',
    childField: 'code',
    select: (_, parent) => parent.localeCodes ? ({
      code: { $in: parent.localeCodes }
    }) : {},
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
      populate({ schema: localeSchema })
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
