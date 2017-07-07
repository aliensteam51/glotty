const { authenticate } = require('feathers-authentication').hooks
const { hasRoleOrRestrict } = require('feathers-authentication-hooks')


module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      hasRoleOrRestrict({ roles: ['super-admin']})
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
