import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const STRINGS_PARSED = 'STRINGS_PARSED'

const api = new API()

export default(localeCode, text, projectId) => {
  const array = parseText(text)

  return(dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('projects')

    api.app.authenticate()
      .then(() => {
        backend.patch(projectId, { localeCode, parsedEntries: array })
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })

            dispatch({
              type: STRINGS_PARSED,
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

function parseText(text, startIndex = 0, array = []) {
  const keyStartIndex = text.indexOf('\n"', startIndex) + 2
  if (keyStartIndex === 1) return array

  const keyEndIndex = text.indexOf('" = "', keyStartIndex)
  const transStartIndex = keyEndIndex + 5
  const transEndIndex = text.indexOf('";', transStartIndex)

  const keyId = text.substring(keyStartIndex, keyEndIndex)
  const translation = text.substring(transStartIndex, transEndIndex)

  const entry = [{keyId, translation}]
  const newArray = array.concat(entry)
  return parseText(text, transEndIndex, newArray)
}
