import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const USER_CREATED = 'USER_CREATED'
const defPass = "qwerty1"

const api = new API()

export default (user) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('users')

    backend.create({...user, password: defPass})
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: USER_CREATED,
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
  }
}
