import { FETCHED_USERS } from '../actions/users/fetch'
import { USER_CREATED } from '../actions/users/create'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_USERS :
      return [ ...payload ]

    case USER_CREATED :
      const newUser = { ...payload }
      return state.concat([newUser])

    default :
      return state

  }
}
