import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
 } from '../loading'

export const ADDED_PLATFORM = 'ADDED_PLATFORM'

const api = new API()

export default (projectId, addPlatform, platformCodes, localeCodes) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })
    const backend = api.service('projects')
    backend.patch(projectId, {
      platformCodes: platformCodes,
      localeCodes: localeCodes,
      addPlatform: addPlatform
    })
      .then((result) => {
        console.log(result)
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({
          type: ADDED_PLATFORM,
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
