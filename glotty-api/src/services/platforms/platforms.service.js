// Initializes the `platforms` service on path `/platforms`
const createService = require('feathers-mongoose');
const createModel = require('../../models/platforms.model');
const hooks = require('./platforms.hooks');
const filters = require('./platforms.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'platforms',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/platforms', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('platforms');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
