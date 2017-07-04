import API from '../../api'

export const SUBSCRIBED_TO_ENTRIES_SERVICE = 'SUBSCRIBED_TO_ENTRIES_SERVICE'
export const ENTRY_CREATED = 'ENTRY_CREATED'
export const ENTRY_UPDATED = 'ENTRY_UPDATED'

const api = new API()
const entries = api.service('entries')

export default () => {
  return (dispatch) => {
    entries.on('created', (entry) => { dispatch(createdEntry(entry)) })
    entries.on('updated', (entry) => { dispatch(updatedEntry(entry)) })
    entries.on('patched', (entry) => { dispatch(updatedEntry(entry)) })
    dispatch({ type: SUBSCRIBED_TO_ENTRIES_SERVICE })
  }
}

const createdEntry = (entry) => {
  return {
    type: ENTRY_CREATED,
    payload: entry
  }
}

const updatedEntry = (entry) => {
  return {
    type: ENTRY_UPDATED,
    payload: entry
  }
}
