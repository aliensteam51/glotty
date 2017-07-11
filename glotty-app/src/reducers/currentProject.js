import { GOT_PROJECT } from '../actions/projects/get'
import { ADDED_LOCALE } from '../actions/projects/add-locale'
import { LOCALE_DELETED } from '../actions/locales/delete'
import { JSON_PARSED } from '../actions/imports/parse-json'
import { STRINGS_PARSED } from '../actions/imports/parse-strings'
import { XML_PARSED } from '../actions/imports/parse-xml'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case GOT_PROJECT :
      return payload

    case JSON_PARSED :
    case STRINGS_PARSED :
    case XML_PARSED :
    case ADDED_LOCALE :
    case LOCALE_DELETED :
      return payload

    default :
      return state
  }
}
