import API from '../../api'

export const SUBSCRIBED_TO_ENTRIES_SERVICE = 'SUBSCRIBED_TO_ENTRIES_SERVICE'
export const ENTRY_CREATED = 'ENTRY_CREATED'
export const ENTRY_UPDATED = 'ENTRY_UPDATED'
export const ENTRY_REMOVED = 'ENTRY_REMOVED'

const api = new API()
const entries = api.service('entries')

export default () => {
  return (dispatch) => {
    entries.on('created', (entry) => { dispatch(createdProject(entry)) })
    entries.on('updated', (entry) => { dispatch(updatedProject(entry)) })
    entries.on('patched', (entry) => { dispatch(updatedProject(entry)) })
    entries.on('removed', (entry) => { dispatch(removedProject(entry)) })
    dispatch({ type: SUBSCRIBED_TO_ENTRIES_SERVICE })
  }
}

const createdProject = (entry) => {
  return {
    type: ENTRY_CREATED,
    payload: entry
  }
}

const updatedProject = (entry) => {
  return {
    type: ENTRY_UPDATED,
    payload: entry
  }
}

const removedProject = (entry) => {
  return {
    type: ENTRY_REMOVED,
    payload: entry
  }
}
