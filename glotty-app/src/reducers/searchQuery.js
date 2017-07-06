import { UPDATE_SEARCH } from '../actions/entries/search'

export default (state = '', { type, payload } = {}) => {
  switch(type) {
    case UPDATE_SEARCH :
      return payload

    default :
      return state
  }
}
