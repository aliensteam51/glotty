import API from '../../api'
import { history } from '../../store'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
 } from '../loading'

export const FETCHED_ORGANIZATIONS = 'FETCHED_ORGANIZATIONS'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })
    const backend = api.service('organizations')
    api.app.authenticate()
      .then(() => {
        backend.find()
        .then((result) => {
          dispatch({ type: APP_DONE_LOADING })
          dispatch({ type: LOAD_SUCCESS })
          dispatch({
            type: FETCHED_ORGANIZATIONS,
            payload: result.data
          })
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
           type: LOAD_ERROR,
           payload: "Please Login Before Continuing."
        })
        history.replace('/')
      })
  }
}
