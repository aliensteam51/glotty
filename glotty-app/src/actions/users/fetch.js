import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
 } from '../loading'

export const FETCHED_USERS = 'FETCHED_USERS'

const api = new API()

export default () => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })

    const backend = api.service('users')
    api.app.authenticate()
      .then(() => {
        backend.find({
          query: {
            $limit: 800,
            $sort: {
              organizationId: 1
            }
          }
        })
        .then((result) => {
          dispatch({ type: APP_DONE_LOADING })
          dispatch({ type: LOAD_SUCCESS })

          dispatch({
            type: FETCHED_USERS,
            payload: result.data
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
