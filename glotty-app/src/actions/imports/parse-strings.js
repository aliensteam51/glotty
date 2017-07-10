export const STRINGS_PARSED = 'STRINGS_PARSED'

export default(locale, text) => {
  console.log(locale)
  console.log(text)

  return(dispatch) => {
    dispatch({ type: STRINGS_PARSED })
  }
}
