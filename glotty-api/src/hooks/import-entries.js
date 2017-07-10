// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if (hook.data.parsedEntries === undefined) return Promise.resolve(hook);
    const { localeCode, projectLocales } = hook.data
    if (projectLocales.includes(localeCode)) return Promise.resolve(hook);

    hook.data.localeCodes = projectLocales.concat(localeCode);

    const entries = hook.app.service('entries');

    entries.find({ query: { projectId: hook.id, $limit: 800 }})
      .then((result) => {
        let parsedEntries = hook.data.parsedEntries
        result.data.map((entr) => {
          parsedEntries = parsedEntries.filter((entry) => {
            if (entr.platforms[0].keyId === entry.keyId) {
              entr.platforms[0].translations = entr.platforms[0].translations.concat({ localeCode: localeCode, translation: entry.translation })
              entries.patch(entr._id, { platforms: entr.platforms })
              return false
            }
            return true
          })
        })
        parsedEntries.map((entry) => {
          entries.create({
            name: entry.keyId,
            projectId: hook.id,
            platforms: [
              {
                keyId: entry.keyId,
                translations: [
                  {
                    localeCode: localeCode,
                    translation: entry.translation
                  }
                ]
              }
            ]
          })
        })
      })
    return Promise.resolve(hook);
  };
};
