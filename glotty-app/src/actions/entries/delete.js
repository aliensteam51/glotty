import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const ENTRY_DELETED = 'ENTRY_DELETED'

const api = new API()

export default (entryId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('entries')

    api.app.authenticate()
      .then(() => {
        backend.patch(entryId, {deleted: true})
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })

            dispatch({
              type: ENTRY_DELETED,
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
