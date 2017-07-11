// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('feathers-errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if (hook.data.deleteLocale === undefined) return Promise.resolve(hook);

    const localeCodes = hook.data.localeCodes;
    const deleteLocale = hook.data.deleteLocale;

    if (!localeCodes.includes(deleteLocale)) throw new errors.Unprocessable('Cannot delete a locale that doesn\'t exist on the project');

    hook.data.localeCodes = localeCodes.filter(lc => lc !== deleteLocale);

    const entries = hook.app.service('entries');

    return entries.find({ query: { projectId: hook.id, $limit: 800 } })
      .then((result) => {
        result.data.map((entry) => {
          const platforms = entry.platforms.map((platform) => {
            platform.translations = platform.translations.filter(trans => trans.localeCode !== deleteLocale)
            return platform
          })
          entries.patch(entry._id, { platforms: platforms })
        });
        return Promise.resolve(hook);
      });
  };
};
