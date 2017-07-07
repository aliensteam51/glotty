// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// const errors = require('feathers-errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {

    const entries = hook.app.service('entries')
    const entryId = hook.id
    const platformId = hook.data._id

    if (!hook.data.remove) return Promise.resolve(hook)

    return entries.get(entryId)
      .then((entry) => {

        const platformsFiltered = entry.platforms.filter(p => p._id.toString() !== platformId.toString())

        //Hard delete the plafrom with filter
        hook.data = {
          platforms: platformsFiltered
        }


        //Soft delete the platform by making delete true

        // const platformFind = entry.platforms.find(p => p._id.toString() === platformId.toString())
        // hook.data = {
        //   platforms: platformsFiltered.concat({
        //     translations: platformFind.translations,
        //     deleted: true,
        //     keyId: platformFind.keyId,
        //     platformCode: platformFind.platformCode
        //   })
        // }


        return Promise.resolve(hook)
      })
  }
}
