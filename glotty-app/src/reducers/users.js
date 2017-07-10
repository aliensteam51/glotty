import { FETCHED_USERS } from '../actions/users/fetch'
import { USER_CREATED } from '../actions/users/create'
import { USER_DELETED } from '../actions/users/delete'
import { USER_TOGGLED } from '../actions/users/toggle'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_USERS :
      return [ ...payload ]

    case USER_CREATED :
      const newUser = { ...payload }
      return state.concat([newUser])

    case USER_DELETED :
      return state.filter((user) => (user._id !== payload._id))

    case USER_TOGGLED :
      return state.map((user) => {
        if (user._id === payload._id) {
          return { ...payload }
        }
        return user
      })

    default :
      return state

  }
}
