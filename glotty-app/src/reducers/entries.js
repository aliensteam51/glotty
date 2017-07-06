import { FETCHED_ENTRIES } from '../actions/entries/fetch'
import { ENTRY_CREATED } from '../actions/entries/create'
// import { ENTRY_UPDATED } from '../actions/entries/update'
import { ENTRY_DELETED } from '../actions/entries/delete'
import { PLATFORM_DELETED } from '../actions/translations/delete'
import { KEY_EDITED } from '../actions/platforms/edit-key'

// import {
//   ENTRY_CREATED,
//   ENTRY_UPDATED,
//   ENTRY_DELETED,
// } from '../actions/entries/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_ENTRIES :
      return [ ...payload ]

    case ENTRY_CREATED :
      const newEntry = { ...payload }
      return state.concat([newEntry])

    case KEY_EDITED :
      return state.map((entry) => {
        if (entry._id === payload._id) {
          return { ...payload }
        }
        return entry
      })

    //
    // case ENTRY_UPDATED :
    //   return state.map((entry) => {
    //     if (entry._id === payload._id) {
    //       return { ...payload }
    //     }
    //     return entry
    //   })

    case ENTRY_DELETED :
      return state.map((entry) => {
        if (entry._id === payload._id) {
          return { ...payload }
        }
        return entry
      })

    case PLATFORM_DELETED:
      return state.map((entry) => {
        if (entry._id === payload._id) {
          return { ...payload }
        }
        return entry
      })

    default :
      return state

  }
}
