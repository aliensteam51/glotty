import { SUBSCRIBED_TO_ENTRIES_SERVICE } from '../actions/entries/subscribe'

export default (state = [], { type } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_ENTRIES_SERVICE :
      return state.concat('entries')

    default :
      return state
  }
}
