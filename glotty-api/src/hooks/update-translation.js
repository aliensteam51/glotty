// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

    if (hook.data.updatedTranslation === undefined) return Promise.resolve(hook);

    const { platformCode, localeCode, updatedTranslation } = hook.data

    return hook.app.service('entries').get(hook.id)
      .then((entry) => {
        const platforms = entry.platforms.map((pf) => {
          if (pf.platformCode === platformCode) {
            pf.translations.map((trans) => {
              if (trans.localeCode === localeCode) {
                trans.translation = updatedTranslation
              }
              return trans
            })
          }
          return pf
        })
        hook.data.platforms = platforms
        return Promise.resolve(hook);
      })
  };
};
