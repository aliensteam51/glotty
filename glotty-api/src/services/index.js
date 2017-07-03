const users = require('./users/users.service.js');
const organizations = require('./organizations/organizations.service.js');
const projects = require('./projects/projects.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(organizations);
  app.configure(projects);
};
