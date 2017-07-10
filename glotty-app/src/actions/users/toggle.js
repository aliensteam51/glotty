import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const USER_TOGGLED = 'USER_TOGGLED'

const api = new API()

export default (userId, curRole) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('users')

    let newRole

    curRole === "user" ? newRole = "admin" : newRole = "user"

    api.app.authenticate()
      .then(() => {
        backend.patch(userId, {roles: [newRole]})
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })

            dispatch({
              type: USER_TOGGLED,
              payload: result
            })
          })
          .catch((error) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({
              type: LOAD_ERROR,
              payload: error.message
            })
          })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
