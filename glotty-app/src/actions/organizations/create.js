import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const CREATE_ORGANIZATION = 'CREATE_ORGANIZATION'

const api = new API()

export default (newOrganization) => {
  return (dispatch) => {

  dispatch({ type: APP_LOADING })

   const backend = api.service('organizations')

   backend.create(newOrganization)
     .then((result) => {
       dispatch({ type: LOAD_SUCCESS })
       dispatch({ type: APP_DONE_LOADING })

       dispatch({
         type: CREATE_ORGANIZATION,
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
