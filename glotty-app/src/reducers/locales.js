import { FETCHED_LOCALES } from '../actions/locales/fetch'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_LOCALES:
      return [ ...payload ]

    default:
      return state
  }
}
