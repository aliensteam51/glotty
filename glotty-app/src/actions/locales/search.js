import API from '../../api'

export const LOCALE_SEARCH = 'LOCALE_SEARCH'

const api = new API()

export default (search) => {
  return (dispatch) => {
    const backend = api.service('locales')

    backend.find({ query: { name: { $regex : `.*${search}.*`, $options : 'si'} } })
      .then((result) => {
        dispatch({
          type: LOCALE_SEARCH,
          payload: result.data
        })
        console.log(result)
      })
      .catch((error) => {
        dispatch({
          type: 'LOAD_ERROR',
          payload: error.message
        })
      })
  }
}
