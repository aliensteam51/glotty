import { CREATE_PROJECT } from '../actions/projects/create'
import { FETCHED_PROJECTS } from '../actions/projects/fetch'
import { PROJECT_DELETED } from '../actions/projects/delete'
import {PROJECT_REVIVED} from '../actions/projects/revive'
import { PROJECTS_HARD_DELETED } from '../actions/projects/hard-delete'


export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case FETCHED_PROJECTS :
     return [ ...payload ]

    case CREATE_PROJECT :
      return state.concat({ ...payload })

    case PROJECT_DELETED :
    return state.map((project) => {
      if (project._id === payload._id) {
        return { ...payload }
      }
      return project
    })

    case PROJECTS_HARD_DELETED :
      return state.filter((project) => (project.deleted !== true))


    case PROJECT_REVIVED :
    return state.map((project) => {
      if (project._id === payload._id) {
        return { ...payload }
      }
      return project
    })


    default :
      return state
  }
}
