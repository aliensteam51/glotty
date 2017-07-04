import { GOT_PROJECT } from '../actions/projects/get'
import { JOINED_GAME } from '../actions/projects/join'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case GOT_PROJECT :
      return payload._id

    default :
      return state
  }
}
