import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const GOT_ORGANIZATION = 'GOT_ORGANIZATION'

const api = new API()

export default (organizationId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('organizations')

    api.app.authenticate()
      .then(() => {
        backend.get(organizationId)
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })

            dispatch({
              type: GOT_ORGANIZATION,
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
