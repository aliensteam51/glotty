import API from '../../api'

export const FETCHED_LOCALES = 'FETCHED_LOCALES'

const api = new API()

export default (search) => {
  return (dispatch) => {
    const backend = api.service('locales')

    // { query: { name: { $regex : `.*${search}.*`, $options : 'si'} } }

    backend.find({
      query: {
        $limit: 800,
        $sort: {
          name: 1
        }
      }
    })
      .then((result) => {
        dispatch({
          type: FETCHED_LOCALES,
          payload: result.data
        })
      })
      .catch((error) => {
        dispatch({
          type: 'LOAD_ERROR',
          payload: error.message
        })
      })
  }
}
