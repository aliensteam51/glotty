const users = require('./users/users.service.js');
const organizations = require('./organizations/organizations.service.js');
const projects = require('./projects/projects.service.js');
const entries = require('./entries/entries.service.js');
const platforms = require('./platforms/platforms.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(organizations);
  app.configure(projects);
  app.configure(entries);
  app.configure(platforms);
};
