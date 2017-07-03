import client from './client'

class API {
  constructor() {
    this.app = client
  }

  service(serviceName) {
    return this.app.service(serviceName)
  }

  authenticate(user) {
    const { email, password } = user
    return this.app.authenticate(
      Object.assign({}, { strategy: 'local' }, {
      email,
      password,
    }))
  }

  signOut() {
    return this.app.logout()
  }
}

export default API
