const { populate } = require('feathers-hooks-common');
const {restrictToRoles} = require('feathers-authentication-hooks');

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

const addLocale = require('../../hooks/add-locale');

const importEntries = require('../../hooks/import-entries');

const deleteLocale = require('../../hooks/delete-locale');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [addLocale(), importEntries(), deleteLocale()],
    patch: [addLocale(), importEntries(), deleteLocale()],
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
