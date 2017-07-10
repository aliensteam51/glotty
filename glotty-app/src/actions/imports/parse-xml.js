import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const XML_PARSED = 'XML_PARSED'

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
              type: XML_PARSED,
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
  const keyStartIndex = text.indexOf('<string name="', startIndex) + 14
  if (keyStartIndex === 13) return array

  const keyEndIndex = text.indexOf('">', keyStartIndex)
  const transStartIndex = keyEndIndex + 2
  const transEndIndex = text.indexOf('</string>', transStartIndex)

  const keyId = text.substring(keyStartIndex, keyEndIndex)
  const translation = text.substring(transStartIndex, transEndIndex)

  const entry = [{keyId, translation}]
  const newArray = array.concat(entry)
  return parseText(text, transEndIndex, newArray)
}
