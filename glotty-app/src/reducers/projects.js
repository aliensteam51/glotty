import { CREATE_PROJECT } from '../actions/projects/create'
import { FETCHED_PROJECTS } from '../actions/projects/fetch'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case FETCHED_PROJECTS :
     return [ ...payload ]

    case CREATE_PROJECT :
      return state.concat({ ...payload })

    default :
      return state
  }
}
