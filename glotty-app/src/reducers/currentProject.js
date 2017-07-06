import { GOT_PROJECT } from '../actions/projects/get'
import { ADDED_LOCALE } from '../actions/projects/add-locale'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case GOT_PROJECT :
      return payload

    case ADDED_LOCALE :
      return payload

    default :
      return state
  }
}
