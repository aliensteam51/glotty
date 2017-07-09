import { CREATE_ORGANIZATION } from '../actions/organizations/create'
import { FETCHED_ORGANIZATIONS } from '../actions/organizations/fetch'
import { ORGANIZATION_DELETED } from '../actions/organizations/delete'
import { ORGANIZATION_REVIVED } from '../actions/organizations/revive'
import { ORGANIZATION_HARD_DELETED } from '../actions/organizations/hard-delete'

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

    case ORGANIZATION_HARD_DELETED :
      return state.filter((organization) => (organization.deleted !== true))

    case ORGANIZATION_REVIVED :
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
