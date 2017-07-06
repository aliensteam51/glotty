// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

    if (hook.data.updatedKey === undefined) return Promise.resolve(hook);

    console.log(hook.data)
    return hook.app.service('entries').get(hook.id)
      .then((entry) => {
        const platforms = entry.platforms.map((pf) => {
          if (pf.platformCode === hook.data.platformCode) {
            pf.keyId = hook.data.updatedKey
          }
          return pf
        })
        hook.data.platforms = platforms
        return Promise.resolve(hook);
      })
  };
};
