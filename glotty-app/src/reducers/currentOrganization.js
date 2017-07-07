import { GOT_ORGANIZATION } from '../actions/organizations/get'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case GOT_ORGANIZATION :
      return payload

    default :
      return state
  }
}
