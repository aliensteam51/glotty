// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const errors = require('feathers-errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

    if (hook.data.addPlatform === undefined) return Promise.resolve(hook);

    const addPlatform = hook.data.addPlatform;
    const locales = hook.data.locales;
    const platforms = hook.data.platforms
    const platformCodes = platforms.map((platf) => (platf.platformCode));

    if (platformCodes.includes(addPlatform)) throw new Errors.Unprocessable('Platform already exists on this entry');

    const newPlatform = {
      platformCode: addPlatform,
      key: '',
      translations: locales.map((localeCode) => ({
        localeCode: localeCode
      }))
    };

    hook.data.platforms = platforms.concat(newPlatform)

    return Promise.resolve(hook);
  };
};
