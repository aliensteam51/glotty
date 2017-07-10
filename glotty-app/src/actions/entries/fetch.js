import API from '../../api'
import { history } from '../../store'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
 } from '../loading'

export const FETCHED_ENTRIES = 'FETCHED_ENTRIES'

const api = new API()

export default (projectId, query_str) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })
    dispatch({ type: LOAD_SUCCESS })

    const backend = api.service('entries')
    api.app.authenticate()
    .then(() => {
      let search = { query: { projectId: projectId, $sort: { group: 1 } }}

      if (query_str) {
        const regex = { $regex: query_str, $options: 'i' }
        search.query = {
          projectId: projectId,
          $sort: { group: 1 },
          $or: [
            { 'name': regex },
            { 'description': regex },
            { 'group': regex },
            { 'tags': regex },
          ]
        }
      }

      backend.find(search)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ENTRIES,
          payload: result.data
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
         payload: "Please Login Before Continuing."
      })
      history.replace('/')
    })
  }
}
