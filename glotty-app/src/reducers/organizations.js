import { CREATE_ORGANIZATION } from '../actions/organizations/create'
import { FETCHED_ORGANIZATIONS } from '../actions/organizations/fetch'
import { ORGANIZATION_DELETED } from '../actions/organizations/delete'

export default (state = [], { type, payload } = {}) => {
  switch(type) {
    case FETCHED_ORGANIZATIONS :
     return [ ...payload ]

    case CREATE_ORGANIZATION :
      return state.concat({ ...payload })

    case ORGANIZATION_DELETED :
    return state.map((organization) => {
      if (organization._id === payload._id) {
        return { ...payload }
      }
      return organization
    })

    default :
      return state
  }
}
