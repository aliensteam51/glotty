import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const PROJECT_DELETED = 'PROJECT_DELETED'

const api = new API()

export default (project) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('projects')

    api.app.authenticate()
      .then(() => {
        backend.patch(project)
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })

            dispatch({
              type: PROJECT_DELETED,
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
