// Initializes the `locales` service on path `/locales`
const createService = require('feathers-mongoose');
const createModel = require('../../models/locales.model');
const hooks = require('./locales.hooks');
const filters = require('./locales.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'locales',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/locales', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('locales');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
