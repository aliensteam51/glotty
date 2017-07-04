import { FETCHED_ENTRIES } from '../actions/entries/fetch'
import {
  ENTRY_CREATED,
  ENTRY_UPDATED,
} from '../actions/entries/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_ENTRIES :
      return [ ...payload ]

    case ENTRY_CREATED :
      const newEntry = { ...payload }
      return [newEntry].concat(state)

    case ENTRY_UPDATED :
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
