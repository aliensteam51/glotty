const { populate } = require('feathers-hooks-common');
const { authenticate } = require('feathers-authentication').hooks
const { hasRoleOrRestrict } = require('feathers-authentication-hooks')

const restrict = hasRoleOrRestrict({ roles: ['super-admin','admin']})

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

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [restrict],
    update: [addLocale(), restrict],
    patch: [addLocale(), restrict],
    remove: [restrict]
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
