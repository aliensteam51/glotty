import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const PLATFORM_DELETED = 'PLATFORM_DELETED'

const api = new API()

export default (entryId, platformId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('entries')
    api.app.authenticate()
      .then(() => {


        // db.getCollection('entries').update(
        //   {"_id": ObjectId("595dcbce1cb1607a3e60afe5"), "platforms._id": ObjectId("595dcbce1cb1607a3e60afe6")},
        //   {'$set': {'platforms.$.deleted': true}}
        // )

        // THIS SHOULD WORK BUT DOESNT....
        backend.update({"_id": entryId, "platforms._id": platformId},
          {'$set': {'platforms.$.deleted': true}}
        )
        /////

          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })
            dispatch({
              type: PLATFORM_DELETED,
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
