import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const TRANSLATION_DELETED = 'TRANSLATION_DELETED'

const api = new API()

export default (entryId, platformId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('entries')

    api.app.authenticate()
      .then(() => {
        backend.patch(entryId, {platformId, deletePlatform: true})
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })
            dispatch({
              type: TRANSLATION_DELETED,
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
