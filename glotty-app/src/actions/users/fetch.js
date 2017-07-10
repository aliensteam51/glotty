import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
 } from '../loading'

export const FETCHED_USERS = 'FETCHED_USERS'

const api = new API()

export default (organizationId = undefined) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })

    const backend = api.service('users')
    let search = {
      query: {
        $limit: 800,
        $sort: {
          organizationId: 1
        }
      }
    }

    if (organizationId) search.query = {...search.query, organizationId: organizationId }

    api.app.authenticate()
      .then(() => {
        backend.find(search)
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
