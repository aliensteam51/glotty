import { LOCALE_SEARCH } from '../actions/locales/search'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case LOCALE_SEARCH:
      return [ ...payload ]

    default:
      return state
  }
}
