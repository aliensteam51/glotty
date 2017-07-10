// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if (hook.data.parsedEntries === undefined) return Promis.resolve(hook);
    console.log(hook.data)
    const { localeCode } = hook.data
    hook.data.localeCodes = [localeCode]

    const entries = hook.app.service('entries')

    hook.data.parsedEntries.map((entry) => {
      const newEntry = {
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
      }
      entries.create(newEntry)
    })
    return Promise.resolve(hook);
  };
};
