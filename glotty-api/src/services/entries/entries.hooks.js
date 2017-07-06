const { authenticate } = require('feathers-authentication').hooks;
const { populate } = require('feathers-hooks-common');

const projectSchema = {
  include: {
    service: 'projects',
    nameAs: 'project',
    parentField: 'projectId',
    childField: '_id',
  }
};

const platformSchema = {
  include: {
    service: 'platforms',
    nameAs: 'platform',
    asArray: true,
    parentField: 'platforms',
    childField: 'code',
    select: (_, parent) => parent.platforms ? ({
      code: { $in: parent.platforms.map(platf => platf.platformCode) }
    }) : {},
  }
};

const addPlatform = require('../../hooks/add-platform');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [addPlatform()],
    patch: [addPlatform()],
    remove: []
  },

  after: {
    all: [
      populate({ schema: projectSchema }),
      populate({ schema: platformSchema })
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
