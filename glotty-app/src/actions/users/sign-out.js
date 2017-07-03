import API from '../../api'
import { history } from '../../store'

export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

const api = new API()

export default () => {
  api.signOut()
  history.replace('/')
  return { type: USER_SIGNED_OUT }
}
