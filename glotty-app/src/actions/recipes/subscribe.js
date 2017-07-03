import API from '../../api'

export const SUBSCRIBED_TO_PROJECTS_SERVICE = 'SUBSCRIBED_TO_PROJECTS_SERVICE'
export const PROJECT_CREATED = 'PROJECT_CREATED'
export const PROJECT_UPDATED = 'PROJECT_UPDATED'
export const PROJECT_REMOVED = 'PROJECT_REMOVED'

const api = new API()
const projects = api.service('projects')

export default () => {
  return (dispatch) => {
    projects.on('created', (project) => { dispatch(createdProject(project)) })
    projects.on('updated', (project) => { dispatch(updatedProject(project)) })
    projects.on('patched', (project) => { dispatch(updatedProject(project)) })
    projects.on('removed', (project) => { dispatch(removedProject(project)) })

    dispatch({ type: SUBSCRIBED_TO_PROJECTS_SERVICE })
  }
}

const createdProject = (project) => {
  return {
    type: PROJECT_CREATED,
    payload: project
  }
}

const updatedProject = (project) => {
  return {
    type: PROJECT_UPDATED,
    payload: project
  }
}

const removedProject = (project) => {
  return {
    type: PROJECT_REMOVED,
    payload: project
  }
}
