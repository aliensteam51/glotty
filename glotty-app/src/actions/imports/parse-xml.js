export const XML_PARSED = 'XML_PARSED'

export default(locale, text) => {
  console.log(locale)
  console.log(text)

  return(dispatch) => {
    dispatch({ type: XML_PARSED })
  }
}
