import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export const ENTRY_UPDATED = 'ENTRY_UPDATED'


export default (entryId, entryEdit) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const entries = api.service('entries')

    entries.patch(entryId, entryEdit)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
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
