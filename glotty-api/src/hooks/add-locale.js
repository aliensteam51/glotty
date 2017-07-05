// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if (hook.data.addLocale === undefined) return Promise.resolve(hook);

    const localeCodes = hook.data.localeCodes;
    const addLocale = hook.data.addLocale;

    if (localeCodes.includes(addLocale)) throw new Errors.Unprocessable('Locale already exists on this project');

    hook.data.localeCodes = localeCodes.concat(addLocale);

    const newTranslation = {
      localeCode: addLocale,
      translation: ''
    }

    const entries = hook.app.service('entries');

    return entries.find({ query: { projectId: hook.id, $limit: 800 } })
      .then((result) => {
        result.data.map((entry) => {
          const platforms = entry.platforms.map((platform) => {
            platform.translations = platform.translations.concat(newTranslation)
            return platform
          })
          entries.patch(entry._id, { platforms: platforms })
        });
        return Promise.resolve(hook);
      });
  };
};
