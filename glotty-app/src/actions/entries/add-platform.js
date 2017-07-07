import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const ADDED_PLATFORM = 'ADDED_PLATFORM'

const api = new API()

export default (entryId, data) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })
    const backend = api.service('entries')
    backend.patch(entryId, data)
      .then((result) => {
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
