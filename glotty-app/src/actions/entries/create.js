import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()

export default (newEntry) => {
  return (dispatch) => {

  dispatch({ type: APP_LOADING })

   const backend = api.service('entries')

   backend.create(newEntry)
     .then((result) => {
       dispatch({ type: LOAD_SUCCESS })
       dispatch({ type: APP_DONE_LOADING })
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
