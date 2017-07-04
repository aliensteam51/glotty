import { CREATE_PROJECT } from '../actions/projrcts/create'
import { FETCHED_PROJECTS } from '../actions/projrcts/fetch'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case FETCHED_PROJECTS :
     return [ ...payload ]

    case CREATE_PROJECT :
      return state.concat({ ...payload })

    default :
      return state
  }
