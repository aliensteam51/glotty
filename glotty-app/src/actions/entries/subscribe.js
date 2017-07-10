import API from '../../api'

export const SUBSCRIBED_TO_ENTRIES_SERVICE = 'SUBSCRIBED_TO_ENTRIES_SERVICE'
export const ENTRY_CREATED = 'ENTRY_CREATED'
export const ENTRY_UPDATED = 'ENTRY_UPDATED'
export const ENTRY_DELETED = 'ENTRY_DELETED'
export const ENTRY_REVIVED = 'ENTRY_REVIVED'
export const ENTRIES_HARD_DELETED = 'ENTRIES_HARD_DELETED'
export const TRANSLATION_UPDATED = 'TRANSLATION_UPDATED'
export const KEY_EDITED = 'TRANSLATION_UPDATED'

const api = new API()
const entries = api.service('entries')

export default () => {
  return (dispatch) => {
    entries.on('created', (entry) => { dispatch(createdEntry(entry)) })
    entries.on('updated', (entry) => { dispatch(updatedEntry(entry)) })
    entries.on('patched', (entry) => { dispatch(updatedEntry(entry)) })
    entries.on('removed', (entry) => { dispatch(removedEntry(entry)) })
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

const removedEntry = (entry) => {
  return {
    type: ENTRIES_HARD_DELETED,
    payload: entry
  }
}
