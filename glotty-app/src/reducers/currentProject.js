import { GOT_PROJECT } from '../actions/projects/get'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case GOT_PROJECT :
      return payload

    default :
      return state
  }
}
