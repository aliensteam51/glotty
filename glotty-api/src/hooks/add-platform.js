// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('feathers-errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

    if (hook.data.addPlatform === undefined) return Promise.resolve(hook);

    const platformCodes = hook.data.platformCodes;
    const addPlatform = hook.data.addPlatform;

    if (platformCodes.includes(addPlatform)) throw new Errors.Unprocessable('Platform already exists on this project');

    hook.data.platformCodes = platformCodes.concat(addPlatform);

    const localeCodes = hook.data.localeCodes

    const newPlatform = {
      platformCode: addPlatform,
      key: '',
      translations: localeCodes.map((localeCode) => ({
        localeCode: localeCode,
        translation: ''
      }))
    };

    const entries = hook.app.service('entries');

    return entries.find( { projectId: hook.id } ).limit(0)
      then((result) => {
        result.data.map((entry) => {
          entries.patch(entry._id, { platforms: Object.assign(entry.platforms, newPlatform) })
        });
        return Promise.resolve(hook);
      });
  };
};
